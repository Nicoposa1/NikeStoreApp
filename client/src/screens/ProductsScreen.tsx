import { FlatList, Image, StyleSheet, Pressable, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useGetProductsQuery } from '../store/apiSlice';


export const ProductsScreen = () => {
  const navigation = useNavigation();

  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log("🚀 ~ ProductsScreen ~ error:", error)

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getProducts();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#000" />
  }

  if (error) {
    return <Text>Error: error fetching data P</Text>
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
