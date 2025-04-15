import { Card, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import moment from 'moment'
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { weatherCode } from '@/constants/Weathercodes.json'
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useState } from "react";


const chartConfig = {
    backgroundColor: '#393E46',
    backgroundGradientFrom: '#393E46',
    backgroundGradientTo: '#393E46',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    propsForBackgroundLines: {
        stroke: 'transparent',
    },

    propsForVerticalLabels: {
        fontSize: 12, // Style X-axis labels
        fill: 'white',
        fontWeight: 'bold',
        textAnchor: 'middle',
        dx: 10, // adjust horizontal shift if needed
        dy: 0, // vertical shift if needed
    },

    propsForHorizontalLabels: {
        fontSize: 12, // Style X-axis labels
        fill: 'white',
        fontWeight: 'bold',
        textAnchor: 'middle',
        dx: 0, // adjust horizontal shift if needed
        dy: 15, // vertical shift if needed
    },
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
    const [hourlyInfo, setHourlyInfo] = useState<any[]>([])
    const [chartData, setChartData] = useState<any>({
        labels: [],
        datasets: []
    })


    useEffect(() => {
        const subarrray = data?.hourly?.slice(0, 24)
        setHourlyInfo(subarrray || [])

        const cdata = {
            labels: subarrray.map((hour: any) =>
                moment.utc(hour.time).local().format('ha') // 1am, 2am, etc.
            ),
            datasets: [
                {
                    data: subarrray?.map((hour: any) => hour?.values?.temperature || 0),
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    strokeWidth: 2
                }
            ],
        };

        setChartData(cdata)
    }, [])

    const hourBlockWidth = 100;
    const chartWidth = 24 * hourBlockWidth;
    const chartHeight = 200


    return (
        <Card style={styles.card}>
            <Text style={styles.header}>Hourly Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'column' }}>
                    {/* Hourly Blocks */}
                    {/* <View style={{ flexDirection: 'row' }}>
                        {hourlyInfo?.map((hour: any, index: number) => (
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
                    </View> */}

                    {/* Line Chart */}
                    {chartData.datasets.length > 0 &&
                        <View style={{ position: 'relative', width: chartWidth, marginTop: 30 }}>
                            <LineChart
                                data={chartData}
                                width={chartWidth}
                                height={chartHeight}
                                chartConfig={chartConfig}
                                withVerticalLabels={true}
                                withHorizontalLabels={true}
                                withInnerLines={false}
                                fromZero={true} // Helps scale from 0 if temps are low

                                withDots={true}
                                bezier
                                style={{
                                    borderRadius: 16,
                                    marginLeft: 25,
                                    paddingRight: 25,
                                }}
                            />

                            {/* Icons overlay */}
                            {chartData.datasets.length > 0 && chartData.datasets[0].data.map((temp: any, index: any) => {
                                const temps = hourlyInfo.map((hour: any) => hour.values.temperature);

                                const minTemp = Math.min(...temps);
                                const maxTemp = Math.max(...temps);
                                const x = 100 * index + 40// getX(index, temps) - index;
                                // const x = iconPositionX(index, chartWidth, chartData.datasets[0].data.length);
                                const y = chartHeight - (temp - minTemp) / (maxTemp - minTemp) * chartHeight;

                                if (moment.utc(hourlyInfo[index]?.time).hour() >= 19 || moment.utc(hourlyInfo[index].time).hour() < 6) {
                                    const iconName = icon(hourlyInfo[index]?.values.weatherCode, 'night'); // your existing logic
                                    return (
                                        <>
                                            <Fontisto
                                                key={index + 'fontiso'}
                                                name={iconName}
                                                size={24} color="white" style={{
                                                    width: 50,
                                                    height: 50,
                                                    position: 'absolute',
                                                    left: x,//+ 40,
                                                    top: y - 10,
                                                }}
                                            />
                                            <Text style={{
                                                color: 'white',
                                                position: 'absolute',
                                                left: x,//+ 40,
                                                top: y - 30,
                                            }} >{hourlyInfo[index]?.values?.temperature}°C</Text>
                                        </>
                                    );
                                } else {


                                    const iconName = icon(hourlyInfo[index]?.values.weatherCode, 'day'); // your existing logic
                                    return (
                                        <>
                                            <Ionicons
                                                key={index + 'iconi'}
                                                name={iconName}
                                                size={24} color="white" style={{
                                                    width: 50,
                                                    height: 50,
                                                    position: 'absolute',
                                                    left: x,//+ 40,
                                                    top: y - 10,
                                                }}
                                            />
                                            <Text style={{
                                                color: 'white',
                                                position: 'absolute',
                                                left: x,//+ 40,
                                                top: y - 30,
                                            }} >{hourlyInfo[index]?.values?.temperature}°C</Text>
                                        </>
                                    );
                                }
                            })}
                        </View>
                    }

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
