import React, { useState } from 'react';
import { User, Save, Shield, Bell, CheckCircle2 } from 'lucide-react';

interface ProfileSectionProps {
  currentName: string;
  userEmail?: string;
  onSaveProfile: (newName: string) => void;
}

export function ProfileSection({ currentName, userEmail = "email@conectado.com", onSaveProfile }: ProfileSectionProps) {
  const [name, setName] = useState(currentName);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== currentName) {
      onSaveProfile(name);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 animate-in fade-in duration-500">
      
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-cream mb-2">Configurações da Conta</h2>
        <p className="text-white/50 font-sans">Gerencie seus dados pessoais e preferências do CineLeta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
      
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 text-gold rounded-xl font-medium border border-white/5 transition-colors">
            <User size={18} /> Meu Perfil
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:bg-white/5 hover:text-cream rounded-xl font-medium transition-colors">
            <Shield size={18} /> Segurança
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/40 hover:bg-white/5 hover:text-cream rounded-xl font-medium transition-colors">
            <Bell size={18} /> Notificações
          </button>
        </div>

       
        <div className="md:col-span-2">
          <div className="bg-surface border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-xl font-heading font-semibold text-cream mb-6 border-b border-white/5 pb-4">
              Informações Pessoais
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
           
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Nome de Exibição</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Seu nome"
                />
                <p className="text-xs text-white/30 mt-2">
                  Este é o nome que aparecerá no seu painel e avaliações.
                </p>
              </div>

          
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">E-mail Vinculado</label>
                <input 
                  type="email" 
                  value={userEmail}
                  disabled
                  className="w-full bg-background/50 border border-white/5 rounded-xl px-4 py-3 text-white/40 cursor-not-allowed"
                />
                <p className="text-xs text-white/30 mt-2">
                  O seu e-mail é gerenciado pela sua conta do Google e não pode ser alterado aqui.
                </p>
              </div>

     
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-end gap-4">
                {isSaved && (
                  <span className="flex items-center gap-2 text-sm text-green-400 animate-in fade-in">
                    <CheckCircle2 size={16} /> Salvo com sucesso
                  </span>
                )}
                <button 
                  type="submit"
                  disabled={name.trim() === currentName || name.trim() === ''}
                  className="px-6 py-3 bg-gold hover:bg-[#E4A836] disabled:bg-white/5 disabled:text-white/30 text-background rounded-xl font-bold transition-colors flex items-center gap-2"
                >
                  <Save size={18} /> Salvar Alterações
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}