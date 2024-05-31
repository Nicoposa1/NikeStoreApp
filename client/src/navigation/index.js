import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProductDetailsScreen} from '../screens/ProductDetailsScreen';
import {ShoppingCartScreen} from '../screens/ShoppingCartScreen';
import {Pressable, Text} from 'react-native';
import CartIcon from '../assets/icons/cart.svg';
import {useSelector} from 'react-redux';
import {selectedNumberOfItems} from '../store/cartSlice';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const numberOfItems = useSelector(selectedNumberOfItems);
  const {token} = useSelector((state: any) => state.auth);
  console.log("🚀 ~ Navigator ~ token:", token)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
        {token ? (
          <>
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
