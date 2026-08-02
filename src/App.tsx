import './App.css'
import LogoRoleta from './assets/LogoRoleta'

function App() {
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Você pode passar propriedades como tamanho e classes CSS */}
      <LogoRoleta width={256} height={256} className="shadow-lg" />
    </div>
  )
}

export default App
