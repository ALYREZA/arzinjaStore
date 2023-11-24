import {View, FlatList, Pressable, Text, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import ListItem from '../components/ListItem';

function ProductScreen({route, navigation}) {
  const {name} = route.params;
  const products = useMemo(() => {
    const product_arr = new Array(100).fill({name: ''}).map((item, index) => ({
      name: `${name} #${index + 1}`,
    }));
    return product_arr;
  }, [name]);

  const onBuyClicked = (product: string) => {
    navigation.navigate('Map', {name: product, category: name});
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        renderItem={({item}) => (
          <ListItem name={item.name} iconName={'bow-tie'}>
            <Pressable onPress={() => onBuyClicked(item.name)}>
              <Text style={styles.btn}>Buy</Text>
            </Pressable>
          </ListItem>
        )}
        data={products}
        keyExtractor={item => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 5,
    backgroundColor: 'yellow',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 8,
  },
});
export default ProductScreen;
