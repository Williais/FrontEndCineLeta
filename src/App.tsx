import './App.css'
import LogoRoleta from './assets/LogoRoleta'
import { Header } from './components/Header'
import { RouletteSection } from './components/RouletteSection'

function App() {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">

      <Header/>
      <RouletteSection/>
    </div>
  )
}

export default App
