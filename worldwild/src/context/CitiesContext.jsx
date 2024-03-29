import { createContext,useContext,useState,useEffect } from "react";
const BASE_URL = "http://localhost:9000"
const CitiesContext = createContext();
function CitiesProvider({children}){
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
   return <CitiesContext.Provider value={{
    cities,
    isLoading,
    }}>
        {children}
    </CitiesContext.Provider>

}

function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error("Context was used outside the Provider");
    return context;
}

export {CitiesProvider,useCities}