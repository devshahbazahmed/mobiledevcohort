import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MEALS_URL = 'https://api.freeapi.app/api/v1/public/meals?page=1&limit=12';

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strTags: string | null;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
};

type MealsResponse = {
  data: {
    data: Meal[];
  } | null;
  message: string;
  success: boolean;
};

const categories = ['All', 'Vegetarian', 'Dessert', 'Chicken', 'Seafood'];

const getMealRating = (idMeal: string) => {
  const seed = Number(idMeal.slice(-2)) || 8;
  return (4.2 + (seed % 8) / 10).toFixed(1);
};

const getDeliveryTime = (index: number) => {
  const start = 20 + (index % 4) * 5;
  return `${start}-${start + 10} min`;
};

const getPriceLevel = (index: number) => ['$', '$$', '$$$'][index % 3];

const getIngredients = (meal: Meal) =>
  [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
    meal.strIngredient5,
  ]
    .filter(Boolean)
    .slice(0, 3)
    .join(' • ');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function loadMeals(shouldRefresh = false) {
    try {
      if (shouldRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setErrorMessage('');

      const response = await fetch(MEALS_URL);
      const result = (await response.json()) as MealsResponse;

      if (!response.ok || !result.success || !result.data?.data?.length) {
        throw new Error(result.message || 'Unable to load meals.');
      }

      setAllMeals(result.data.data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to load meals.'
      );
      setAllMeals([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  const filteredMeals = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return allMeals.filter((meal) => {
      const matchesCategory =
        activeCategory === 'All' || meal.strCategory === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        meal.strMeal.toLowerCase().includes(normalizedSearch) ||
        meal.strArea.toLowerCase().includes(normalizedSearch) ||
        meal.strCategory.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, allMeals, search]);

  const renderHeader = () => (
    <View>
      <View style={styles.topbar}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          style={styles.logoBack}
          activeOpacity={0.75}
        >
          <Feather name="arrow-left" size={24} color="#D9480F" />
          <Text style={styles.logoText}>Crave</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.cartButton}
          activeOpacity={0.75}
        >
          <AntDesign name="shopping-cart" size={24} color="#D9480F" />
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <Ionicons name="search-outline" size={24} color="#8D6E66" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for restaurants or dishes..."
          placeholderTextColor="#737987"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const isActive = activeCategory === item;

          return (
            <TouchableOpacity
              activeOpacity={0.78}
              onPress={() => setActiveCategory(item)}
              style={[
                styles.categoryChip,
                isActive && styles.activeCategoryChip,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.activeCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Meals</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );

  const renderMealCard = ({ item, index }: { item: Meal; index: number }) => {
    const tags = item.strTags?.split(',').filter(Boolean).slice(0, 2) ?? [];

    return (
      <TouchableOpacity
        activeOpacity={0.88}
        style={styles.card}
        onPress={() => navigation.navigate('Restaurants')}
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.strMealThumb }}
            style={styles.mealImage}
            resizeMode="cover"
          />

          {index === 0 ? (
            <View style={styles.deliveryBadge}>
              <Text style={styles.deliveryText}>Free Delivery</Text>
            </View>
          ) : null}

          <View style={styles.heartButton}>
            <FontAwesome
              name={index === 0 ? 'heart' : 'heart-o'}
              size={26}
              color={index === 0 ? '#C23605' : '#9B736D'}
            />
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardTitleRow}>
            <Text numberOfLines={1} style={styles.mealName}>
              {item.strMeal}
            </Text>

            <View style={styles.ratingPill}>
              <FontAwesome name="star" size={15} color="#FFB000" />
              <Text style={styles.ratingText}>
                {getMealRating(item.idMeal)}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{item.strArea}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{getPriceLevel(index)}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Feather name="clock" size={17} color="#6F6F72" />
            <Text style={styles.metaText}>{getDeliveryTime(index)}</Text>
          </View>

          <Text numberOfLines={1} style={styles.ingredients}>
            {getIngredients(item) || item.strCategory}
          </Text>

          <View style={styles.tagRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{item.strCategory}</Text>
            </View>
            {tags.map((tag) => (
              <View key={tag} style={styles.lightBadge}>
                <Text style={styles.lightBadgeText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#D9480F" size="large" />
          </View>
        ) : (
          <FlatList
            data={filteredMeals}
            keyExtractor={(item) => item.idMeal}
            renderItem={renderMealCard}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No meals match your search.</Text>
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => loadMeals(true)}
                tintColor="#D9480F"
              />
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },

  keyboardAvoiding: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 34,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 46,
  },

  logoBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  logoText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#D9480F',
  },

  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#7C2D12',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 3,
  },

  search: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#EFE5DF',
    borderRadius: 18,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    shadowColor: '#7C2D12',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 14,
    color: '#1C1D20',
    fontSize: 17,
    fontWeight: '500',
  },

  categoryList: {
    gap: 12,
    paddingTop: 28,
    paddingBottom: 28,
  },

  categoryChip: {
    minHeight: 52,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: '#E7DDD8',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  activeCategoryChip: {
    backgroundColor: '#FF5A2C',
    borderColor: '#FF5A2C',
  },

  categoryText: {
    color: '#6D6764',
    fontSize: 17,
    fontWeight: '700',
  },

  activeCategoryText: {
    color: '#fff',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  sectionTitle: {
    flex: 1,
    color: '#111215',
    fontSize: 24,
    fontWeight: '900',
  },

  seeAllText: {
    color: '#D9480F',
    fontSize: 17,
    fontWeight: '900',
  },

  errorText: {
    marginBottom: 16,
    color: '#B42318',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },

  emptyText: {
    marginTop: 18,
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  card: {
    overflow: 'hidden',
    marginBottom: 26,
    borderRadius: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    elevation: 7,
  },

  imageWrapper: {
    height: 230,
    backgroundColor: '#F1E8E2',
  },

  mealImage: {
    width: '100%',
    height: '100%',
  },

  deliveryBadge: {
    position: 'absolute',
    left: 20,
    bottom: 18,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: '#fff',
  },

  deliveryText: {
    color: '#C23605',
    fontSize: 17,
    fontWeight: '800',
  },

  heartButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  cardBody: {
    paddingHorizontal: 22,
    paddingVertical: 22,
  },

  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  mealName: {
    flex: 1,
    color: '#1A1C20',
    fontSize: 23,
    fontWeight: '900',
  },

  ratingPill: {
    minWidth: 74,
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },

  ratingText: {
    color: '#222326',
    fontSize: 18,
    fontWeight: '700',
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 11,
  },

  metaText: {
    color: '#6F6F72',
    fontSize: 17,
    fontWeight: '600',
  },

  metaDot: {
    color: '#E8C8BE',
    fontSize: 18,
    fontWeight: '900',
  },

  ingredients: {
    marginTop: 12,
    color: '#56595F',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },

  categoryBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#FFF0EA',
  },

  categoryBadgeText: {
    color: '#D9480F',
    fontSize: 13,
    fontWeight: '800',
  },

  lightBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#F4F4F5',
  },

  lightBadgeText: {
    color: '#6F6F72',
    fontSize: 13,
    fontWeight: '700',
  },
});
