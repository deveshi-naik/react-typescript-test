import { makeServer} from './backend/server'
import Dashboard from './components/Dashboard'

makeServer();

function App() {

  return (
    <>
      <Dashboard />
    </>
  )
}

export default App
