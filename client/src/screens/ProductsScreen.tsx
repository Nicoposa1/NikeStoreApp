import {FlatList, Image, StyleSheet, Pressable, View} from 'react-native';
import React from 'react';
import products from '../data/products';
import {useNavigation} from '@react-navigation/native';

export const ProductsScreen = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            navigation.navigate('ProductDetails' as never);
          }}>
          <Image source={{uri: item.image}} style={styles.image} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '50%',
    padding: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
