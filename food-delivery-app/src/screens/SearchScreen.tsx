import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const MEALS_URL = 'https://api.freeapi.app/api/v1/public/meals?page=1&limit=24';

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
};

type MealsResponse = {
  data: {
    data: Meal[];
  } | null;
  message: string;
  success: boolean;
};

const quickFilters = ['Tacos', 'Chicken', 'Dessert', 'Seafood', 'Vegetarian'];

const getMealRating = (idMeal: string) => {
  const seed = Number(idMeal.slice(-2)) || 7;
  return (4.1 + (seed % 9) / 10).toFixed(1);
};

const getIngredients = (meal: Meal) =>
  [
    meal.strIngredient1,
    meal.strIngredient2,
    meal.strIngredient3,
    meal.strIngredient4,
  ]
    .filter(Boolean)
    .join(' • ');

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [query, setQuery] = useState<string>('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadMeals = async (shouldRefresh = false) => {
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

      setMeals(result.data.data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to load meals.'
      );
      setMeals([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const filteredMeals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return meals;
    }

    return meals.filter((meal) => {
      const tags = meal.strTags?.toLowerCase() ?? '';

      return (
        meal.strMeal.toLowerCase().includes(normalizedQuery) ||
        meal.strArea.toLowerCase().includes(normalizedQuery) ||
        meal.strCategory.toLowerCase().includes(normalizedQuery) ||
        tags.includes(normalizedQuery)
      );
    });
  }, [meals, query]);

  const renderHeader = () => (
    <View>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Find meals, cuisines, and cravings.</Text>

      <View style={styles.searchBox}>
        <Feather name="search" size={24} color="#8D6E66" />
        <TextInput
          autoCapitalize="none"
          placeholder="Search meals or cuisines..."
          placeholderTextColor="#737987"
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
        />
        {query ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setQuery('')}>
            <Feather name="x" size={22} color="#8D6E66" />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        horizontal
        data={quickFilters}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.78}
            onPress={() => setQuery(item)}
            style={[
              styles.filterChip,
              query.toLowerCase() === item.toLowerCase() && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                query.toLowerCase() === item.toLowerCase() &&
                  styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );

  const renderMeal = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={() => navigation.navigate('Restaurants')}
      style={styles.resultCard}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        resizeMode="cover"
        style={styles.resultImage}
      />

      <View style={styles.resultBody}>
        <View style={styles.resultTitleRow}>
          <Text numberOfLines={2} style={styles.resultTitle}>
            {item.strMeal}
          </Text>
          <View style={styles.ratingPill}>
            <FontAwesome name="star" size={13} color="#FFB000" />
            <Text style={styles.ratingText}>{getMealRating(item.idMeal)}</Text>
          </View>
        </View>

        <Text style={styles.metaText}>
          {item.strArea} • {item.strCategory}
        </Text>
        <Text numberOfLines={1} style={styles.ingredientsText}>
          {getIngredients(item) || 'Fresh ingredients'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#D9480F" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderMeal}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No meals found. Try another search.
          </Text>
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadMeals(true)}
            tintColor="#D9480F"
          />
        }
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 30,
  },

  title: {
    color: '#17191D',
    fontSize: 36,
    fontWeight: '900',
  },

  subtitle: {
    marginTop: 8,
    color: '#676A70',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },

  searchBox: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE5DF',
    borderRadius: 18,
    marginTop: 24,
    paddingHorizontal: 18,
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
    marginLeft: 12,
    color: '#1C1D20',
    fontSize: 17,
    fontWeight: '600',
  },

  filterList: {
    gap: 10,
    paddingTop: 22,
    paddingBottom: 22,
  },

  filterChip: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E7DDD8',
    borderRadius: 22,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },

  activeFilter: {
    borderColor: '#D9480F',
    backgroundColor: '#D9480F',
  },

  filterText: {
    color: '#6D6764',
    fontSize: 15,
    fontWeight: '800',
  },

  activeFilterText: {
    color: '#fff',
  },

  errorText: {
    marginBottom: 16,
    color: '#B42318',
    fontSize: 14,
    fontWeight: '700',
  },

  resultCard: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  resultImage: {
    width: 118,
    minHeight: 132,
    backgroundColor: '#E9E0DB',
  },

  resultBody: {
    flex: 1,
    padding: 16,
  },

  resultTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  resultTitle: {
    flex: 1,
    color: '#1A1C20',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '900',
  },

  ratingPill: {
    minWidth: 56,
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },

  ratingText: {
    color: '#222326',
    fontSize: 14,
    fontWeight: '800',
  },

  metaText: {
    marginTop: 10,
    color: '#6F6F72',
    fontSize: 15,
    fontWeight: '700',
  },

  ingredientsText: {
    marginTop: 8,
    color: '#5F4740',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  emptyText: {
    marginTop: 28,
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
