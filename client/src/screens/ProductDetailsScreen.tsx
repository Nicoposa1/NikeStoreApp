import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useGetProductQuery } from '../store/apiSlice';

export const ProductDetailsScreen = ({ route }: { route: any }) => {
  const id = route.params.id


  const { data, isLoading, error } = useGetProductQuery(id);

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const addToCartFunction = () => {
    dispatch(addToCart({ product }));
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#000" />
  }

  if (error) {
    return <Text>Error: error fetching data {error.error}</Text>
  }

  
  const product = data.data
  
  if (!product) {
    return null
  }

  return (
    <View>
      <ScrollView style={{ paddingBottom: 400 }}>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          keyExtractor={item => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{ padding: 20 }}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={addToCartFunction}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    marginVertical: 18,
    color: '#4c4c4c',
  },
  price: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
    color: '#4c4c4c',
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
    marginBottom: 100,
    color: '#4c4c4c',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    backgroundColor: 'black',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});
