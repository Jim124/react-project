import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
function Map() {
    const nagigate = useNavigate()
    const [searchParams,setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return (
        <div className={styles.mapContainer} onClick={()=>nagigate("form")}>
         Map 
         <p>{lat} {lng}</p>  
         <button className='btn' onClick={() =>setSearchParams({lat:12,lng:50})}>
            Change position
         </button>
        </div>
        
    )
}

export default Map
