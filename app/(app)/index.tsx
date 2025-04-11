import { Button, TextInput, Card, ActivityIndicator, MD2Colors } from 'react-native-paper';
import axios from 'axios'
import React, { useState } from 'react';
import { View } from 'react-native';
import { APPID, WEATHER_API } from '@/constants/api';
import { london } from '@/constants/exampledata'
import WeatherCard from '@/components/WeatherCards';

export default function Home() {
    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState<any>(null)




    const fetchDetails = async () => {
        try {
            setLoading(true)
            // const weather = await axios.get(`${WEATHER_API}/weather?q=${city}&APPID=${APPID}`)
            // console.log('weather', weather.data)
            setWeatherData(london)
            setTimeout(() => {
                setLoading(false)
            }, 2000)
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
            {(loading == false && weatherData) && <WeatherCard Weatherreport={weatherData} />}
        </React.Fragment>
    );
}
