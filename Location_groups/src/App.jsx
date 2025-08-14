import './App.css'
import Dashboard from './Components/Dashboard'
import {Toaster} from 'react-hot-toast';
function App() {


  return (
    <>
    <Toaster/>
      <div className="app">
        <Dashboard/>
      </div>
    </>
  )
}

export default App
