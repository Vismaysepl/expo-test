import { Card, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import moment from 'moment'
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { weatherCode } from '@/constants/Weathercodes.json'
import { Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';


const screenWidth = Dimensions.get('window').width;
const itemWidth = 60; // Adjust based on number of hours you want visible at once

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const HourlyWeatherCard = ({ data }: any) => {

    const icon = (weathercode: string, type: string) => {
        const weathername = weatherCode[weathercode].toLowerCase().split(' ')[1] || 'sunny';
        let iconName: any = 'sunny-outline'

        if (weathername == 'clear' || weathername == 'sunny') {
            iconName = type == 'day' ? 'sunny-outline' : 'night-clear'
        } else if (weathername.includes('rain')) {
            iconName = type == 'day' ? 'rainy-outline' : 'night-alt-rain'
        } else if (weathername == 'cloudy') {
            iconName = type == 'day' ? 'partly-sunny-outline' : 'night-alt-cloudy'
        } else if (weathername == 'thunder') {
            iconName = type == 'day' ? 'thunderstorm-outline' : 'night-alt-lighting'
        }

        return iconName
    }

    const cdata = {
        labels: data?.hourly?.map(() => ' '),
        datasets: [
            {
                data: data?.hourly?.map((hour: any) => hour?.values?.temperature || 0),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };
    const hourBlockWidth = 100;
    const chartWidth = (data?.hourly?.length || 0) * hourBlockWidth;


    return (
        <Card style={styles.card}>
            <Text style={styles.header}>Hourly Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'column' }}>
                    {/* Hourly Blocks */}
                    <View style={{ flexDirection: 'row' }}>
                        {data?.hourly?.map((hour: any, index: number) => (
                            <View key={index} style={[styles.hourBlock, { width: hourBlockWidth }]}>
                                <Text style={styles.time}>{moment.utc(hour.time).format('LT')}</Text>
                                {
                                    (moment.utc(hour.time).hour() >= 19 || moment.utc(hour.time).hour() < 6)
                                        ? <Fontisto name={icon(hour?.values?.weatherCode, 'night')} size={24} color="white" style={styles.icon} />
                                        : <Ionicons name={icon(hour?.values?.weatherCode, 'day')} size={36} color='white' style={styles.icon} />
                                }
                                <Text style={styles.temp}>{hour?.values?.temperature}°C</Text>
                            </View>
                        ))}
                    </View>

                    {/* Line Chart */}
                    <LineChart
                        data={cdata}
                        width={chartWidth}
                        height={220}
                        yAxisSuffix="°C"
                        chartConfig={{
                            backgroundColor: '#393E46',
                            backgroundGradientFrom: '#393E46',
                            backgroundGradientTo: '#393E46',
                            decimalPlaces: 1,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}

                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
            </ScrollView>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        padding: 10,
        borderRadius: 12,
        height: 600,
        backgroundColor: '#393E46',
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 10,
        color: "white",
    },
    scrollContainer: {
        flexDirection: "row",
    },
    hourBlock: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 100,
    },
    time: {
        fontSize: 14,
        marginBottom: 4,
        color: "white",
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 4,
    },
    temp: {
        fontSize: 16,
        fontWeight: "500",
        color: "white",
    },
});

export default HourlyWeatherCard;
