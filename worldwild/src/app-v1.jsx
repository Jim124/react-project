import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {useState,useEffect} from "react"

import Product from "./pages/Product"
import Homepage from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"

const BASE_URL = "http://localhost:9000"
function App() {
  const [cities,setCities] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(function(){
    async function fetchCities(){
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("there is an error");
      }finally{
        setIsLoading(false)
      }
    }
    fetchCities()
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="pageNotFound" element={<PageNotFound />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index  element={<Navigate replace to="cities"/>} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities/:id" element={<City />}/>
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound/> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
