import { Card, Text } from "react-native-paper"
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        overflow: 'hidden', // important for rounded corners on background image
        margin: 16,
        backgroundColor: "#E78B48",
        height: 400,
        padding: 10
    },
    background: {
        padding: 16,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
});

const WeatherInfoOfCity = (props: any) => {
    const { info } = props

    return <Card style={styles.card}>
        <Text style={styles.text}>{info?.name}</Text>
    </Card>
}

export default WeatherInfoOfCity