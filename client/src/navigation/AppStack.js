import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProductsScreen } from "../screens/ProductsScreen";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import CartIcon from '../assets/icons/cart.svg';
import { ShoppingCartScreen } from "../screens/ShoppingCartScreen";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { selectedNumberOfItems } from "../store/cartSlice";

const Stack = createStackNavigator();
const numberOfItems = useSelector(selectedNumberOfItems);
const AppStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
    <Stack.Screen
      name="Products"
      component={ProductsScreen}
      options={({navigation}) => ({
        headerRight: () => (
          <Pressable
            style={{
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('ShoppingCart')}
            title="Cart"
            color="gray">
            <CartIcon width={18} height={18} />
            <Text style={{marginLeft: 5, fontWeight: '500'}}>
              {numberOfItems}
            </Text>
          </Pressable>
        ),
      })}
    />
    <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{presentation: 'modal'}}
    />
  </Stack.Navigator>
  );
};
export default AppStack;
