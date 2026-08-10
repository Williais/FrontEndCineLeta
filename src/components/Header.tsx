import { LogIn, User, LogOut } from 'lucide-react';
import LogoRoleta from '../assets/LogoRoleta';


interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onDashboardClick?: () => void;
}

export function Header({ 
  isLoggedIn = false, 
  userName = "Usuário", 
  onLoginClick, 
  onLogoutClick,
  onDashboardClick
}: HeaderProps) {
  return (
    <header className="w-full bg-surface border-b border-white/5 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3 cursor-pointer">
          <LogoRoleta width={40} height={40} />
          <h1 className="font-heading text-2xl font-bold text-gold tracking-wide">
            CineLeta
          </h1>
        </div>


        <div>
          {!isLoggedIn ? (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-cream px-5 py-2.5 rounded-full font-medium transition-colors"
            >
              <LogIn size={18} />
              <span>Entrar com Google</span>
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button 
                onClick={onDashboardClick}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <User size={20} />
                <span className="font-medium hidden sm:block">{userName}</span>
              </button>
              <button 
                onClick={onLogoutClick}
                className="p-2 text-white/50 hover:text-wine transition-colors rounded-full hover:bg-wine/10"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}