import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const TACO_MEALS_URL =
  'https://api.freeapi.app/api/v1/public/meals?page=1&limit=20&query=taco';
const AVOCADO_MEALS_URL =
  'https://api.freeapi.app/api/v1/public/meals?page=1&limit=10&query=avocado';

type ApiMeal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
};

type MealsResponse = {
  data: {
    data: ApiMeal[];
  } | null;
  message: string;
  success: boolean;
};

type MenuItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

const tabs = ['Popular Items', 'Taco Kits', 'Quesadillas', 'Sides'];

const fallbackImages = {
  tacos: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
  quesadilla:
    'https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg',
  guac: 'https://www.themealdb.com/images/media/meals/1549542994.jpg',
};

const baseMenuItems: MenuItem[] = [
  {
    id: 'al-pastor',
    title: 'Al Pastor Tacos (3)',
    description:
      'Marinated pork, pineapple, onion, cilantro, and handmade corn tortillas.',
    price: 12.5,
    imageUrl: fallbackImages.tacos,
    category: 'Popular Items',
  },
  {
    id: 'birria-quesadilla',
    title: 'Birria Quesadilla',
    description:
      'Slow-cooked beef birria with Oaxaca cheese and dipping consomme.',
    price: 14.95,
    imageUrl: fallbackImages.quesadilla,
    category: 'Quesadillas',
  },
  {
    id: 'tableside-guac',
    title: 'Tableside Guac',
    description: 'Fresh avocado, serrano peppers, cilantro, and warm chips.',
    price: 9,
    imageUrl: fallbackImages.guac,
    category: 'Sides',
  },
  {
    id: 'family-taco-kit',
    title: 'Family Taco Kit',
    description:
      'Build-your-own taco spread with tortillas, salsa, protein, and toppings.',
    price: 24.5,
    imageUrl: fallbackImages.quesadilla,
    category: 'Taco Kits',
  },
];

const getIngredientDescription = (meal?: ApiMeal) => {
  if (!meal) {
    return '';
  }

  return [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
    meal.strIngredient5,
  ]
    .filter(Boolean)
    .slice(0, 4)
    .join(', ');
};

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const RestaurantsScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(baseMenuItems);
  const [activeTab, setActiveTab] = useState<string>('Popular Items');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    'al-pastor': 1,
    'birria-quesadilla': 1,
  });

  useEffect(() => {
    const loadRestaurantMenu = async () => {
      try {
        const [tacosResponse, avocadoResponse] = await Promise.all([
          fetch(TACO_MEALS_URL),
          fetch(AVOCADO_MEALS_URL),
        ]);

        const tacosResult = (await tacosResponse.json()) as MealsResponse;
        const avocadoResult = (await avocadoResponse.json()) as MealsResponse;

        const tacos = tacosResult.data?.data ?? [];
        const avocadoMeals = avocadoResult.data?.data ?? [];

        const enrichedMenu = baseMenuItems.map((item, index) => {
          const sourceMeal =
            item.id === 'tableside-guac'
              ? avocadoMeals[0]
              : tacos[index % Math.max(tacos.length, 1)];

          if (!sourceMeal) {
            return item;
          }

          return {
            ...item,
            imageUrl: sourceMeal.strMealThumb || item.imageUrl,
            description:
              item.description || getIngredientDescription(sourceMeal),
          };
        });

        setMenuItems(enrichedMenu);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurantMenu();
  }, []);

  const visibleItems = useMemo(() => {
    if (activeTab === 'Popular Items') {
      return menuItems.slice(0, 3);
    }

    return menuItems.filter((item) => item.category === activeTab);
  }, [activeTab, menuItems]);

  const cartCount = useMemo(
    () => Object.values(cartQuantities).reduce((total, qty) => total + qty, 0),
    [cartQuantities]
  );

  const subtotal = useMemo(
    () =>
      menuItems.reduce(
        (total, item) => total + item.price * (cartQuantities[item.id] ?? 0),
        0
      ),
    [cartQuantities, menuItems]
  );

  const addToCart = (itemId: string) => {
    setCartQuantities((current) => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
  };

  const renderHeader = () => (
    <View>
      <ImageBackground
        source={{ uri: menuItems[0]?.imageUrl ?? fallbackImages.tacos }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <View style={styles.badgeRow}>
            <View style={styles.topRatedBadge}>
              <Text style={styles.topRatedText}>TOP RATED</Text>
            </View>
            <View style={styles.reviewBadge}>
              <FontAwesome name="star" size={14} color="#fff" />
              <Text style={styles.reviewText}>4.8 (1.2k reviews)</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Taco Theory</Text>
          <Text style={styles.heroMeta}>
            Authentic Mexican - 20-30 min - Free Delivery
          </Text>
        </View>
      </ImageBackground>

      <FlatList
        horizontal
        data={tabs}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
        renderItem={({ item }) => {
          const isActive = activeTab === item;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab(item)}
              style={[styles.tab, isActive && styles.activeTab]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{activeTab}</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.viewAllText}>View all -&gt;</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color="#C22C00" />
        </View>
      ) : null}
    </View>
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuCard}>
      <View style={styles.menuImageWrapper}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.menuImage}
          resizeMode="cover"
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.favoriteButton}>
          <FontAwesome name="heart-o" size={22} color="#C22C00" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuBody}>
        <View style={styles.menuTitleRow}>
          <Text numberOfLines={2} style={styles.menuTitle}>
            {item.title}
          </Text>
          <Text style={styles.menuPrice}>{formatPrice(item.price)}</Text>
        </View>

        <Text numberOfLines={3} style={styles.menuDescription}>
          {item.description}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => addToCart(item.id)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={styles.headerIconButton}
        >
          <Feather name="arrow-left" size={25} color="#C22C00" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Taco Theory</Text>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartIconButton}
        >
          <Ionicons name="cart-outline" size={28} color="#C22C00" />
          {cartCount ? (
            <View style={styles.cartBubble}>
              <Text style={styles.cartBubbleText}>{cartCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No menu items in this section yet.
          </Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          cartCount ? styles.listWithCart : null,
        ]}
      />

      {cartCount ? (
        <View style={styles.cartBar}>
          <View style={styles.cartCountBox}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Cart')}
            style={styles.viewCartButton}
          >
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>

          <View style={styles.subtotalBlock}>
            <Text style={styles.subtotalLabel}>SUBTOTAL</Text>
            <Text style={styles.subtotalText}>{formatPrice(subtotal)}</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default RestaurantsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    backgroundColor: '#E9DED6',
  },

  headerIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: '#C22C00',
    fontSize: 24,
    fontWeight: '900',
  },

  cartIconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartBubble: {
    position: 'absolute',
    top: 2,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#C22C00',
  },

  cartBubbleText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },

  listContent: {
    paddingBottom: 30,
  },

  listWithCart: {
    paddingBottom: 132,
  },

  hero: {
    height: 268,
    justifyContent: 'flex-end',
  },

  heroImage: {
    backgroundColor: '#5B3A2C',
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.36)',
  },

  heroContent: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },

  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  topRatedBadge: {
    minHeight: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#C22C00',
  },

  topRatedText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },

  reviewBadge: {
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 15,
    marginLeft: 8,
    paddingHorizontal: 13,
    backgroundColor: 'rgba(45,37,33,0.66)',
  },

  reviewText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  heroTitle: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '900',
  },

  heroMeta: {
    maxWidth: 330,
    marginTop: 6,
    color: '#fff',
    fontSize: 19,
    lineHeight: 29,
    fontWeight: '500',
  },

  tabs: {
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
  },

  tab: {
    minHeight: 45,
    minWidth: 132,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    paddingHorizontal: 20,
    backgroundColor: '#E5E1DE',
  },

  activeTab: {
    backgroundColor: '#C22C00',
  },

  tabText: {
    color: '#666260',
    fontSize: 18,
    fontWeight: '700',
  },

  activeTabText: {
    color: '#fff',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },

  sectionTitle: {
    color: '#202124',
    fontSize: 28,
    fontWeight: '900',
  },

  viewAllText: {
    color: '#C22C00',
    fontSize: 17,
    fontWeight: '700',
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    marginTop: -12,
    marginBottom: 18,
  },

  menuCard: {
    overflow: 'hidden',
    marginHorizontal: 24,
    marginBottom: 30,
    borderRadius: 11,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 5,
  },

  menuImageWrapper: {
    height: 218,
    backgroundColor: '#E4DED8',
  },

  menuImage: {
    width: '100%',
    height: '100%',
  },

  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  menuBody: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
  },

  menuTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 14,
  },

  menuTitle: {
    flex: 1,
    color: '#202124',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
  },

  menuPrice: {
    color: '#C22C00',
    fontSize: 17,
    lineHeight: 27,
    fontWeight: '700',
  },

  menuDescription: {
    marginTop: 6,
    color: '#5F4740',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
  },

  addButton: {
    alignSelf: 'flex-end',
    minHeight: 47,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    marginTop: 26,
    paddingHorizontal: 18,
    backgroundColor: '#FF5733',
  },

  addButtonText: {
    color: '#401307',
    fontSize: 17,
    fontWeight: '800',
  },

  emptyText: {
    marginHorizontal: 24,
    color: '#6F625C',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  cartBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: Platform.OS === 'ios' ? 32 : 20,
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 26,
    backgroundColor: '#C22C00',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 9,
  },

  cartCountBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  cartCountText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },

  viewCartButton: {
    flex: 1,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  viewCartText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '900',
  },

  subtotalBlock: {
    alignItems: 'flex-start',
  },

  subtotalLabel: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 11,
    fontWeight: '800',
  },

  subtotalText: {
    marginTop: 2,
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
  },
});
