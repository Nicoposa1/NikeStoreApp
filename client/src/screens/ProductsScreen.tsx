import {FlatList, Image, StyleSheet, Pressable, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {productsSlice} from '../store/productsSlice';

export const ProductsScreen = () => {
  const navigation = useNavigation();
  const products = useSelector((state: any) => state.products.products);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            dispatch(productsSlice.actions.setSelectedProduct(item.id));
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
