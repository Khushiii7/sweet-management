// New Mock Data for Sweet Shop Management System
import besanBurfiImage from '../assets/Besan burfi.jpg';

export const mockSweets = [
  // --- Indian Sweets ---
  {
    id: 1,
    name: "Motichoor Ladoo",
    category: "Indian Sweets",
    pricePerKg: 550,
    originalPricePerKg: 650,
    description: "Tiny, soft, and colorful ladoos made from boondi soaked in sugar syrup.",
    image: "https://images.unsplash.com/photo-1632823465508-0f69f0d37db0?w=500&h=500&fit=crop",
    stock: 40,
    featured: true,
    rating: 4.7,
    reviews: 134,
    ingredients: ["Boondi", "Sugar", "Cardamom", "Saffron"],
    weight: "400g"
  },
  {
    id: 2,
    name: "Besan Barfi",
    category: "Indian Sweets",
    pricePerKg: 750,
    originalPricePerKg: 850,
    description: "Rich and dense fudge made from gram flour, ghee, and sugar.",
    image: besanBurfiImage,
    stock: 28,
    featured: false,
    rating: 4.5,
    reviews: 97,
    ingredients: ["Besan", "Sugar", "Ghee", "Almonds"],
    weight: "500g"
  },
  {
    id: 3,
    name: "Sandesh",
    category: "Indian Sweets",
    pricePerKg: 800,
    originalPricePerKg: 950,
    description: "Bengali delicacy made with fresh paneer and flavored with cardamom.",
    image: "https://images.unsplash.com/photo-1607478900766-1ffb03a6d424?w=500&h=500&fit=crop",
    stock: 20,
    featured: false,
    rating: 4.6,
    reviews: 88,
    ingredients: ["Paneer", "Sugar", "Cardamom"],
    weight: "350g"
  },

  // --- Chocolates ---
  {
    id: 4,
    name: "Hazelnut Pralines",
    category: "Chocolates",
    pricePerKg: 2750,
    originalPricePerKg: 3250,
    description: "Luxury pralines with a creamy hazelnut filling and crisp chocolate shell.",
    image: "https://images.unsplash.com/photo-1590080876461-6f87e540ae67?w=500&h=500&fit=crop",
    stock: 50,
    featured: true,
    rating: 4.9,
    reviews: 201,
    ingredients: ["Dark chocolate", "Hazelnuts", "Sugar", "Butter"],
    weight: "250g"
  },
  {
    id: 5,
    name: "White Chocolate Bark",
    category: "Chocolates",
    pricePerKg: 2250,
    originalPricePerKg: 2750,
    description: "Crunchy white chocolate bark with pistachios and dried cranberries.",
    image: "https://images.unsplash.com/photo-1606311840385-8c1cf7c9ed67?w=500&h=500&fit=crop",
    stock: 36,
    featured: false,
    rating: 4.6,
    reviews: 133,
    ingredients: ["White chocolate", "Pistachios", "Cranberries"],
    weight: "300g"
  },

  // --- Cupcakes ---
  {
    id: 6,
    name: "Red Velvet Cupcake",
    category: "Cupcakes",
    pricePerKg: 1250,
    originalPricePerKg: 1500,
    description: "Classic red velvet sponge topped with cream cheese frosting.",
    image: "https://images.unsplash.com/photo-1601979031483-6b7d1b3f74f0?w=500&h=500&fit=crop",
    stock: 25,
    featured: true,
    rating: 4.8,
    reviews: 152,
    ingredients: ["Flour", "Cocoa powder", "Butter", "Cream cheese"],
    weight: "120g"
  },
  {
    id: 7,
    name: "Oreo Cupcake",
    category: "Cupcakes",
    pricePerKg: 1400,
    originalPricePerKg: 1650,
    description: "Chocolate cupcake with Oreo crumbs and cookies & cream frosting.",
    image: "https://images.unsplash.com/photo-1630240586461-10d0e4633c1f?w=500&h=500&fit=crop",
    stock: 32,
    featured: false,
    rating: 4.7,
    reviews: 119,
    ingredients: ["Flour", "Sugar", "Oreo cookies", "Butter"],
    weight: "110g"
  },

  // --- Gummies ---
  {
    id: 8,
    name: "Sour Worms",
    category: "Gummies",
    pricePerKg: 750,
    originalPricePerKg: 900,
    description: "Tangy, chewy gummy worms dusted with sour sugar.",
    image: "https://images.unsplash.com/photo-1581873372796-7c4c597f02e5?w=500&h=500&fit=crop",
    stock: 100,
    featured: false,
    rating: 4.5,
    reviews: 99,
    ingredients: ["Gelatin", "Sugar", "Citric acid", "Flavors"],
    weight: "250g"
  },
  {
    id: 9,
    name: "Fruit Rings",
    category: "Gummies",
    pricePerKg: 900,
    originalPricePerKg: 1100,
    description: "Colorful gummy rings bursting with fruity flavor.",
    image: "https://images.unsplash.com/photo-1603048299487-4d873d61bb64?w=500&h=500&fit=crop",
    stock: 80,
    featured: true,
    rating: 4.6,
    reviews: 87,
    ingredients: ["Gelatin", "Sugar", "Fruit flavors", "Colors"],
    weight: "300g"
  },

  // --- Candies ---
  {
    id: 10,
    name: "Butterscotch Candy",
    category: "Candies",
    pricePerKg: 500,
    originalPricePerKg: 600,
    description: "Classic golden butterscotch hard candies with a rich caramel taste.",
    image: "https://images.unsplash.com/photo-1580934446661-cb71b6f16f6e?w=500&h=500&fit=crop",
    stock: 70,
    featured: false,
    rating: 4.4,
    reviews: 102,
    ingredients: ["Sugar", "Butter", "Corn syrup"],
    weight: "200g"
  },
  {
    id: 11,
    name: "Mint Toffees",
    category: "Candies",
    pricePerKg: 600,
    originalPricePerKg: 700,
    description: "Chewy mint-flavored toffees for a refreshing bite.",
    image: "https://images.unsplash.com/photo-1617196038180-b1cf495facac?w=500&h=500&fit=crop",
    stock: 95,
    featured: false,
    rating: 4.3,
    reviews: 84,
    ingredients: ["Sugar", "Mint flavor", "Butter"],
    weight: "220g"
  }
];

export const mockCategories = [
  { id: 1, name: "Indian Sweets", count: 3, icon: "" },
  { id: 2, name: "Chocolates", count: 2, icon: "" },
  { id: 3, name: "Cupcakes", count: 2, icon: "" },
  { id: 4, name: "Gummies", count: 2, icon: "" },
  { id: 5, name: "Candies", count: 2, icon: "" }
];

export const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@sweetshop.com",
    password: "admin123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    password: "user123",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockOrders = [
  {
    id: 1,
    userId: 2,
    items: [
      { sweetId: 1, quantity: 2, price: 25 },
      { sweetId: 2, quantity: 1, price: 45 }
    ],
    total: 95,
    status: "completed",
    createdAt: "2024-01-15T10:30:00Z",
    address: "123 Main St, Mumbai, India"
  }
];

export const mockReviews = [
  {
    id: 1,
    sweetId: 1,
    userId: 2,
    rating: 5,
    comment: "Absolutely delicious! Best gulab jamun I've ever tasted.",
    createdAt: "2024-01-10T14:20:00Z"
  }
];

// Mock authentication state management
export const mockAuthState = {
  user: null,
  isAuthenticated: false,
  cart: [],
  wishlist: []
};

// Mock social login responses
export const mockGoogleUser = {
  id: "3",
  name: "Google User",
  email: "googleuser@gmail.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b67494c0?w=150&h=150&fit=crop&crop=face",
  role: "user",
  provider: "google"
};

export const mockFacebookUser = {
  id: "4",
  name: "Facebook User",
  email: "fbuser@facebook.com",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  role: "user",
  provider: "facebook"
};