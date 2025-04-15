import { Button, TextInput, Card, ActivityIndicator, MD2Colors } from 'react-native-paper';
import axios from 'axios'
import React, { useState } from 'react';
import { View } from 'react-native';
import { TOMORROW_API_KEY, TOMORROW_WEATHER_API } from '@/constants/api';
import WeatherCard from '@/components/WeatherCards';

export default function Home() {
    const [city, setCity] = useState('Ahmedabad')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState<any>(null)
    const [forecast, setForecast] = useState<any>(null)



    const fetchDetails = async () => {
        try {
            setLoading(true)
            const weather = await axios.get(`${TOMORROW_WEATHER_API}/realtime?location=${city.toLowerCase()}&apikey=${TOMORROW_API_KEY}`)
            const forecast = await axios.get(`${TOMORROW_WEATHER_API}/forecast?location=${city.toLowerCase()}&apikey=${TOMORROW_API_KEY}`)

            setWeatherData(weather.data)
            setForecast(forecast.data)
            setLoading(false)
        } catch (err) {
            console.log('err', err)
        }
    }

    return (
        <React.Fragment>
            <Card style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TextInput
                        mode="outlined"
                        label="City"
                        value={city}
                        placeholder="Type something"
                        style={{ width: 300 }}
                        onChangeText={e => setCity(e)}
                    />
                    <Button
                        icon="send"
                        mode="contained"
                        onPress={() => fetchDetails()}
                        style={{ justifyContent: 'center' }} // match TextInput height
                    >

                        Fetch
                    </Button>
                </View>

            </Card>
            <ActivityIndicator size={'large'} style={{ marginTop: 10 }} animating={loading} color={MD2Colors.deepPurpleA700} />
            {(loading == false && weatherData) && <WeatherCard Weatherreport={weatherData} forecast={forecast} />}
        </React.Fragment>
    );
}
