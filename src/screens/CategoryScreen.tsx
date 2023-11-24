import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CategoryType, getCategories} from '../utils/categories';
import {SafeAreaView} from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';

function CategoryScreen({navigation}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType>([]);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((cat: CategoryType) => {
        setCategories(cat);
      })
      .finally(() => setLoading(false));
  }, []);

  const goToProduct = (name: string) => {
    navigation.navigate('Product', {name});
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        ListEmptyComponent={() => (
          <View style={styles.fill}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
        renderItem={({item}) => (
          <ListItem
            key={item.name}
            name={item.name}
            onPress={goToProduct}
            iconName="basket"
          />
        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryScreen;
