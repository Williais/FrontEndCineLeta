import React from 'react';
import { Search, Star, Plus, ArrowLeft, Loader2 } from 'lucide-react';

export interface TMDBMovie {
  id: number;
  title: string;
  posterUrl: string;
  year: string;
  director?: string;
  overview: string;
  tmdbRating: number;
  runtime?: number;
  genre?: string;
}

interface SearchSectionProps {
  searchQuery: string;
  isSearching: boolean;
  searchResults: TMDBMovie[];
  selectedMovie: TMDBMovie | null;
  userRating: number;
  

  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onMovieSelect: (movie: TMDBMovie) => void;
  onClearSelection: () => void;
  onRateClick: (rating: number) => void;
  onAddMovieClick: () => void;
}

export function SearchSection({
  searchQuery,
  isSearching,
  searchResults,
  selectedMovie,
  userRating,
  onSearchChange,
  onSearchSubmit,
  onMovieSelect,
  onClearSelection,
  onRateClick,
  onAddMovieClick


}: SearchSectionProps) {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 min-h-[calc(100vh-100px)] flex flex-col">
      
      {!selectedMovie && (
        <div className="flex-1 flex flex-col animate-in fade-in duration-500">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-heading font-bold text-cream mb-2">Adicionar Manualmente</h2>
            <p className="text-white/50 font-sans">Busque filmes na base de dados para registrar no seu histórico.</p>
          </div>

          <form onSubmit={onSearchSubmit} className="relative w-full max-w-2xl mb-12 self-center sm:self-start">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-white/30" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Ex: Interestelar, O Poderoso Chefão..."
                className="w-full bg-surface border border-white/10 rounded-full pl-12 pr-32 py-4 text-cream placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-colors shadow-lg"
              />
              <button 
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="absolute right-2 px-6 py-2 bg-gold hover:bg-[#E4A836] text-background rounded-full font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSearching ? <Loader2 size={16} className="animate-spin" /> : 'Buscar'}
              </button>
            </div>
          </form>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map((movie) => (
                <div 
                  key={movie.id} 
                  onClick={() => onMovieSelect(movie)}
                  className="bg-surface rounded-xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300 border border-white/5 hover:border-gold/30 shadow-lg"
                >
                  <div className="aspect-[2/3] relative overflow-hidden bg-white/5">
                    {movie.posterUrl ? (
                      <img 
                        src={movie.posterUrl} 
                        alt={movie.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">Sem Imagem</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                      <h4 className="font-heading font-bold text-sm leading-tight text-cream mb-1 line-clamp-2">{movie.title}</h4>
                      <p className="text-xs text-gold font-medium">{movie.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            
            searchQuery && !isSearching && (
              <div className="flex-1 flex flex-col items-center justify-center text-white/30 border border-dashed border-white/10 rounded-3xl p-12 bg-surface/30">
                <Search size={48} className="mb-4 opacity-20" />
                <p>Nenhum filme encontrado para "{searchQuery}".</p>
              </div>
            )
          )}
        </div>
      )}


      {selectedMovie && (
        <div className="animate-in slide-in-from-bottom-8 fade-in duration-500">
          <button 
            onClick={onClearSelection}
            className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors mb-8 font-medium px-4 py-2 bg-surface rounded-full w-fit border border-white/5"
          >
            <ArrowLeft size={16} /> Voltar para a busca
          </button>

          <div className="bg-surface border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 lg:gap-12 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <img 
              src={selectedMovie.posterUrl} 
              alt={selectedMovie.title} 
              className="w-full md:w-72 rounded-xl object-cover shadow-2xl border border-white/5 z-10" 
            />
            
            <div className="flex-1 flex flex-col z-10">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-2">
                {selectedMovie.title} <span className="text-2xl text-white/30 font-normal">({selectedMovie.year})</span>
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/50 mb-8 bg-black/20 p-3 rounded-xl border border-white/5 w-fit">
                <div className="flex items-center gap-1.5 text-cream">
                  <Star size={16} className="text-gold fill-gold" /> 
                  <span>{selectedMovie.tmdbRating.toFixed(1)}</span>
                  <span className="text-white/30 text-xs">TMDB</span>
                </div>
                {selectedMovie.director && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>Dirigido por <span className="text-cream">{selectedMovie.director}</span></span>
                  </>
                )}

                {selectedMovie.runtime && selectedMovie.runtime > 0 ? (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{selectedMovie.runtime} min</span>
                  </>
                ) : null}

                {selectedMovie.genre && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{selectedMovie.genre}</span>
                  </>
                )}
              </div>

              <p className="text-white/60 text-base leading-relaxed mb-10 flex-1 font-sans">
                {selectedMovie.overview || "Nenhuma sinopse disponível para este filme no momento."}
              </p>

              <div className="bg-background/80 p-6 rounded-2xl border border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-6 mt-auto">
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-white/40 mb-3 text-center sm:text-left">
                    Sua Avaliação
                  </span>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => onRateClick(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star 
                          size={32} 
                          className={star <= userRating 
                            ? "text-gold fill-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" 
                            : "text-white/10"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={onAddMovieClick}
                  disabled={userRating === 0}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-background bg-gold hover:bg-[#FFF0A8] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={20} /> Registrar Filme
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}