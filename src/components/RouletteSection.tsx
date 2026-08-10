import { Shuffle, Star, X, Loader2 } from 'lucide-react';

interface MovieDisplayData {
  title: string;
  overview: string;
  posterUrl: string;
  releaseYear: string;
}

interface RouletteSectionProps {
  movie?: MovieDisplayData | null;
  isLoading?: boolean;
  onSpinClick?: () => void;
  onRateClick?: (rating: number) => void;
  onIgnoreClick?: () => void;
}

export function RouletteSection({
  movie = null,
  isLoading = false,
  onSpinClick,
  onRateClick,
  onIgnoreClick
}: RouletteSectionProps) {
  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">

      <button
        onClick={onSpinClick}
        disabled={isLoading}
        className="group relative flex items-center gap-3 bg-gold hover:bg-gold/90 text-background px-8 py-4 rounded-full font-heading font-bold text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-12"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={24} />
        ) : (
          <Shuffle className="group-hover:rotate-180 transition-transform duration-500" size={24} />
        )}
        <span>{isLoading ? 'Sorteando...' : 'Sortear Filme'}</span>
      </button>

 
      <div className="w-full relative">

        {!movie && !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/10 rounded-3xl bg-surface/30">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Shuffle className="text-white/20" size={40} />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-white/70 mb-2">
              Pronto para uma nova descoberta?
            </h2>
            <p className="text-white/40 max-w-md">
              Clique no botão acima para girar a roleta e receber uma recomendação aleatória do universo do cinema.
            </p>
          </div>
        )}

        {isLoading && !movie && (
          <div className="animate-pulse flex flex-col md:flex-row gap-8 bg-surface p-6 rounded-3xl border border-white/5">
            <div className="w-full md:w-[300px] h-[450px] bg-white/5 rounded-2xl shrink-0"></div>
            <div className="flex-1 py-4 space-y-6">
              <div className="h-10 bg-white/5 rounded-lg w-3/4"></div>
              <div className="h-4 bg-white/5 rounded w-1/4 mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-white/5 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        )}

        {movie && !isLoading && (
          <div className="flex flex-col md:flex-row gap-8 bg-surface/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
            
            {/* Pôster */}
            <div className="w-full md:w-[320px] shrink-0 group">
              <img 
                src={movie.posterUrl} 
                alt={`Pôster de ${movie.title}`} 
                className="w-full h-auto object-cover rounded-2xl shadow-lg group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-cream">
                    {movie.title}
                  </h2>
                  <span className="px-3 py-1 bg-white/10 text-white/70 rounded-md text-sm font-medium">
                    {movie.releaseYear}
                  </span>
                </div>
                
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  {movie.overview}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-8 border-t border-white/10">

                <div className="flex-1 bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/5 hover:border-gold/30 transition-colors">
                  <span className="text-sm text-white/50 mb-3 font-medium uppercase tracking-wider">
                    Avaliar Filme
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        onClick={() => onRateClick && onRateClick(star)}
                        className="text-white/20 hover:text-gold hover:scale-110 transition-all duration-200"
                        title={`Dar ${star} estrelas`}
                      >
                        <Star size={32} strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={onIgnoreClick}
                  className="w-full sm:w-auto h-full min-h-[96px] px-8 bg-wine/10 text-wine hover:bg-wine hover:text-white rounded-2xl flex flex-col items-center justify-center gap-2 border border-wine/20 transition-all group"
                >
                  <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-medium">Ignorar</span>
                </button>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}