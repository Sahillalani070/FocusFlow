import { StyleSheet, Text, View } from 'react-native';

export default function FocusScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Focus Mode 🎯</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    text: {
        color: '#fff',
        fontSize: 24,
    },
});
