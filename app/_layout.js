import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

export default function RootLayout() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    if (loading) return null; // Could be splash screen

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="(tabs)" />
            ) : (
                <Stack.Screen name="login" />
            )}
        </Stack>
    );
}
