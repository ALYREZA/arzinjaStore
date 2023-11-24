import {StyleSheet, ScrollView, Text} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {BasketContext} from '../context/BasketContext';
import ListItem from '../components/ListItem';
import {SafeAreaView} from 'react-native-safe-area-context';

function BasketScreen() {
  const {items, manualUpdate} = useContext(BasketContext);
  const [newItems, setItem] = useState([...items]);
  useEffect(() => {
    if (items.size > 0) {
      const intervalId = setInterval(() => {
        setItem([...manualUpdate()]);
      }, 5000); // 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [items]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {newItems?.map(([name, props]) => (
          <ListItem key={name} name={name} iconName="check">
            <Text style={styles.txt}>{props.status}</Text>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    paddingHorizontal: 12,
  },
  scrollView: {},
});
export default BasketScreen;
