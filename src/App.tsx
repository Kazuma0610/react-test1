//App.tsx
import { useState } from 'react'; //データの保管場所作り
import Title from "./components/Title";
import Form from "./components/Form";
import Results from "./components/Results";
import Loading from "./components/Loading";
import './App.css';

type ResultsStateType = {
  country: string;
  cityName:string;
  temperature: string;
  conditionText:string;
  icon:string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
        country: "",
        cityName:"",
        temperature: "",
        conditionText:"",
        icon:""
  });
    const getWeather = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        fetch(`https://api.weatherapi.com/v1/current.json?key=6599ae228ca54ad1b2a74932241009&q=${city}&aqi=no`)
        .then(res => res.json())
        .then(data => {
          setResults({
            country: data.location.country,
            cityName:data.location.name,
            temperature:data.current.temp_c, 
            conditionText:data.current.condition.text,
            icon:data.current.condition.icon         
        })
        setCity("");
        setLoading(false);
      })
      .catch(err => alert("エラーが発生しました。ページをリロードして、もう一度トライしてください。"))
  }
  return (
    <div className="wrapper">
      <div className="container">
        <Title />
        <Form setCity={setCity} getWeather={getWeather} city={city}/>
        {loading ? 
        <Loading/>
        :
        <Results results={results} />}
      </div>
    </div>
  );
}

export default App;
