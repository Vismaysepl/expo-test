import { Card, Text } from "react-native-paper"
import { ImageBackground, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const WindCard = ({ windy }: any) => {

    const styles = StyleSheet.create({
        card: {
            borderRadius: 12,
            overflow: 'hidden',
            margin: 16,
        },
        backimage: {
            width: '100%',
            justifyContent: 'center',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            padding: 16,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 100
        },
        icon: {
            marginRight: 16,
        },
        textContainer: {
            flex: 1,
        },
        text: {
            color: 'white',
            fontSize: 16,
            marginBottom: 4,
        },
    });

    const backgroundImage = require('../../assets/images/windy.jpg')

    return <Card style={styles.card}>
        <ImageBackground source={backgroundImage} style={styles.backimage} imageStyle={{ borderRadius: 12 }}>
            <Card.Content style={styles.overlay}>
                <View style={styles.row}>
                    <MaterialCommunityIcons style={styles.icon} name="weather-windy" size={50} color="white" />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Wind Direction: {windy?.windDirection || 'No direction'}</Text>
                        <Text style={styles.text}>Wind Gust: {windy?.windGust || 'No gust'}</Text>
                        <Text style={styles.text}>Wind Speed: {windy?.windSpeed || 'No gust'}</Text>
                    </View>
                </View>
            </Card.Content>
        </ImageBackground>
    </Card>


}

export default WindCard