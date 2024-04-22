import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import products from '../data/products';

export const ProductsScreen = () => {
  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
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
