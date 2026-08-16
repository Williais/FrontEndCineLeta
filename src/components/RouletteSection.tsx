import React from 'react';
import { Shuffle, Star, X, Loader2, Award, Clock, Heart, Check } from 'lucide-react';

interface MovieDisplayData {
  title: string;
  overview: string;
  posterUrl: string;
  releaseYear: string;
  director: string;
  runtime: number;
  genre: string;
  isOscarWinner: boolean;
}

interface RouletteSectionProps {
  movie?: MovieDisplayData | null;
  isLoading?: boolean;
  userRating?: number;
  isLoved?: boolean;
  onSpinClick: () => void;
  onRateClick: (rating: number) => void;
  onLoveClick: () => void;
  onSaveClick: () => void;
  onIgnoreClick: () => void;
}

export function RouletteSection({
  movie = null,
  isLoading = false,
  userRating = 0,
  isLoved = false,
  onSpinClick,
  onRateClick,
  onLoveClick,
  onSaveClick,
  onIgnoreClick
}: RouletteSectionProps) {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-12">

      <button
        onClick={onSpinClick}
        disabled={isLoading}
        className="group relative flex items-center gap-3 bg-gradient-to-r from-gold to-[#B37E1C] text-background px-10 py-5 rounded-full font-heading font-bold text-lg shadow-[0_0_30px_rgba(212,175,55,0.25)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-16 hover:-translate-y-1"
      >
        {isLoading ? (
          <Loader2 className="animate-spin text-background" size={24} />
        ) : (
          <Shuffle className="group-hover:rotate-180 transition-transform duration-700 text-background" size={24} />
        )}
        <span>{isLoading ? 'Buscando no acervo...' : 'Girar a Roleta'}</span>
      </button>

      {!movie && !isLoading && (
        <div className="text-center opacity-40">
          <Shuffle size={64} className="mx-auto mb-6 opacity-20" />
          <h2 className="font-heading text-2xl font-medium mb-2">O palco está vazio</h2>
          <p className="font-sans">Clique no botão dourado para descobrir sua próxima sessão.</p>
        </div>
      )}

      {movie && !isLoading && (
        <div className="w-full flex flex-col md:flex-row bg-surface border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
          
          {movie.isOscarWinner && (
            <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-gold to-[#B37E1C] text-background text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Award size={14} /> Vencedor do Oscar
            </div>
          )}

          <div className="w-full md:w-[400px] shrink-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10 md:hidden"></div>
            <img 
              src={movie.posterUrl} 
              alt={`Pôster de ${movie.title}`} 
              className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col flex-1 p-8 md:p-12 justify-between z-20 -mt-20 md:mt-0 relative">
            
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap items-baseline gap-4 mb-2">
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-cream drop-shadow-md">
                    {movie.title}
                  </h2>
                  <span className="text-xl text-white/40 font-heading">({movie.releaseYear})</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/50">
                  <span>{movie.director}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span>{movie.genre}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {movie.runtime} min
                  </span>
                </div>
              </div>

              <p className="text-white/70 text-lg leading-relaxed font-sans">
                {movie.overview}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col xl:flex-row items-center gap-6">

              <div className="flex items-center gap-6 bg-background/50 rounded-2xl p-4 flex-1 w-full justify-between sm:justify-start">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      onClick={() => onRateClick(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star 
                        size={28} 
                        className={star <= userRating 
                          ? "text-gold fill-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                          : "text-white/20"} 
                      />
                    </button>
                  ))}
                </div>
                
                <div className="w-px h-8 bg-white/10"></div>
                
                <button 
                  onClick={onLoveClick}
                  className="transition-transform hover:scale-110 focus:outline-none flex items-center gap-2 text-white/40 hover:text-wine"
                >
                  <Heart 
                    size={28} 
                    className={isLoved ? "text-wine fill-wine drop-shadow-[0_0_8px_rgba(122,30,42,0.4)]" : ""} 
                  />
                </button>
              </div>

              <div className="flex items-center gap-3 w-full xl:w-auto">
                <button 
                  onClick={onIgnoreClick}
                  className="flex-1 xl:flex-none px-6 py-4 rounded-xl font-medium text-wine bg-wine/10 border border-wine/20 hover:bg-wine hover:text-cream transition-all flex items-center justify-center gap-2"
                >
                  <X size={20} /> Ignorar
                </button>
                <button 
                  onClick={onSaveClick}
                  className="flex-1 xl:flex-none px-8 py-4 rounded-xl font-bold text-background bg-cream hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Check size={20} /> Salvar Filme
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}