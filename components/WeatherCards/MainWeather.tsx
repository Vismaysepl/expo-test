import { Card, Text } from "react-native-paper";
import { ImageBackground, StyleSheet } from "react-native";

const MainWeather = (props: any) => {
    const weatherMain = props.weather?.main || 'Clear';

    type WeatherType = 'Clear' | 'Clouds' | 'Rain' | 'Thunderstorm';

    const imageMap: Record<WeatherType, any> = {
        Clear: require('../../assets/images/partlycloudy.jpg'),
        Clouds: require('../../assets/images/partlycloudy.jpg'),
        Rain: require('../../assets/images/partlycloudy.jpg'),
        Thunderstorm: require('../../assets/images/partlycloudy.jpg'),
    };

    const fallbackImage = require('../../assets/images/partlycloudy.jpg');

    return (
        <Card style={styles.card}>
            <ImageBackground
                source={fallbackImage}
                resizeMode="cover"
                style={styles.background}
                imageStyle={{ borderRadius: 12 }} // Match Card styling
            >
                <Text style={styles.text}>{weatherMain}</Text>
                <Text style={styles.text}>{props.weather?.description || 'No description'}</Text>
            </ImageBackground>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        overflow: 'hidden', // important for rounded corners on background image
        margin: 16,
    },
    background: {
        padding: 16,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
});

export default MainWeather;
