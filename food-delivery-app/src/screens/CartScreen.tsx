import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

type CartItem = {
  id: string;
  name: string;
  options: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

const initialCartItems: CartItem[] = [
  {
    id: 'truffle-burger',
    name: 'Signature Truffle Burger',
    options: 'Extra Truffle Mayo, No Onions',
    price: 18.5,
    quantity: 1,
    imageUrl: 'https://cdn.dummyjson.com/product-images/74/1.jpg',
  },
  {
    id: 'avocado-toast',
    name: 'Artisan Avocado Toast',
    options: 'Poached Egg, Red Pepper Flakes',
    price: 14,
    quantity: 2,
    imageUrl: 'https://www.themealdb.com/images/media/meals/1549542994.jpg',
  },
];

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.0892;
const PROMO_DISCOUNT = 5;

const formatMoney = (amount: number) => `$${amount.toFixed(2)}`;

const CartScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const taxesAndFees = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const discount = isPromoApplied && subtotal > 0 ? PROMO_DISCOUNT : 0;
  const total =
    subtotal > 0 ? subtotal + DELIVERY_FEE + taxesAndFees - discount : 0;

  const updateQuantity = (itemId: string, direction: 'increase' | 'decrease') => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.id !== itemId) {
            return item;
          }

          const nextQuantity =
            direction === 'increase' ? item.quantity + 1 : item.quantity - 1;

          return {
            ...item,
            quantity: Math.max(nextQuantity, 0),
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const handlePromoPress = () => {
    setIsPromoApplied((current) => !current);
  };

  const handlePlaceOrder = () => {
    if (!cartItems.length) {
      Alert.alert('Your cart is empty', 'Add an item before placing an order.');
      return;
    }

    Alert.alert('Order placed', 'Your Crave order is on the way.');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Feather name="arrow-left" size={30} color="#B42A04" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Crave</Text>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Restaurants')}
          style={styles.iconButton}
        >
          <Ionicons name="cart-outline" size={35} color="#B42A04" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>
          Review your selected items and checkout
        </Text>

        <View style={styles.itemsList}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartCard}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.itemImage}
                resizeMode="cover"
              />

              <View style={styles.itemContent}>
                <View style={styles.itemTopRow}>
                  <Text numberOfLines={2} style={styles.itemName}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Feather name="x" size={34} color="#5A3C34" />
                  </TouchableOpacity>
                </View>

                <Text numberOfLines={2} style={styles.itemOptions}>
                  {item.options}
                </Text>

                <View style={styles.itemBottomRow}>
                  <Text style={styles.itemPrice}>{formatMoney(item.price)}</Text>

                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => updateQuantity(item.id, 'decrease')}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantitySymbol}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => updateQuantity(item.id, 'increase')}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantitySymbol}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {!cartItems.length ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handlePromoPress}
          style={[styles.promoBox, isPromoApplied && styles.activePromoBox]}
        >
          <View style={styles.promoLeft}>
            <Feather name="tag" size={30} color="#B42A04" />
            <Text style={styles.promoText}>
              {isPromoApplied ? 'Promo Code Applied' : 'Apply Promo Code'}
            </Text>
          </View>
          <Text style={styles.addCodeText}>
            {isPromoApplied ? 'Remove' : 'Add Code'}
          </Text>
        </TouchableOpacity>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatMoney(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.deliveryValue}>
              {subtotal > 0 ? formatMoney(DELIVERY_FEE) : '$0.00'}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxes & Fees</Text>
            <Text style={styles.summaryValue}>{formatMoney(taxesAndFees)}</Text>
          </View>
          {discount ? (
            <View style={styles.summaryRow}>
              <Text style={styles.discountLabel}>Promo Discount</Text>
              <Text style={styles.discountValue}>-{formatMoney(discount)}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatMoney(total)}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={handlePlaceOrder}
          style={[styles.orderButton, !cartItems.length && styles.disabledButton]}
        >
          <Text style={styles.orderButtonText}>Place Order</Text>
          <Feather name="arrow-right" size={34} color="#5C1B0A" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },

  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    color: '#B42A04',
    fontSize: 32,
    fontWeight: '900',
    paddingLeft: 20,
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 30,
  },

  title: {
    color: '#1D2024',
    fontSize: 38,
    lineHeight: 46,
    fontWeight: '900',
  },

  subtitle: {
    marginTop: 10,
    color: '#646464',
    fontSize: 19,
    lineHeight: 27,
    fontWeight: '500',
  },

  itemsList: {
    gap: 24,
    marginTop: 46,
  },

  cartCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F1DED7',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 22,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 4,
  },

  itemImage: {
    width: 96,
    height: 96,
    borderRadius: 11,
    marginTop: 18,
    backgroundColor: '#E9E0DB',
  },

  itemContent: {
    flex: 1,
    marginLeft: 16,
  },

  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  itemName: {
    flex: 1,
    color: '#202329',
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '900',
    paddingRight: 8,
  },

  removeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemOptions: {
    marginTop: 4,
    color: '#666',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '500',
  },

  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 18,
  },

  itemPrice: {
    color: '#B42A04',
    fontSize: 20,
    fontWeight: '500',
  },

  quantityControl: {
    width: 132,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 32,
    paddingHorizontal: 10,
    backgroundColor: '#E2DFDD',
  },

  quantityButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantitySymbol: {
    color: '#6E6A68',
    fontSize: 20,
    fontWeight: '700',
  },

  quantityText: {
    color: '#666',
    fontSize: 22,
    fontWeight: '600',
  },

  emptyText: {
    marginTop: 36,
    color: '#666',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },

  promoBox: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    borderWidth: 1.4,
    borderStyle: 'dashed',
    borderColor: '#8C6A62',
    borderRadius: 18,
    marginTop: 46,
    paddingHorizontal: 18,
    backgroundColor: '#F7F7F7',
  },

  activePromoBox: {
    backgroundColor: '#FFF1EC',
    borderColor: '#B42A04',
  },

  promoLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  promoText: {
    flex: 1,
    color: '#5A3C34',
    fontSize: 20,
    fontWeight: '500',
  },

  addCodeText: {
    color: '#B42A04',
    fontSize: 20,
    fontWeight: '500',
  },

  summary: {
    marginTop: 42,
    gap: 19,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  summaryLabel: {
    color: '#666',
    fontSize: 21,
    fontWeight: '500',
  },

  summaryValue: {
    color: '#666',
    fontSize: 21,
    fontWeight: '500',
  },

  deliveryValue: {
    color: '#6E3A2F',
    fontSize: 21,
    fontWeight: '500',
  },

  discountLabel: {
    color: '#067647',
    fontSize: 19,
    fontWeight: '700',
  },

  discountValue: {
    color: '#067647',
    fontSize: 19,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    marginTop: 24,
    backgroundColor: '#DABEB5',
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
  },

  totalLabel: {
    color: '#1F2024',
    fontSize: 23,
    fontWeight: '500',
  },

  totalValue: {
    color: '#B42A04',
    fontSize: 36,
    fontWeight: '500',
  },

  orderButton: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    borderRadius: 18,
    marginTop: 28,
    marginBottom: Platform.OS === 'ios' ? 0 : 14,
    backgroundColor: '#FF5733',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 6,
  },

  disabledButton: {
    opacity: 0.55,
  },

  orderButtonText: {
    color: '#5C1B0A',
    fontSize: 21,
    fontWeight: '500',
  },
});
