import './App.css'
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { Header } from './components/Header'
import { RouletteSection } from './components/RouletteSection'
import {ProfileSection} from './components/ProfileSection'

interface UserState {
  isLoggedIn: boolean
  name: string
  photo: string | null
  memberSince: string
}

function App() {

  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    name: 'Visitante',
    photo: null,
    memberSince: ''
  })

  const [activeTab, setActiveTab] = useState<'roulette'| 'search'| 'dashboard' | 'profile'> ('roulette')

  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  }

  const handleLogout = () => {
    setUser({isLoggedIn: false, name: 'Visitante', photo: null, memberSince: ''})
  }

  useEffect(() => {
    const checkSession = async () => {

      try{
        const userData = await api('/api/users/me')

        setUser({
          isLoggedIn: true,
          name: userData.name || "Usuário Cineleta",
          photo: userData.picture || null,
          memberSince: "Hoje"
        })
      }catch(err){
        console.log("Usuário não está autenticado no momento.")  
      }
    }

    checkSession();
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeTab={activeTab}
        isLoggedIn={user.isLoggedIn}
        userName={user.name}
        userPhoto={user.photo || undefined}
        onTabChange={setActiveTab}
        onLoginClick={handleLogin}
        onLogoutClick={handleLogout}
        onProfileClick={() => setActiveTab('profile')}
        />
        <main className="flex-1">
        {activeTab === 'roulette' && (
         
        <RouletteSection/>
        )}
        {activeTab === 'profile' && (
          <ProfileSection 
            currentName={user.name}
            onSaveProfile={(newName) => {
              setUser(prev => ({ ...prev, name: newName }));
            }}
          />
        )}
      </main>
    </div>

  )
}

export default App
