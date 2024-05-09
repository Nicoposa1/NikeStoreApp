import { FlatList, Image, StyleSheet, Pressable, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { productsSlice } from '../store/productsSlice';
import { useGetProductsQuery } from '../store/apiSlice';

type ProductDetailsParams = {
  name: string;
  id: string; // Assuming item._id is of type string
};



export const ProductsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetProductsQuery(undefined);


  if (isLoading) {
    return <ActivityIndicator size="large" color="#000" />
  }

  if (error) {
    return <Text>Error: error fetching data</Text>
  }


  const products = data.data

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            navigation.navigate('ProductDetails', { id: item._id });
          }}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </Pressable>
      )}
      keyExtractor={item => item._id}
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
