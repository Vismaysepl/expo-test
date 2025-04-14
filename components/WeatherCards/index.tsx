import { Card, Text } from "react-native-paper";
import WeatherInfoOfCity from "./WeatherInfoOfCity";
import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import { weatherCode } from '@/constants/Weathercodes.json'
import WindCard from "./WindCard";
import HourlyWeatherCard from "./HourlyWeatherCard";

const { height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
    realfeel: {
        color: "white",
        fontSize: 24,
        padding: 10,
        paddingLeft: 21,
    },
    card: {
        height: screenHeight - 150, // 👈 take full screen height
        margin: 10,
        backgroundColor: '#222831'
    },
    scrollContainer: {
        flexGrow: 1,
    },
});

const WeatherCard = (props: any) => {
    const weathercode = props?.Weatherreport?.data?.values?.weatherCode || '0'
    const weathername = weatherCode[weathercode]

    return (
        <Card style={styles.card}>
            <Text style={styles.realfeel}>
                {props?.Weatherreport?.location?.name || ''}
            </Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <WeatherInfoOfCity info={props?.Weatherreport?.data?.values} weather={weathername} />
                <WindCard windy={props?.Weatherreport?.data?.values} />
                <HourlyWeatherCard data={props?.forecast?.timelines} />
                <Card style={styles.card}> <Text> {''}</Text></Card>
            </ScrollView>
        </Card>
    );
};

export default WeatherCard;
