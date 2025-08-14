import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function FocusScreen() {

  const FOCUS_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;

  //const router = useRouter();
  const [isFocus, setIsFocus] = useState(true)
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION); // e.g. 10 seconds for testing
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);



  useEffect(() => {
    if (timeLeft <= 0) {
      if (isRunning) setIsRunning(false);

      if (isFocus) {
        setIsFocus(false);
        setTimeLeft(BREAK_DURATION);
      } else {
        setIsFocus(true);
        setTimeLeft(FOCUS_DURATION);
      }
    }
  }, [timeLeft, isFocus, isRunning]);

  const formattedTime = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`;

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isFocus ? FOCUS_DURATION : BREAK_DURATION);
  };

  return (
    <View style= { styles.container } >
    <Text style={ styles.text }>
      { isFocus? 'Focus Timer': 'Break Timer' }: { formattedTime }
  </Text>

    < View style = { styles.buttonRow } >
      <Button
          title={ isRunning ? 'Pause' : 'Start' }
  onPress = {() => setIsRunning(running => !running)
}
        />
  < Button title = "Reset" onPress = { resetTimer } />
    <Button
          title={ isFocus ? 'Skip to Break' : 'Skip to Focus' }
onPress = {() => {
  setIsRunning(false);
  if (isFocus) {
    setIsFocus(false);
    setTimeLeft(BREAK_DURATION);
  } else {
    setIsFocus(true);
    setTimeLeft(FOCUS_DURATION);
  }
}}
        />
  </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212',
  },
  text: {
    fontSize: 36, color: '#fff', marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'space-around', width: '80%',
  },
});