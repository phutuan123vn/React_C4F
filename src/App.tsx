import { UserContext } from "./components/Context/UserContext"
import NavBar from './components/Navigation/Navbar';

function App() {

  return (
    <>
      {/* <UserContext.Provider value={{ token: null}}> */}
        <NavBar />
      {/* </UserContext.Provider> */}
      {/* <div>
        Hello World
      </div> */}
    </>
  )
}

export default App
