//  Form.tsx

import { useState } from 'react'; //データの保管場所作り


const Form = () => {
    const [city, setCity] = useState<string>("");
    const getWeather = (e:any) => {
        e.preventDefault();
        fetch("http://api.weatherapi.com/v1/current.json?key=4a6b8a42293f47718ab12401240101 &q=London&aqi=no")
        .then(res => console.log(res))
    }
    return(
        <form>
            <input type="text" name="city" placeholder="都市名"
            onChange={e => setCity(e.target.value)}/> 
            <button type="submit" onClick={getWeather}>Get Weather</button>
        </form>
    );
};

export default Form;