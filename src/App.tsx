import './App.css'
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { Header } from './components/Header'
import { RouletteSection } from './components/RouletteSection'
import {ProfileSection} from './components/ProfileSection'
import { SearchSection } from './components/SearchSection';

interface UserState {
  isLoggedIn: boolean
  name: string
  photo: string | null
  memberSince: string
}

function App() {
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [movieRating, setMovieRating] = useState(0);
  const [isMovieLoved, setIsMovieLoved] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedSearchMovie, setSelectedSearchMovie] = useState<any | null>(null);
  const [manualRating, setManualRating] = useState(0);

  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    name: 'Visitante',
    photo: null,
    memberSince: ''
  })

  const [activeTab, setActiveTab] = useState<'roulette'| 'search'| 'dashboard' | 'profile'> ('roulette')

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }

  const handleLogout = () => {
    setUser({isLoggedIn: false, name: 'Visitante', photo: null, memberSince: ''})
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    if (!user.isLoggedIn) {
      alert("Você precisa fazer login para pesquisar filmes.");
      return;
    }

    setIsSearching(true);
    setSelectedSearchMovie(null); 

    try {

      const data: any[] = await api(`/api/movies/search?query=${encodeURIComponent(searchQuery)}`);

      const mappedResults = data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview || "Sinopse não disponível.",
        posterUrl: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
          : 'https://via.placeholder.com/500x750?text=Sem+Pôster',
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        director: 'Desconhecido',
        tmdbRating: movie.vote_average || 0
      }));

      setSearchResults(mappedResults);
    } catch (error) {
      console.error("Erro na busca de filmes:", error);
      alert("Erro ao buscar filmes no catálogo.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSpinClick = async () => {
    if (!user.isLoggedIn) {
      alert("Você precisa fazer o login com o Google para girar a roleta!");
      return;
    }

    setIsSpinning(true);
    setCurrentMovie(null); 
    setMovieRating(0);
    setIsMovieLoved(false);

    try {
      const tmdbData = await api('/api/movies/random');

      setCurrentMovie({
        ...tmdbData,
        isOscarWinner: false 
      });

    } catch (error) {
      console.error("Erro ao puxar filme do Java:", error);
      alert("Não foi possível sortear um filme agora. Verifique a conexão.");
    } finally {
      setIsSpinning(false);
    }
  }

  const handleSaveInteraction = async (movie: any, rating: number, isFavorite: boolean, isIgnored: boolean) => {
    if (!user.isLoggedIn) {
      alert("Você precisa fazer login para interagir com os filmes.");
      return;
    }

    try {
      await api('/api/user-movies/evaluate', {
        method: 'POST',
        body: JSON.stringify({
          tmdbId: movie.tmdbId || movie.id, 
          rating: rating,
          isFavorite: isFavorite,
          isIgnored: isIgnored
        })
      });

      if (isIgnored) {
        console.log(`Filme "${movie.title}" ignorado e salvo no histórico.`);
      } else {
       console.log(`Filme "${movie.title}" salvo com sucesso no seu histórico!`);
      }

    } catch (error) {
      console.error("Erro ao salvar interação no banco:", error);
      alert("Erro de comunicação com o servidor ao salvar o filme.");
    }
  };

  useEffect(() => {
    const checkSession = async () => {

      try{
        const userData = await api('/api/users/me')

        setUser({
          isLoggedIn: true,
          name: userData.name || "Usuário Cineleta",
          photo: userData.picture || null,
          memberSince: "Hoje"
        })
      }catch(err){
        console.log("Usuário não está autenticado no momento.")  
      }
    }

    checkSession();
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeTab={activeTab}
        isLoggedIn={user.isLoggedIn}
        userName={user.name}
        userPhoto={user.photo || undefined}
        onTabChange={setActiveTab}
        onLoginClick={handleLogin}
        onLogoutClick={handleLogout}
        onProfileClick={() => setActiveTab('profile')}
        />
        <main className="flex-1">
        {activeTab === 'roulette' && (
         
        <RouletteSection 
            movie={currentMovie}
            isLoading={isSpinning}
            userRating={movieRating}
            isLoved={isMovieLoved}
            onSpinClick={handleSpinClick}
            onRateClick={setMovieRating}
            onLoveClick={() => setIsMovieLoved(!isMovieLoved)}
            onIgnoreClick={() => {
              handleSaveInteraction(currentMovie, 0, false, true);
              setCurrentMovie(null);
              setMovieRating(0);
              setIsMovieLoved(false);
            }}
            onSaveClick={() => {
              handleSaveInteraction(currentMovie, movieRating, isMovieLoved, false);
              setCurrentMovie(null);
              setMovieRating(0);
              setIsMovieLoved(false);
            }}
          />

        )}
        {activeTab === 'search' && (
          <SearchSection 
            searchQuery={searchQuery}
            isSearching={isSearching}
            searchResults={searchResults}
            selectedMovie={selectedSearchMovie}
            userRating={manualRating}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
            onMovieSelect={async (movie) => {
              try {
                const detailedMovie = await api(`/api/movies/${movie.id}`);
                setSelectedSearchMovie({
                  ...detailedMovie,
                  id: detailedMovie.tmdbId,
                  year: detailedMovie.releaseYear,
                  runtime: detailedMovie.runtime,
                  genre: detailedMovie.genre,
                  isOscarWinner: false
                });
                setManualRating(0);
              } catch (e) {
                console.error("Erro ao puxar detalhes", e);
              }
            }}
            onClearSelection={() => setSelectedSearchMovie(null)}
            onRateClick={setManualRating}
            onAddMovieClick={() => {
              handleSaveInteraction(selectedSearchMovie, manualRating, false, false);
              setSelectedSearchMovie(null);
              setManualRating(0);
            }}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileSection 
            currentName={user.name}
            onSaveProfile={(newName) => {
              setUser(prev => ({ ...prev, name: newName }));
            }}
          />
        )}
      </main>
    </div>

  )
}

export default App
