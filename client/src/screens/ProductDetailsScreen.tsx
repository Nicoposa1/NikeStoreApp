import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import products from '../data/products';

export const ProductDetailsScreen = () => {
  const product = products[0];
  const {width} = useWindowDimensions();

  const addToCart = () => {
    console.log('Add to cart');
  }

  return (
    <View>
      <ScrollView  style={{paddingBottom: 400}}>
        <FlatList
          data={product.images}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={{width, aspectRatio: 1}} />
          )}
          keyExtractor={item => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={{padding: 20}}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <Pressable style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
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
  },
  price: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: '300',
    marginBottom: 100,
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
