import { Film, Clock, Star, Heart, Award, Users, Trophy, Clapperboard, Flame, Share2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export interface DashboardMovie {
  tmdbId: number;
  title: string;
  posterPath: string;
  rating: number;
  isFavorite: boolean;
  date?: string;
}

export interface SharedSession {
  id: string;
  movie: DashboardMovie;
  buddyName: string;
  buddyPhoto?: string;
  date: string;
}

export interface DashboardStats {
  totalMovies: number;
  totalRuntime: number;
  averageRating: number;
  favoriteGenre: string;
  topBuddy: { name: string; count: number } | null;
  recentMovies: DashboardMovie[];
  lovedMovies: DashboardMovie[];
  oscarMovies: DashboardMovie[];
  highestRated: DashboardMovie[];
  sharedSessions: SharedSession[];
}

export function DashboardSection() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await api('/api/user-movies/dashboard')
        setStats(data)
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error)
      } finally {
        setLoading(false)
      }
    };
    fetchDashboard()
  }, [])

  const handleShare = async (movie: DashboardMovie) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CineLeta',
          text: `Acabei de avaliar "${movie.title}" com ${movie.rating} estrelas no CineLeta!`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Compartilhamento cancelado ou falhou.')
      }
    } else {
      alert('O seu navegador não suporta o compartilhamento nativo.')
    }
  }

  const handleDelete = async (tmdbId: number) => {
    if (window.confirm("Tem certeza que deseja remover este filme do seu histórico?")) {
      try {
        await api(`/api/user-movies/${tmdbId}`, { method: 'DELETE' })
        setStats(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            recentMovies: prev.recentMovies.filter(m => m.tmdbId !== tmdbId),
            lovedMovies: prev.lovedMovies.filter(m => m.tmdbId !== tmdbId),
            highestRated: prev.highestRated.filter(m => m.tmdbId !== tmdbId),
            oscarMovies: prev.oscarMovies.filter(m => m.tmdbId !== tmdbId),
          }
        })
      } catch (error) {
        alert("Erro ao remover o filme.")
      }
    }
  }

  const formatHours = (minutes: number) => {
    if (!minutes) return "0h 0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  if (loading) return <div className="flex-1 flex justify-center items-center text-gold pt-20"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gold"></div></div>;
  if (!stats) return <div className="p-8 text-center text-white/50 pt-20">Nenhum dado encontrado.</div>;

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-cream mb-2">Seu Universo Cinematográfico</h2>
          <p className="text-white/50 font-sans">Estatísticas, favoritos e sessões compartilhadas.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-surface border border-white/5 p-6 rounded-3xl relative overflow-hidden group shadow-lg">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Film size={120} />
          </div>
          <p className="text-white/50 text-sm font-medium mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Film size={16} className="text-gold" /> Total de Filmes
          </p>
          <h3 className="text-4xl sm:text-5xl font-heading font-black text-cream">{stats.totalMovies}</h3>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-3xl relative overflow-hidden group shadow-lg">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clock size={120} />
          </div>
          <p className="text-white/50 text-sm font-medium mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Clock size={16} className="text-gold" /> Tempo de Sessão
          </p>
          <h3 className="text-4xl sm:text-5xl font-heading font-black text-cream">{formatHours(stats.totalRuntime)}</h3>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-3xl relative overflow-hidden group shadow-lg">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Star size={120} />
          </div>
          <p className="text-white/50 text-sm font-medium mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Star size={16} className="text-gold" /> Média
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl sm:text-5xl font-heading font-black text-gold">{stats.averageRating.toFixed(1)}</h3>
            <span className="text-white/30 text-sm font-bold">/ 5.0</span>
          </div>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-3xl relative overflow-hidden group shadow-lg">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clapperboard size={120} />
          </div>
          <p className="text-white/50 text-sm font-medium mb-2 flex items-center gap-2 uppercase tracking-wider">
            <Clapperboard size={16} className="text-wine" /> Gênero Favorito
          </p>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-cream line-clamp-2 mt-2">{stats.favoriteGenre}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-gradient-to-br from-surface to-background border border-gold/20 p-6 rounded-3xl flex flex-col justify-center items-center text-center shadow-[0_0_30px_rgba(212,175,55,0.05)]">
          <Users size={32} className="text-gold mb-4" />
          <h4 className="text-white/50 text-sm uppercase tracking-wider font-bold mb-2">Top Parceiro de Sessão</h4>
          {stats.topBuddy ? (
            <>
              <div className="w-20 h-20 rounded-full bg-surface border-2 border-gold/50 flex items-center justify-center mb-3 overflow-hidden">
                 <span className="text-3xl font-bold text-cream">{stats.topBuddy.name.charAt(0).toUpperCase()}</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-cream">{stats.topBuddy.name}</h3>
              <p className="text-gold font-medium mt-1">{stats.topBuddy.count} filmes juntos</p>
            </>
          ) : (
            <p className="text-white/30 text-sm mt-4">Nenhuma sessão em grupo registrada.</p>
          )}
        </div>

        <div className="lg:col-span-3 bg-surface border border-white/5 p-6 rounded-3xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-wine fill-wine" size={24} />
            <h3 className="text-xl font-heading font-bold text-cream">Galeria do Coração</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {stats.lovedMovies.length === 0 ? (
               <div className="w-full py-8 text-center text-white/30">Avalie filmes com o coração para vê-los aqui.</div>
            ) : (
              stats.lovedMovies.map((movie) => (
                <div key={movie.tmdbId} className="min-w-[120px] sm:min-w-[140px] snap-start group relative rounded-xl overflow-hidden shadow-md">
                  <img src={movie.posterPath || 'https://via.placeholder.com/500x750'} alt={movie.title} className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-cream font-bold text-xs line-clamp-1">{movie.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} className="text-gold fill-gold" />
                      <span className="text-[10px] text-white/70 font-medium">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-lg flex flex-col">
          <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="text-gold" size={20} />
              <h3 className="text-lg font-heading font-bold text-cream">Adicionados Recentemente</h3>
            </div>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-3">
              {stats.recentMovies.length === 0 ? (
                <div className="py-8 text-center text-white/30">Nenhum filme avaliado ainda.</div>
              ) : (
                stats.recentMovies.slice(0, 5).map((movie) => (
                  <div key={movie.tmdbId} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5 group">
                    <img src={movie.posterPath || 'https://via.placeholder.com/500x750'} alt={movie.title} className="w-12 h-16 object-cover rounded-lg shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-cream font-bold text-sm truncate">{movie.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (<Star key={s} size={12} className={s <= movie.rating ? "text-gold fill-gold" : "text-white/10"} />))}
                          </div>
                          {movie.isFavorite && <Heart size={12} className="text-wine fill-wine" />}
                        </div>
                  
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleShare(movie)} className="text-white/40 hover:text-gold transition-colors" title="Compartilhar">
                            <Share2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(movie.tmdbId)} className="text-white/40 hover:text-red-400 transition-colors" title="Remover do Histórico">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1710] to-surface border border-gold/10 rounded-3xl overflow-hidden shadow-lg flex flex-col">
          <div className="p-6 border-b border-gold/10 bg-gold/5 flex items-center gap-3">
            <Trophy className="text-gold" size={20} />
            <h3 className="text-lg font-heading font-bold text-gold">Coleção da Academia</h3>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 content-start flex-1">
            {stats.oscarMovies.length === 0 ? (
               <div className="col-span-full py-8 text-center text-white/30 text-sm">Gire a Roleta do Oscar para expandir sua coleção.</div>
            ) : (
              stats.oscarMovies.map((movie) => (
                <div key={movie.tmdbId} className="group relative rounded-lg overflow-hidden border border-gold/20 shadow-md">
                  <img src={movie.posterPath || 'https://via.placeholder.com/500x750'} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Award className="text-gold drop-shadow-lg scale-150" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-lg mt-8">
        <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="text-white/50" size={20} />
            <h3 className="text-lg font-heading font-bold text-cream">Sessões Compartilhadas (Watch Party)</h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-white/30 border-b border-white/5 bg-black/20">
                <th className="px-6 py-4 font-medium">Filme</th>
                <th className="px-6 py-4 font-medium">Parceiro de Sessão</th>
                <th className="px-6 py-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stats.sharedSessions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-white/40">
                    Você ainda não adicionou amigos aos seus filmes.
                  </td>
                </tr>
              ) : (
                stats.sharedSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={session.movie.posterPath} alt={session.movie.title} className="w-10 h-14 object-cover rounded-md shadow-md border border-white/10" />
                        <div>
                          <span className="font-heading font-bold text-cream block group-hover:text-gold transition-colors">{session.movie.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold text-background flex items-center justify-center text-xs font-bold border border-gold/50">
                          {session.buddyName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white/70 font-medium">{session.buddyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/40">{session.date}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}