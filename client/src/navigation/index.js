import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { ShoppingCartScreen } from '../screens/ShoppingCartScreen';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import CartIcon from '../assets/icons/cart.svg';
import { useSelector } from 'react-redux';
import { selectedNumberOfItems } from '../store/cartSlice';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const numberOfItems = useSelector(selectedNumberOfItems);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser ? authenticatedUser : null);
      setIsLoading(false);
    });
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
          <Stack.Screen
            name="Products"
            component={ProductsScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <Pressable
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('ShoppingCart')}
                  title="Cart"
                  color="gray">
                  <CartIcon width={18} height={18} />
                  <Text style={{ marginLeft: 5, fontWeight: '500' }}>
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
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Navigator
export { AuthenticatedUserProvider, AuthenticatedUserContext };