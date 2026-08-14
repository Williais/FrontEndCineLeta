import { Film, Clock, Star, Calendar, Trash2, Heart } from 'lucide-react';

export interface DashboardStats {
  totalMovies: number;
  totalTimeMinutes: number;
  averageRating: string;
}

export interface HistoryMovie {
  id: string;
  title: string;
  posterUrl: string;
  userRating: number;
  isLoved?: boolean;
  dateAdded: string;
}

interface DashboardSectionProps {
  stats: DashboardStats;
  history: HistoryMovie[];
  onRemoveMovie?: (id: string) => void;
}

export function DashboardSection({ stats, history, onRemoveMovie }: DashboardSectionProps) {
  

  const formatHours = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-cream mb-2">Meu Painel</h2>
        <p className="text-white/50 font-sans">Acompanhe seu histórico e estatísticas de exibição.</p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <div className="bg-surface border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Film size={120} />
          </div>
          <p className="text-white/50 text-sm font-medium mb-2 flex items-center gap-2">
            <Film size={16} className="text-gold" /> Total de Filmes
          </p>
          <h3 className="text-4xl font-heading font-bold text-cream">{stats.totalMovies}</h3>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clock size={120} />
          </div>
          <p className="text-white/50 text-sm font-medium mb-2 flex items-center gap-2">
            <Clock size={16} className="text-gold" /> Tempo de Sessão
          </p>
          <h3 className="text-4xl font-heading font-bold text-cream">{formatHours(stats.totalTimeMinutes)}</h3>
        </div>

        <div className="bg-surface border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Star size={120} />
          </div>
          <p className="text-white/50 text-sm font-medium mb-2 flex items-center gap-2">
            <Star size={16} className="text-gold" /> Média de Avaliação
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-heading font-bold text-gold">{stats.averageRating}</h3>
            <span className="text-white/30 text-sm">/ 5.0</span>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-xl font-heading font-semibold text-cream">Histórico Completo</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-white/40 border-b border-white/5 bg-black/20">
                <th className="px-6 py-4 font-medium">Filme</th>
                <th className="px-6 py-4 font-medium">Sua Nota</th>
                <th className="px-6 py-4 font-medium">Data</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              
              {history.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                    Você ainda não avaliou nenhum filme.
                  </td>
                </tr>
              ) : (
                history.map((movie) => (
                  <tr key={movie.id} className="hover:bg-white/[0.02] transition-colors group">
                
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={movie.posterUrl} 
                          alt={movie.title} 
                          className="w-12 h-16 object-cover rounded-md shadow-md border border-white/10"
                        />
                        <span className="font-heading font-semibold text-cream group-hover:text-gold transition-colors">
                          {movie.title}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              size={14} 
                              className={star <= movie.userRating ? "text-gold fill-gold" : "text-white/10"} 
                            />
                          ))}
                        </div>
                        {movie.isLoved && <Heart size={14} className="text-wine fill-wine" />}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Calendar size={14} />
                        {movie.dateAdded}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onRemoveMovie && onRemoveMovie(movie.id)}
                        className="text-white/30 hover:text-wine transition-colors p-2 rounded-full hover:bg-wine/10 focus:outline-none"
                        title="Remover do histórico"
                      >
                        <Trash2 size={18} />
                      </button>
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