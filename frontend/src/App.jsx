// import Header from "./common/Header";
// import Footer from "./common/Footer";
// import { Route, Routes } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import Movie from "./components/Movie";
// import Theater from "./components/Theater";
// import AuthForm from "./components/Auth/AuthForm";



// function App() {
//   return (
//     <>
    
//     <div style={{ backgroundColor: '#141414', height: '100vh' }}>
//       <Header isAdmin={true}></Header>
//       <section>
//         <Routes>
//           <Route path="/" element={<HomePage></HomePage>}></Route>
//           <Route path="/theater" element={<Theater></Theater>}></Route>
//           <Route path="/movie" element={<Movie></Movie>}></Route>
//           <Route path="/register" element={<AuthForm></AuthForm>}></Route>
//         </Routes>
//       </section>
//       <Footer />
//     </div>
     
//     </>
//   )
// }

// export default App

import "./App.css";
import HomePage from "./home/HomePage";
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import SinglePage from "./components/watch/SinglePage";
// import Header from "./components/header/Header";
import Footer from "./common/Footer.jsx";

import Header from "./common/Header";
// import Footer from "./common/Footer";
import Movie from "../src/components/Movies/Movie.jsx";
import Theater from "../src/components/Theater/Theater";
import AuthForm from "./components/Auth/AuthForm";


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/singlepage/:id" element={<SinglePage />} />
        <Route path="/theater" element={<Theater></Theater>}></Route>
        <Route path="/movie" element={<Movie></Movie>}></Route>
        <Route path="/register" element={<AuthForm></AuthForm>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

