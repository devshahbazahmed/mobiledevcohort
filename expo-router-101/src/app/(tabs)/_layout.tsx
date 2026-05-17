import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import { Tabs } from 'expo-router';
import type { AndroidSymbol } from 'expo-symbols';
import { SymbolView } from 'expo-symbols';
import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import type { SFSymbol } from 'sf-symbols-typescript';

const palette = {
  accent: '#8B5CF6',
  accentMuted: 'rgba(139, 92, 246, 0.2)',
  barFallback: 'rgba(22, 22, 27, 0.94)',
  border: 'rgba(255, 255, 255, 0.1)',
  labelActive: '#FAFAFA',
  labelInactive: '#A1A1AA',
  iconInactive: '#71717A',
  shadow: '#000000',
} as const;

type TabIcon = {
  ios: SFSymbol;
  android: AndroidSymbol;
  web: AndroidSymbol;
};

const TAB_CONFIG: Record<
  string,
  { label: string; icon: TabIcon; iconActive: TabIcon }
> = {
  index: {
    label: 'Home',
    icon: { ios: 'house', android: 'home', web: 'home' },
    iconActive: {
      ios: 'house.fill',
      android: 'home_filled',
      web: 'home_filled',
    },
  },
  explore: {
    label: 'Explore',
    icon: { ios: 'safari', android: 'explore', web: 'explore' },
    iconActive: {
      ios: 'safari.fill',
      android: 'explore',
      web: 'explore',
    },
  },
  settings: {
    label: 'Settings',
    icon: { ios: 'gearshape', android: 'settings', web: 'settings' },
    iconActive: {
      ios: 'gearshape.fill',
      android: 'settings',
      web: 'settings',
    },
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TabBarBackground({ children }: { children: ReactNode }) {
  const useGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();

  if (useGlass) {
    return (
      <GlassView
        style={styles.bar}
        glassEffectStyle="regular"
        colorScheme="dark"
        tintColor="rgba(30, 30, 36, 0.55)"
      >
        {children}
      </GlassView>
    );
  }

  return <View style={[styles.bar, styles.barFallback]}>{children}</View>;
}

function TabBarItem({
  label,
  icon,
  iconActive,
  isFocused,
  onPress,
  onLongPress,
}: {
  label: string;
  icon: TabIcon;
  iconActive: TabIcon;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={label}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => {
        scale.value = withSpring(0.92, { damping: 15, stiffness: 400 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
      }}
      style={[styles.tab, animatedStyle]}
    >
      {isFocused ? (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          style={styles.activePill}
        />
      ) : null}

      <SymbolView
        name={isFocused ? iconActive : icon}
        size={24}
        tintColor={isFocused ? palette.accent : palette.iconInactive}
        weight={isFocused ? 'semibold' : 'regular'}
      />

      <Text
        style={[styles.label, isFocused && styles.labelActive]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

function MyTabBar({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}
    >
      <TabBarBackground>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const config = TAB_CONFIG[route.name] ?? {
            label: options.title ?? route.name,
            icon: TAB_CONFIG.index.icon,
            iconActive: TAB_CONFIG.index.iconActive,
          };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarItem
              key={route.key}
              label={config.label}
              icon={config.icon}
              iconActive={config.iconActive}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </TabBarBackground>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#0A0A0B' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: palette.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
      default: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
      },
    }),
  },
  barFallback: {
    backgroundColor: palette.barFallback,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 4,
    minHeight: 56,
  },
  activePill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.accentMuted,
    borderRadius: 20,
    borderCurve: 'continuous',
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.2,
    color: palette.labelInactive,
  },
  labelActive: {
    color: palette.labelActive,
    fontWeight: '600',
  },
});

// import { Tabs } from 'expo-router';
// import { View, Text } from 'react-native';

// export default function TabsLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="index" options={{ title: 'Home' }} />
//       <Tabs.Screen name="about" options={{ title: 'About' }} />
//       <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
//       <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
//     </Tabs>
//   );
// }

// import { NativeTabs } from 'expo-router/unstable-native-tabs';

// export default function TabsLayout() {
//   return (
//     <NativeTabs tintColor={'tomato'} backgroundColor={'#111827'}>
//       <NativeTabs.Trigger name="index">
//         <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="settings">
//         <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon sf="gear" md="settings" />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="explore">
//         <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon sf="compass.drawing" md="explore" />
//       </NativeTabs.Trigger>

//       <NativeTabs.Trigger name="about">
//         <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
//         <NativeTabs.Trigger.Icon sf="person" md="person" />
//       </NativeTabs.Trigger>
//     </NativeTabs>
//   );
// }
