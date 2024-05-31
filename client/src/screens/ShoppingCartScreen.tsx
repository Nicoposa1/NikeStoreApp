import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import cart from '../data/cart';
import { CartListItem } from '../components/CartListItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from '../store/cartSlice';
import { useCreateOrderMutation } from '../store/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ShoppingCartTotals = () => {
  const cartItems = useSelector((state: any) => state.cart);
  const subtotal = useSelector(selectSubtotal);
  const deliveryFree = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFree} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

export const ShoppingCartScreen = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const subtotal = useSelector(selectSubtotal);
  const deliveryFree = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const onCreateOrder = async () => {
    console.log('Creating order...');
    const result = await createOrder({
      items: cartItems,
      subtotal,
      deliveryFree,
      total,
      customer: {
        name: 'John Doe',
        address: '123 Main St',
        email: 'nico@gmail.com',
      },
    });
    if (result.data?.status === 'OK') {
      Alert.alert('Order created successfully',
        `Your order reference is ${result.data.data.ref}`
      );
      dispatch(clearCart());
    } else {
      Alert.alert('Error creating order', 'Please try again later');
    }
  }
  const navigation = useNavigation();
  const signOut = async () => {

    try {
      // Borrar el token de autenticación de AsyncStorage
      await AsyncStorage.removeItem('@storage_Key');
      // Limpiar cualquier otra información de usuario almacenada
      // ...
      // Navegar de vuelta a la pantalla de inicio de sesión
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  // En tu componente, puedes llamar a esta función pasando la referencia de navegación como un argumento:
  const handleSignOut = () => {
    const navigation = useNavigation();
    signOut(navigation);
  };

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={<ShoppingCartTotals />}
      />
      <TouchableOpacity style={styles.button} onPress={signOut}>
        {
          isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Checkout</Text>
        }
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },

  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
