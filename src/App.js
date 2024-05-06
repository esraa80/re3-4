import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/navbar/navbar";
import Movies from "./components/movies/movies";
import Favorits from "./components/faviorts/faviorts";
import Login from "./components/login/login";
import DetailsProduct from "./components/detailsProducts/detailsProducts";
import Notfound from "./components/notFound/notfound";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {


  return (
    <Provider store={store}>
      <div  className="App">
        <Navbar />
        <Routes>
          <Route path="/movies" element={<Movies />} />
          <Route path="/favorits" element={<Favorits />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details/:id" element={<DetailsProduct />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Provider>
  );

}

export default App;
