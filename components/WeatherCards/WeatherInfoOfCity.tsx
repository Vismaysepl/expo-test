import { Card, Text } from "react-native-paper";
import { ImageBackground, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors"; // import your theme file

const WeatherInfoOfCity = ({ info, weather }: any) => {
    const weatherType: any = weather.toLowerCase().split(' ')[1] || 'sunny';

    type WeatherType = 'sunny' | 'clouds' | 'rain' | 'thunderstorm';

    const imageMap: Record<WeatherType, any> = {
        sunny: require('../../assets/images/clear.jpg'),
        clouds: require('../../assets/images/cloudy.jpg'),
        rain: require('../../assets/images/rainy.jpg'),
        thunderstorm: require('../../assets/images/thunderstorm.jpg'),
    };

    const image = imageMap[weatherType]
    const styles = StyleSheet.create({
        card: {
            borderRadius: 12,
            overflow: 'hidden',
            margin: 16,
            // backgroundColor: '#393E46',
            height: 300,
            // padding: 10,
        },
        maintemp: {
            color: 'white',//colors.temperature,
            padding: 10,
            fontSize: 40,
            fontWeight: "600",
        },
        atmos: {
            color: 'white',//colors.button,
            fontSize: 20,
            padding: 10,
            fontWeight: "500",
        },
        realfeel: {
            color: 'white',//colors.temperature,
            fontSize: 18,
            padding: 10,
        },
        icon: {
            alignSelf: "center",
        },
        backimage: {
            width: '100%',
            height: 'auto',
            justifyContent: 'center',
        },
        overlay: {
            padding: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
    });

    let iconName: any = 'sunny-outline' // weatherType === 'clear' ? 'sunny-outline' : 'partly-sunny-outline';
    if (weatherType == 'clear') {
        iconName = 'sunny-outline'
    } else if (weatherType.includes('rain')) {
        iconName = 'rainy-outline'
    } else if (weatherType == 'cloudy') {
        iconName = 'partly-sunny-outline'
    } else if (weatherType == 'thunder') {
        iconName = 'thunderstorm-outline'
    }

    return (
        <Card style={styles.card}>
            <ImageBackground source={image} style={styles.backimage} imageStyle={{ borderRadius: 12 }}>
                <Card.Content style={styles.overlay}>
                    <Text style={styles.maintemp}>{info?.temperature || ''} &deg;
                        <Ionicons name={iconName} size={36} color='white' style={styles.icon} />
                    </Text>
                    <Text style={styles.atmos}>
                        {weather || ''}
                    </Text>
                    <Text style={styles.realfeel}>Real Feel: {info?.temperatureApparent || ''}&deg;</Text>
                    <Text style={styles.realfeel}>Visibility: {info?.visibility || ''} </Text>
                    <Text style={styles.atmos}>
                        {info?.weather?.[0]?.main || ''}
                    </Text>
                    <Text style={styles.atmos}>
                        {info?.weather?.[0]?.main || ''}
                    </Text>
                </Card.Content>
            </ImageBackground>
        </Card>
    );
};

export default WeatherInfoOfCity;
