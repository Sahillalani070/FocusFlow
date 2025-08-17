import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase/firebase';

export default function AccountScreen() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1DB954" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>

            <Text style={styles.label}>User ID:</Text>
            <Text style={styles.value}>{user.uid}</Text>

            <View style={{ marginTop: 30 }}>
                <Button title="Log Out" onPress={handleLogout} color="#1DB954" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        color: '#888',
        fontSize: 16,
        marginTop: 20,
    },
    value: {
        color: '#fff',
        fontSize: 18,
        marginTop: 5,
    },
});
