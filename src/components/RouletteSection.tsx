import React, { useState } from 'react';
import { Shuffle, Star, Heart, X, Award, Play, Loader2, ChevronDown, Users, Search } from 'lucide-react';
import {api} from '../services/api'

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
  movie?: any;
  isLoading?: boolean;
  userRating?: number;
  isLoved?: boolean;
  rouletteMode: 'random' | 'oscar';
  oscarCategory: string;
  onModeChange: (mode: 'random' | 'oscar') => void;
  onOscarChange: (category: string) => void;
  onSpinClick: () => void;
  onRateClick: (rating: number) => void;
  onLoveClick: () => void;
  onSaveClick: (taggedEmails: string[]) => void;
  onIgnoreClick: () => void;
}

export function RouletteSection({
  movie = null,
  isLoading = false,
  userRating = 0,
  isLoved = false,
  rouletteMode,
  oscarCategory,
  onModeChange,
  onOscarChange,
  onSpinClick,
  onRateClick,
  onLoveClick,
  onSaveClick,
  onIgnoreClick
}: RouletteSectionProps) {
  const [emailInput, setEmailInput] = useState('');
  const [friends, setFriends] = useState<any[]>([]);
  const [friendResults, setFriendResults] = useState<any[]>([]);
  const [isSearchingFriends, setIsSearchingFriends] = useState(false);

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && emailInput.trim() !== '') {
      e.preventDefault();
      if (!friends.includes(emailInput.trim()) && emailInput.includes('@')) {
        setFriends([...friends, emailInput.trim()]);
      }
      setEmailInput('');
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setFriends(friends.filter((e: string) => e !== emailToRemove));
  };

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 pb-24">
      {!movie ? (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700 w-full">
          <div className="text-center space-y-4 max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-cream">
              O que vamos <span className="text-gold">assistir</span> hoje?
            </h2>
            <p className="text-white/50 text-lg">Escolha entre explorar o vasto catálogo ou apostar nos clássicos aclamados pela Academia.</p>
          </div>

          <div className="flex bg-surface/50 p-1.5 rounded-2xl border border-white/5">
            <button onClick={() => onModeChange('random')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${rouletteMode === 'random' ? 'bg-white/10 text-cream shadow-sm' : 'text-white/40 hover:text-white/80'}`}>
              <Shuffle size={18} /> Catálogo TMDB
            </button>
            <button onClick={() => onModeChange('oscar')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${rouletteMode === 'oscar' ? 'bg-gold/20 text-gold shadow-sm' : 'text-white/40 hover:text-white/80'}`}>
              <Award size={18} /> Ouro do Oscar
            </button>
          </div>

          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            {rouletteMode === 'oscar' && (
              <div className="w-full relative animate-in slide-in-from-top-2 fade-in">
                <select value={oscarCategory} onChange={(e) => onOscarChange(e.target.value)} className="w-full bg-surface border border-white/10 text-cream px-4 py-4 rounded-xl outline-none cursor-pointer focus:border-gold/50 transition-colors appearance-none font-medium">
                  <option value="ALL">🏆 Todas as Categorias</option>
                  <option value="PICTURE">Melhor Filme</option>
                  <option value="DIRECTING">Melhor Diretor</option>
                  <option value="ACTOR IN A LEADING">Melhor Ator</option>
                  <option value="ACTRESS IN A LEADING">Melhor Atriz</option>
                  <option value="SCREENPLAY">Melhor Roteiro</option>
                  <option value="ANIMATED">Melhor Animação</option>
                  <option value="INTERNATIONAL">Filme Internacional</option>
                  <option value="CINEMATOGRAPHY">Melhor Fotografia</option>
                  <option value="SCORE">Melhor Trilha Sonora</option>
                  <option value="VISUAL EFFECTS">Melhores Efeitos Visuais</option>
                  <option value="EDITING">Melhor Montagem</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={20} />
              </div>
            )}
            <button onClick={onSpinClick} disabled={isLoading} className="w-full bg-gold hover:bg-[#E4A836] text-background px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-50">
              {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Play fill="currentColor" size={24} />}
              {isLoading ? 'Sorteando...' : 'Girar Roleta'}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-surface/50 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
          <div className="w-full md:w-2/5 relative">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover aspect-[2/3] md:aspect-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />
            {movie.isOscarWinner && (
              <div className="absolute top-6 left-6 bg-gradient-to-r from-gold to-[#B37E1C] text-background text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Award size={14} /> Ganhador do Oscar
              </div>
            )}
          </div>
          
          <div className="w-full md:w-3/5 p-6 sm:p-10 flex flex-col justify-between relative z-10 -mt-10 md:mt-0">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-white/10 text-cream px-3 py-1 rounded-full text-xs font-bold">{movie.releaseYear}</span>
                <span className="bg-white/10 text-cream px-3 py-1 rounded-full text-xs font-bold">{movie.runtime} min</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-heading font-black text-cream mb-4">{movie.title}</h2>
              <p className="text-gold font-medium mb-6">Dirigido por {movie.director}</p>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base line-clamp-4 md:line-clamp-none">{movie.overview}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => onRateClick(star)} className="focus:outline-none transition-transform hover:scale-110">
                      <Star size={32} className={`${star <= userRating ? 'text-gold fill-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'text-white/20'}`} />
                    </button>
                  ))}
                </div>
                <button onClick={onLoveClick} className={`p-3 rounded-full transition-all ${isLoved ? 'bg-wine text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                  <Heart size={24} className={isLoved ? 'fill-white' : ''} />
                </button>
              </div>

              <div className="mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/40 mb-3">
                  <Users size={16} /> Assistiu com alguém? (Watch Party)
                </label>
                
                {/* Lista de Amigos Selecionados */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {friends.map((friend: any) => (
                    <span key={friend.email} className="bg-gold/10 border border-gold/20 text-gold pl-1 pr-3 py-1 rounded-full text-sm flex items-center gap-2 animate-in zoom-in">
                      <div className="w-6 h-6 rounded-full bg-gold text-background flex items-center justify-center text-[10px] font-bold">
                        {friend.nickname.charAt(0).toUpperCase()}
                      </div>
                      {friend.nickname} 
                      <X size={14} className="cursor-pointer hover:text-white ml-1" onClick={() => setFriends(friends.filter((f: any) => f.email !== friend.email))} />
                    </span>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isSearchingFriends ? <Loader2 size={16} className="animate-spin text-gold" /> : <Search size={16} className="text-white/30" />}
                  </div>
                  <input 
                    type="text"
                    value={emailInput}
                    onChange={(e) => {
                      const query = e.target.value;
                      setEmailInput(query);
                      if (query.trim().length >= 2) {
                        setIsSearchingFriends(true);
                      
                        setTimeout(async () => {
                          try {
                            const res = await api(`/api/users/search?query=${query}`);
                            setFriendResults(res);
                          } catch (err) {}
                          setIsSearchingFriends(false);
                        }, 500);
                      } else {
                        setFriendResults([]);
                      }
                    }}
                    placeholder="Busque pelo Nickname ou E-mail..."
                    className="w-full bg-background border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-cream focus:outline-none focus:border-gold/50"
                  />
                  
                  {friendResults.length > 0 && emailInput.trim().length >= 2 && (
                    <div className="absolute top-full mt-2 left-0 w-full bg-surface border border-white/10 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto divide-y divide-white/5">
                      {friendResults.map((user: any) => (
                        <div 
                          key={user.email} 
                          onClick={() => {
                            if (!friends.some((f: any) => f.email === user.email)) {
                              setFriends([...friends, user]);
                            }
                            setEmailInput('');
                            setFriendResults([]);
                          }}
                          className="p-3 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 text-gold flex items-center justify-center text-xs font-bold">
                            {user.nickname.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-cream font-medium text-sm leading-tight">{user.nickname}</p>
                            <p className="text-white/30 text-xs">{user.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => { setFriends([]); onIgnoreClick(); }} className="flex-1 py-4 bg-surface border border-white/5 rounded-xl font-bold text-white/50 hover:bg-white/5 hover:text-cream transition-colors flex items-center justify-center gap-2">
                  <X size={20} /> Passo
                </button>
                <button 
                  onClick={() => { onSaveClick(friends.map((f: any) => f.email)); setFriends([]); }} 
                  disabled={userRating === 0} 
                  className="flex-[2] py-4 bg-gold disabled:bg-surface disabled:text-white/30 text-background rounded-xl font-bold hover:bg-[#E4A836] transition-colors flex items-center justify-center gap-2"
                >
                  <Star size={20} fill="currentColor" /> Avaliar Filme
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}