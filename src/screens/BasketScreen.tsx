import {StyleSheet, ScrollView, Text, ActivityIndicator} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {BasketContext} from '../context/BasketContext';
import ListItem from '../components/ListItem';
import {SafeAreaView} from 'react-native-safe-area-context';

function BasketScreen({navigation}) {
  const {items, manualUpdate} = useContext(BasketContext);
  const [loading, setLoading] = useState(false);
  const [newItems, setItem] = useState([...items]);
  useEffect(() => {
    if (items.size > 0) {
      const intervalId = setInterval(() => {
        setItem([...manualUpdate()]);
        setLoading(prev => !prev);
        navigation.setOptions({
          headerRight: () => (
            <ActivityIndicator
              style={styles.loading}
              animating={loading}
              size="small"
              color="blue"
            />
          ),
        });
      }, 5000); // 5 seconds

      return () => clearInterval(intervalId);
    }
  }, [items, loading]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
  loading: {
    marginHorizontal: 8,
  },
});
export default BasketScreen;
