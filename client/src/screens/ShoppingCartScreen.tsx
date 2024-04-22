import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import cart from '../data/cart';
import {CartListItem} from '../components/CartListItem';

export const ShoppingCartScreen = () => {
  return (
    <View>
      <FlatList
        data={cart}
        renderItem={({item}) => <CartListItem cartItem={item} />}
        keyExtractor={item => item.product.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
