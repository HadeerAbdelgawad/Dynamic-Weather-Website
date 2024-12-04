import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  const[weatherData, setWeatherData]= useState(null)
  const[address, setAddress]= useState('')
  const [loading, setLoading] = useState(false)
  const[ error, setError]=useState(null)


  async function getWeather(event){
    event.preventDefault()
    setError(null)
    if (!address) {
      console.error("Please enter a location.");
      setError("Please enter a location.")
      return;
    }
    setLoading(true)
    try{
      let {data}= await axios.get(`https://api.weatherapi.com/v1/current.json?key=a4f9f4b855b945ffaf7215028241607&q=${address}&aqi=no`)
      console.log(data)
      if(data.error){
        setError(data.error.message)
        setWeatherData(null)
        console.log(weatherData)
      }else{
        setWeatherData(data)
      }
      
    }catch(error){
      console.error("Error fetching weather data:", error.message)
      setError('Error fetching weather data. Please try again.')
    } finally {
      setLoading(false) 
    }
   
  }


  useEffect(() => {
    console.log("Updated weatherData:", weatherData);
  }, [weatherData]);


return (
<>
    <div className=' '>
      <div className='head bg-dark p-2 top-0 w-100 h-15'>
        <form onSubmit={getWeather}>
          <input 
          type='text' 
          placeholder='Enter Country' 
          value={address} 
          className='my-input my-2 my-4 pb-2 ps-3 pt-1 me-2 w-50' 
          onChange={(e)=> setAddress(e.target.value)}/>
          <button type='submit' className='btn btn-primary'>
            Get Weather
          </button>
        </form>
        
      </div>

      {loading?(
        <p className='m-2 p-2' style={{ color:'white', backgroundColor:'gray', fontSize:'19px'}}>
           Loading weather data...
        </p>
      ): weatherData ? (
        <div>
          <p className="m-2 p-2" style={{ color:'white', backgroundColor:'gray', fontSize:'19px'}}>
            <span className='text-muted'>Weather Condition : </span>
            {weatherData?.current?.condition?.text || "No condition data available"}
          </p>
          <p className="m-2 p-2" style={{ color:'white', backgroundColor:'gray', fontSize:'19px'}}>
            <span className='text-muted'>Temperature in Celsius : </span>
            {weatherData?.current.temp_c || "No temperature data available"} °C
          </p>
          <p className="m-2 p-2" style={{ color:'white', backgroundColor:'gray', fontSize:'19px'}}>
            <span className='text-muted'>Temperature in Fahrenheit : </span>
            {weatherData.current.temp_f || "No temperature data available"} °F
          </p>
        </div>
          
        ) : (
          <p className="m-2 p-2" style={{ color:'red', backgroundColor:'gray', fontSize:'19px'}}>
            No weather data available. Enter a location above.</p>
        )}
    </div>
  </>
)
  
}

export default App

