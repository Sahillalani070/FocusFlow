import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { auth } from "./firebase/firebase";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace("./(tabs)/focus")
        }
        catch (err) {
            setError(err.message);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Login</Text>
            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChange={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={() => router.push("/register")} />
        </View>
    );
}
