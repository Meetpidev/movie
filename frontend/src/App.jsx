import Header from "./common/Header";
import Footer from "./common/Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Movie from "./components/Movie";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import Authuser from "./components/Auth/Authuser";
import Theater from "./components/Theater";

function App() {
  return (
    <>
    
      <Header isAdmin={true}></Header>
      <section>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/theater" element={<Theater></Theater>}></Route>
          <Route path="/movie" element={<Movie></Movie>}></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route path="/user" element={<Authuser></Authuser>}></Route>
        </Routes>
      </section>
     
    </>
  )
}

export default App
