const config = {
  appName: "My E-Commerce",
  apiBaseUrl: "http://localhost:3000/api", // backend base url
  currency: "PKR", // or PKR, INR, etc.
  defaultLanguage: "en",
  stripePublicKey: "pk_test_51S3gSURQHh1fnLy6dbsEKF8Q5plDpADd8ZhvH1eDvxlPYpHke5o4n4QneieRWZsaZ7KaVzWsa9z9fYxDnFzWOsC300mitZB3kV",
  // UI settings
  theme: {
    primaryColor: "#1D4ED8", // Tailwind's blue-700
    secondaryColor: "#9333EA", // Tailwind's purple-600
    dangerColor: "#DC2626", // red-600
  },

  // Pagination defaults
  pagination: {
    productsPerPage: 12,
  },

  // Storage keys
  storageKeys: {
    authToken: "auth_token",
    cart: "cart_items",
    wishlist: "wishlist_items",
    user: "user_data",
  },
};

export default config;
