import React, { useState } from 'react';
import { User, Save, Shield, Bell, CheckCircle2, Lock, Edit3 } from 'lucide-react';

interface ProfileSectionProps {
  currentName: string;
  userEmail?: string;
  userPhoto?: string;
  onSaveProfile: (newName: string) => void;
}

export function ProfileSection({ currentName, userEmail = "Carregando...", userPhoto, onSaveProfile }: ProfileSectionProps) {
  const [name, setName] = useState(currentName);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== currentName && name.trim() !== '') {
      setIsSaving(true);
      await onSaveProfile(name);
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 animate-in fade-in duration-500">
      
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-cream mb-2">Configurações da Conta</h2>
        <p className="text-white/50 font-sans">Gerencie seus dados pessoais e como você aparece para seus parceiros de sessão.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Menu Lateral */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-gold rounded-xl font-medium border border-white/5 transition-colors shadow-sm">
            <User size={18} /> Meu Perfil
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:bg-white/5 hover:text-cream rounded-xl font-medium transition-colors group">
            <Shield size={18} className="group-hover:text-cream transition-colors" /> Segurança
            <span className="ml-auto text-[10px] uppercase font-bold bg-white/5 px-2 py-0.5 rounded text-white/30">Em Breve</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:bg-white/5 hover:text-cream rounded-xl font-medium transition-colors group">
            <Bell size={18} className="group-hover:text-cream transition-colors" /> Notificações
            <span className="ml-auto text-[10px] uppercase font-bold bg-white/5 px-2 py-0.5 rounded text-white/30">Em Breve</span>
          </button>
        </div>

        {/* Área Principal de Perfil */}
        <div className="md:col-span-3">
          <div className="bg-surface border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Header do Card com Avatar */}
            <div className="bg-white/[0.02] border-b border-white/5 p-8 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0">
                {userPhoto ? (
                  <img src={userPhoto} alt="Sua foto" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-background flex items-center justify-center">
                    <User size={32} className="text-white/20" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-cream">{currentName}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/5 text-white/50 px-3 py-1 rounded-full mt-2 border border-white/10">
                  Conta Google Vinculada
                </span>
              </div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Nome de Exibição (Nickname)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Edit3 size={18} className="text-white/30" />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Como seus amigos vão te chamar?"
                  />
                </div>
                <p className="text-xs text-white/30 mt-2 ml-1">
                  Este nome será exibido nas Sessões em Grupo (Watch Parties) e nas suas avaliações.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">E-mail Principal</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-white/20" />
                  </div>
                  <input 
                    type="email" 
                    value={userEmail}
                    disabled
                    className="w-full bg-black/20 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-white/30 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-white/30 mt-2 ml-1">
                  Seu e-mail é sincronizado automaticamente com o Google Auth e não pode ser alterado manualmente.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-end gap-4">
                {isSaved && (
                  <span className="flex items-center gap-2 text-sm text-green-400 font-medium animate-in fade-in slide-in-from-right-4">
                    <CheckCircle2 size={18} /> Alterações salvas!
                  </span>
                )}
                <button 
                  type="submit"
                  disabled={name.trim() === currentName || name.trim() === '' || isSaving}
                  className="px-8 py-3.5 bg-gold hover:bg-[#E4A836] disabled:bg-white/5 disabled:text-white/30 text-background rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.15)] disabled:shadow-none"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}