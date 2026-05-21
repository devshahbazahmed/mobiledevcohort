# FoodApp Navigation Architecture

This project utilizes a nested navigation structure to manage the complex user journey of a modern food delivery application.

## Navigation Structure

1. **Root Stack Navigator (Auth & Onboarding)**
   - `Onboarding`: Initial welcome screen for first-time users.
   - `Login`: Authentication hub for existing users.
   - `MainApp`: The primary authenticated experience (Bottom Tabs).

2. **Main Tab Navigator**
   - `Home`: The restaurant discovery hub (contains its own Stack).
   - `Search`: Search and discovery functionality.
   - `Orders`: Active and past orders.
   - `Profile`: User settings and entry point for the Drawer Navigator.

3. **Restaurant Stack (Nested in Home Tab)**
   - `RestaurantDetail`: Detailed menu and information for a specific restaurant.
   - `Cart`: Review selected items and proceed to checkout.
   - _Note: The bottom tab bar is hidden on these screens to focus the checkout experience._

4. **Drawer Navigator (Accessible from Profile)**
   - `My Orders`: Direct access to order history.
   - `Settings`: App-wide preferences.
   - `Help`: Support and FAQ.
   - `Logout`: Triggers state reset and navigation back to the Auth Stack.

## Key Technical Features

- **Deep Linking**: Supports `foodapp://restaurant/:id` to navigate directly to the restaurant detail page.
- **Conditional Auth**: Uses persistent mock state to determine if the user starts at the Login Stack or MainApp.
- **Programmatic Navigation**: Handled via `navigation.navigate`, `goBack`, and `reset` for complex flow transitions.

![Navigation Diagram]({{DATA:IMAGE:IMAGE_95}})
