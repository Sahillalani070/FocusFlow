import { useAuthRequest } from "expo-auth-session";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
WebBrowser.maybeCompleteAuthSession(); // again, ensures redirect handling

const clientId = Constants.expoConfig?.extra.SPOTIFY_CLIENT_ID;
const clientSecret = Constants.expoConfig?.extra.SPOTIFY_CLIENT_SECRET;
const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function SpotifyScreen() {
    const [token, setToken] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);

    const redirectUri = "exp://192.168.2.20:8081/"; // Must match your registered Spotify URI

    const [request, response, promptAsync] = useAuthRequest(
        {

            clientId: clientId,
            clientSecret: clientSecret,
            scopes: ["user-read-email", "user-read-private"],
            redirectUri,
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === "success") {
            const { access_token } = response.params;
            setToken(access_token);

            fetch("https://api.spotify.com/v1/me", {
                headers: { Authorization: `Bearer ${access_token}` },
            })
                .then((res) => res.json())
                .then((data) => setProfile(data))
                .catch(console.error);
        }
    }, [response]);

    return (
        <View style= {{ flex: 1, justifyContent: "center", alignItems: "center" }
}>
    <Button
        title="Login with Spotify"
disabled = {!request}
onPress = {() => promptAsync({ useProxy: true })}
      />
{
    profile && (
        <View style={ { marginTop: 20 } }>
            <Text>✅ Logged in as { profile.display_name } </Text>
                < Text > Email: { profile.email } </Text>
                    </View>
      )
}
</View>
  );
}
