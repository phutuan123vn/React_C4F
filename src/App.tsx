import NavBar from "./components/Navigation/Navbar";
import AuthUserProvider from "./components/Context/AuthUser";
import RouteApp from "./Routes/RouteApp";

function App() {
  return (
    <>
      <AuthUserProvider>
        <NavBar />
        <RouteApp />
      </AuthUserProvider>
    </>
  );
}

export default App;
