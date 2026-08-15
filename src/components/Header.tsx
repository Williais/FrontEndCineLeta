import { LogIn, User, LogOut, Shuffle, Search, LayoutDashboard } from 'lucide-react'
import LogoRoleta from '../assets/LogoRoleta'

interface HeaderProps {
  activeTab: 'roulette' | 'search' | 'dashboard'
  isLoggedIn?: boolean
  userName?: string
  userPhoto?: string
  onTabChange: (tab: 'roulette' | 'search' | 'dashboard') => void;
  onLoginClick: () => void
  onLogoutClick: () => void
  onProfileClick: () => void
}


export function Header({ 
  activeTab,
  isLoggedIn = false, 
  userName = "Visitante", 
  userPhoto,
  onTabChange,
  onLoginClick, 
  onLogoutClick,
  onProfileClick
}: HeaderProps) {
  
  const navItems = [
    { id: 'roulette', label: 'Roleta', icon: Shuffle },
    { id: 'search', label: 'Adicionar (TMDB)', icon: Search },
    { id: 'dashboard', label: 'Meu Painel', icon: LayoutDashboard },
  ] as const

  return (
    <header className="w-full bg-background/80 border-b border-white/5 py-4 px-6 sticky top-0 z-50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
      
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onTabChange('roulette')}>
          <LogoRoleta width={40} height={40} className="drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform" />
          <h1 className="font-heading text-2xl font-bold tracking-wide text-cream">
            Cine<span className="text-gold">Leta</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-surface/50 p-1 rounded-2xl border border-white/5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === id 
                  ? 'bg-white/10 text-gold shadow-sm' 
                  : 'text-white/40 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center">
          {!isLoggedIn ? (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <LogIn size={18} />
              <span className="hidden sm:inline">Entrar com Google</span>
            </button>
          ) : (
            <div className="flex items-center gap-4 bg-surface/30 pl-2 pr-4 py-1.5 rounded-full border border-white/5">
              <button 
                onClick={onProfileClick}
                className="flex items-center gap-3 hover:opacity-75 transition-opacity focus:outline-none"
                title="Configurações da Conta"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/30">
                  {userPhoto ? (
                    <img src={userPhoto} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-surface flex items-center justify-center">
                      <User size={16} className="text-white/50" />
                    </div>
                  )}
                </div>
                <span className="font-medium text-sm text-cream hidden sm:block">{userName.split(' ')[0]}</span>
              </button>
              
              <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block"></div>
              
              <button 
                onClick={onLogoutClick}
                className="text-white/40 hover:text-wine transition-colors"
                title="Sair"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}