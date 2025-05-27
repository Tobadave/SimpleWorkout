import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <>
      <div className=''HomePage>
        <BrowserRouter>
          <Routes>
            <Route to='/' element={ <Home /> } />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  
  )}


export default App
