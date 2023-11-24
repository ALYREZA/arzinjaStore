import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {ReactNode} from 'react';

type ListItemType = {
  name: string;
  iconName: string;
  onPress?: (name: string) => void;
  children?: ReactNode;
};

function ListItem({name, iconName, onPress, children}: ListItemType) {
  const onPressMe = () => {
    if (onPress) {
      onPress(name);
    }
  };
  return (
    <View style={styles.listItem} key={name}>
      <Pressable onPress={onPressMe} style={styles.itemContainer}>
        <Icon name={iconName} color="#c9c5c5" size={23} />
        <Text style={styles.textItem}>{name}</Text>
      </Pressable>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  textItem: {
    fontSize: 22,
    paddingHorizontal: 12,
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    backgroundColor: 'white',
    minHeight: 65,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default ListItem;
