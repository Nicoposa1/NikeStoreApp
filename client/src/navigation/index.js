import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProductDetailsScreen} from '../screens/ProductDetailsScreen';
import {ShoppingCartScreen} from '../screens/ShoppingCartScreen';
import {Pressable, Text} from 'react-native';
import CartIcon from '../assets/icons/cart.svg';

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle: {backgroundColor: 'white'}}}
      >
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
                <Text style={{marginLeft: 5, fontWeight: '500'}} >1</Text>
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
    </NavigationContainer>
  );
};
