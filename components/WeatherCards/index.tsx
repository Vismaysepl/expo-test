import { Card, Text } from "react-native-paper"
import MainWeather from "./MainWeather"
import WeatherInfoOfCity from "./WeatherInfoOfCity"


const WeatherCard = (props: any) => {

    return <Card>
        <WeatherInfoOfCity info={props?.Weatherreport} />
        <MainWeather weather={props?.Weatherreport.weather[0] || {}} />
    </Card>
}

export default WeatherCard