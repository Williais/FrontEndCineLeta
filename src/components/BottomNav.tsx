import { Shuffle, Search, LayoutDashboard, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'roulette' | 'search' | 'dashboard' | 'profile';
  onTabChange: (tab: 'roulette' | 'search' | 'dashboard' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-white/5 pb-safe z-50 flex justify-around items-center h-16 px-2">
      <button onClick={() => onTabChange('roulette')} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === 'roulette' ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
        <Shuffle size={20} />
        <span className="text-[10px] font-medium">Roleta</span>
      </button>
      <button onClick={() => onTabChange('search')} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === 'search' ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
        <Search size={20} />
        <span className="text-[10px] font-medium">Adicionar</span>
      </button>
      <button onClick={() => onTabChange('dashboard')} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === 'dashboard' ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
        <LayoutDashboard size={20} />
        <span className="text-[10px] font-medium">Painel</span>
      </button>
      <button onClick={() => onTabChange('profile')} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === 'profile' ? 'text-gold' : 'text-white/40 hover:text-white/70'}`}>
        <User size={20} />
        <span className="text-[10px] font-medium">Perfil</span>
      </button>
    </div>
  );
}