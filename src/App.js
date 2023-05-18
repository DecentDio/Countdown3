import './App.css';
import {useEffect, useState} from "react"
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


function App() {
  const [isLat, setLat] = useState([]);
  const [isLong, setLong] = useState([]);
  const [isCity, setCity] = useState();
  const [isAnsweredGEO, setIsAnsweredGEO] = useState(false);
  const [isAnsweredLL, setIsAnsweredLL] = useState(false);
  const [isAnsweredNews, setIsAnsweredNews] = useState(false);
  const [isDataGEO, setDataGEO]= useState([]);
  const [isDataWEA, setDataWEA] = useState([]);
  const [isNews, setNews] = useState([]);

  const API_WEB_WEATHER = new URL('https://api.openweathermap.org/data/3.0/onecall')
  const API_WEB_GEO = new URL("http://api.openweathermap.org/geo/1.0/direct")
  const API_WEATHER = process.env.REACT_APP_api_key_weather;
  const API_NY = process.env.REACT_APP_api_key_NY;


  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const generateGEO = () =>{
    fetch(API_WEB_GEO.toString())
    .then((res) => res.json())
    .then((result) => {
      setDataGEO(result)
    })
    setIsAnsweredGEO(true)

    fetch("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + API_NY)
    .then((res) => res.json())
    .then((result) => setNews(result.results))
  }

  const click = () => {
    API_WEB_GEO.searchParams.append("q",isCity)
    API_WEB_GEO.searchParams.append("limit", "1")
    API_WEB_GEO.searchParams.append("appid", API_WEATHER);
    generateGEO()
  }

  const generateLongLat = () => {
    console.log(isDataGEO)
    setIsAnsweredLL(true)
    setLat(isDataGEO[0].lat)
    setLong(isDataGEO[0].lon)
  }

  const generateWEA = () => {
    API_WEB_WEATHER.searchParams.append("lat", isLat)
    API_WEB_WEATHER.searchParams.append("lon", isLong)
    API_WEB_WEATHER.searchParams.append("appid", API_WEATHER)
    fetch(API_WEB_WEATHER.toString())
    .then((res) => res.json())
    .then((result) => setDataWEA(result))
  }

  const weatherClick = () => {
    setIsAnsweredGEO(true)
    generateLongLat()
  }

  const newsClick = () => {
    setIsAnsweredNews(true)
  }


  return (
    <>
    <div style={{margin: '0%'}}>
    <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant='h3'  gutterBottom>
          Enter Your City
        </Typography>
        <Typography variant="h4" component="div">
          If it is a US City:
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        </Typography>
        <Typography variant="body1">
        In the search bar use this format: (City),(StateCode),USA
          <br />
          {'"An Example: Charlottesville,VA,USA"'}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
    </div>
    <br></br>
    <input
    value={isCity}
    onChange={e => setCity(e.target.value)}
     />
    {!isAnsweredGEO && <Button variant="outlined" size="small" type="submit" onClick={click}>Click Here</Button>}
    <br></br>
    {isAnsweredGEO && <Button variant="outlined" size="small" type="submit" onClick={weatherClick}> Click Here For Weather</Button>}
    {isAnsweredGEO && <Button variant="outlined" size="small" type="submit" onClick={newsClick}> Click Here For News</Button>}
    <p><strong></strong></p>
    {isAnsweredLL && <Typography>Your latitude coordinate is: {isLat}<br></br>Your longitude coordinate is: {isLong}</Typography>}
    {isAnsweredNews && <h2>Top Stories Today:</h2>}
    <div style={{margin: '1%'}}>
    {isAnsweredNews && <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h4" component="div">
         {isNews[0].title}
        </Typography>
        <Typography variant="body1">
          {isNews[0].abstract}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>}
    <br></br>
    {isAnsweredNews && <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h4" component="div">
         {isNews[1].title}
        </Typography>
        <Typography variant="body1">
          {isNews[1].abstract}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>}
    <br></br>
    {isAnsweredNews && <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h4" component="div">
         {isNews[2].title}
        </Typography>
        <Typography variant="body1">
          {isNews[2].abstract}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>}
    <br></br>
    {isAnsweredNews && <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h4" component="div">
         {isNews[3].title}
        </Typography>
        <Typography variant="body1">
          {isNews[3].abstract}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>}
    <br></br>
    {isAnsweredNews && <Card sx={{ maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h4" component="div">
         {isNews[4].title}
        </Typography>
        <Typography variant="body1">
          {isNews[4].abstract}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>}

    </div>
    </>
    
  );
}

export default App;
