import './App.css'
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { Header } from './components/Header'
import { BottomNav } from './components/BottomNav';
import { RouletteSection } from './components/RouletteSection'
import { ProfileSection } from './components/ProfileSection'
import { SearchSection } from './components/SearchSection';
import type { TMDBMovie } from './components/SearchSection';
import { DashboardSection } from './components/DashboardSection';

interface UserState {
  isLoggedIn: boolean
  name: string
  email: string
  photo: string | null
  memberSince: string
}

function App() {
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [movieRating, setMovieRating] = useState(0);
  const [isMovieLoved, setIsMovieLoved] = useState(false);
  
  const [rouletteMode, setRouletteMode] = useState<'random' | 'oscar'>('random');
  const [oscarCategory, setOscarCategory] = useState('ALL');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [selectedSearchMovie, setSelectedSearchMovie] = useState<TMDBMovie | null>(null);
  const [manualRating, setManualRating] = useState(0);
  const [isManualLoved, setIsManualLoved] = useState(false);

  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    name: 'Visitante',
    email: '',
    photo: null,
    memberSince: ''
  })

  const [activeTab, setActiveTab] = useState<'roulette'| 'search'| 'dashboard' | 'profile'>('roulette')

  const handleLogin = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://179.198.120.245:8080'
    window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };
  const handleLogout = () => setUser({isLoggedIn: false, name: 'Visitante', email: '', photo: null, memberSince: ''});

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    if (!user.isLoggedIn) return alert("Você precisa fazer login para pesquisar filmes.");

    setIsSearching(true);
    setSelectedSearchMovie(null); 

    try {
      const data: any[] = await api(`/api/movies/search?query=${encodeURIComponent(searchQuery)}`);
      const mappedResults = data.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview || "Sinopse não disponível.",
        posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Pôster',
        year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
        director: 'Desconhecido',
        tmdbRating: movie.vote_average || 0
      }));
      setSearchResults(mappedResults);
    } catch (error) {
      alert("Erro ao buscar filmes no catálogo.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSpinClick = async () => {
    if (!user.isLoggedIn) return alert("Você precisa fazer o login com o Google para girar a roleta!");

    setIsSpinning(true);
    setCurrentMovie(null); 
    setMovieRating(0);
    setIsMovieLoved(false);

    try {
     
      const endpoint = rouletteMode === 'random' 
        ? '/api/movies/random' 
        : `/api/oscar/random?category=${encodeURIComponent(oscarCategory)}`;
        
      const tmdbData = await api(endpoint);

      setCurrentMovie({
        ...tmdbData,
        isOscarWinner: rouletteMode === 'oscar'
      });

    } catch (error: any) {
      console.error("Erro completo da Roleta:", error);
      alert("Não foi possível sortear. Se o erro for 404, o seu banco de dados do Oscar está vazio!");
    } finally {
      setIsSpinning(false);
    }
  }

  const handleSaveInteraction = async (movie: any, rating: number, isFavorite: boolean, isIgnored: boolean, taggedEmails: string[] = []) => {
    if (!user.isLoggedIn) return alert("Você precisa fazer login para interagir com os filmes.");

    try {
      await api('/api/user-movies/evaluate', {
        method: 'POST',
        body: JSON.stringify({
          tmdbId: movie.tmdbId || movie.id, 
          rating: rating,
          isFavorite: isFavorite,
          isIgnored: isIgnored,
          taggedEmails: taggedEmails
        })
      });

      if (!isIgnored){
        if (taggedEmails.length > 0) {
          console.log(`Sessão criada! Filme "${movie.title}" salvo para você e seus amigos.`);
        } else {
          console.log(`Filme "${movie.title}" salvo com sucesso!`);
        }
      }

    } catch (error) {
      alert("Erro de comunicação com o servidor ao salvar o filme.");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try{
        const userData = await api('/api/users/me')
        setUser({ isLoggedIn: true, name: userData.name || "Usuário Cineleta",email: userData.email, photo: userData.picture || null, memberSince: "Hoje" })
      }catch(err){
        console.log("Visitante")  
      }
    }
    checkSession();
  }, [])

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
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
      
      <main className="flex-1 flex flex-col">
        {activeTab === 'roulette' && (
          <RouletteSection 
            movie={currentMovie}
            isLoading={isSpinning}
            userRating={movieRating}
            isLoved={isMovieLoved}
            rouletteMode={rouletteMode}
            oscarCategory={oscarCategory}
            
            onModeChange={setRouletteMode}
            onOscarChange={setOscarCategory}
            onSpinClick={handleSpinClick}
            onRateClick={setMovieRating}
            onLoveClick={() => setIsMovieLoved(!isMovieLoved)}
            onIgnoreClick={() => {
              handleSaveInteraction(currentMovie, 0, false, true);
              setCurrentMovie(null);
            }}
            onSaveClick={(emails) => {
              handleSaveInteraction(currentMovie, movieRating, isMovieLoved, false, emails);
              setCurrentMovie(null);
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
            isLoved={isManualLoved}
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
                setIsManualLoved(false);
              } catch (e) {}
            }}
            onClearSelection={() => setSelectedSearchMovie(null)}
            onRateClick={setManualRating}
            onLoveClick={() => setIsManualLoved(!isManualLoved)}
            onAddMovieClick={(emails) => {
              handleSaveInteraction(selectedSearchMovie, manualRating, isManualLoved, false, emails);
              setSelectedSearchMovie(null);
            }}
          />
        )}

        {activeTab === 'dashboard' && <DashboardSection />}
        
        {activeTab === 'profile' && (
          <ProfileSection 
            currentName={user.name}
            userEmail={user.email}
            userPhoto={user.photo || undefined}
            onSaveProfile={async (newName) => {
              try {
                await api('/api/users/me/nickname', {
                  method: 'PUT',
                  body: JSON.stringify({ nickname: newName })
                });
                setUser(prev => ({ ...prev, name: newName }));
              } catch (error) {
                alert("Erro ao salvar o nome no servidor.");
              }
            }}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App