import Header from "./common/Header";
import Footer from "./common/Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Movie from "./components/Movie";
import Theater from "./components/Theater";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  return (
    <>
    
      <Header isAdmin={true}></Header>
      <section>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/theater" element={<Theater></Theater>}></Route>
          <Route path="/movie" element={<Movie></Movie>}></Route>
          <Route path="/register" element={<AuthForm></AuthForm>}></Route>
        </Routes>
      </section>
     
    </>
  )
}

export default App
