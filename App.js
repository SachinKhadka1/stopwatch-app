import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

const padNumber = (num) => {
  if(num < 10) {
    return `0${num}`;
  }
  return num;
}

export default function App() {

  const [milliSeconds, setMilliSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [lapArr, setLapArr] = useState([]);
  const [intervalId, setIntervalId] = useState();
  const [isRunning, setIsRunning] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer} >
      <Text style={styles.displayContainer}>{padNumber(minutes)}:{padNumber(seconds)}:{padNumber(milliSeconds)}</Text>
      </View>
      {!isRunning && <Button title='Start' onPress={() => {
        setIsRunning(true);
        const intId = setInterval(() => {
          setMilliSeconds((prevMs) => {
            if(prevMs === 99) {
              setSeconds((prevSec) => {
                if(prevSec === 59) {
                  setMinutes((prevMin) => prevMin + 1);
                  return 0;
                }
                return prevSec + 1;
              });
              return 0;
            }
            return prevMs + 1;
          });
        }, 10);
        setIntervalId(intId);
      }} />}
      {isRunning && <Button title='Stop' onPress={() => {
        setIsRunning(false);
        clearInterval(intervalId);
        setIntervalId(undefined);
      }} />}
      <Button title='Reset'
      onPress={() => {
        setMinutes(0);
        setSeconds(0);
        setMilliSeconds(0);
      }}
      disabled={isRunning}
      />
      <Button title='Lap' onPress={() => {
        setLapArr((prevArr) => {
          prevArr.push(`${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(milliSeconds)}`)
          return prevArr;
        })
        console.log(lapArr)
      }} disabled={!isRunning} />
      <StatusBar style="auto" />
      <FlatList data={lapArr} renderItem={(itemData) => <Text>{itemData.item}</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayContainer : {
    fontSize: 50,
  }
});
