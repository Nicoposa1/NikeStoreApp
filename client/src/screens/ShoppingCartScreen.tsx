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
import { useSelector } from 'react-redux';
import {
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from '../store/cartSlice';
import { useCreateOrderMutation } from '../store/apiSlice';

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

  const onCreateOrder = () => {
    createOrder({
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
  }

  return (
    <>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={<ShoppingCartTotals />}
      />
      <TouchableOpacity style={styles.button} onPress={onCreateOrder}>
        <Text style={styles.buttonText}>Checkout</Text>
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
