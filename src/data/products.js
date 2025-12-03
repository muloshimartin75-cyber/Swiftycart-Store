const products = [
  // ELECTRONICS (15 products)
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    description: "Latest Apple iPhone with A17 Pro chip, Titanium design, and advanced camera system.",
    category: "electronics",
    subcategory: "smartphones",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    fastDelivery: true,
    features: ["5G", "Face ID", "Pro Camera", "Titanium", "USB-C"],
    specifications: {
      storage: "256GB",
      color: "Natural Titanium",
      screen: "6.7-inch",
      battery: "4422mAh"
    },
    seller: "Apple Official",
    shipping: "FREE delivery Tomorrow",
    discount: 8
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
    description: "Samsung flagship with S Pen, Snapdragon 8 Gen 3, and AI features.",
    category: "electronics",
    subcategory: "smartphones",
    brand: "Samsung",
    rating: 4.7,
    reviewCount: 893,
    inStock: true,
    fastDelivery: true,
    features: ["S Pen", "AI Features", "200MP Camera", "Snapdragon 8 Gen 3"],
    specifications: {
      storage: "512GB",
      color: "Titanium Black",
      screen: "6.8-inch",
      battery: "5000mAh"
    },
    seller: "Samsung Official",
    shipping: "FREE delivery Tomorrow",
    discount: 8
  },
  {
    id: 3,
    name: "MacBook Air M3 13-inch",
    price: 1099.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
    description: "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display.",
    category: "electronics",
    subcategory: "laptops",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 567,
    inStock: true,
    fastDelivery: true,
    features: ["M3 Chip", "13-inch", "8GB RAM", "256GB SSD"],
    specifications: {
      processor: "Apple M3",
      memory: "8GB",
      storage: "256GB SSD",
      color: "Space Gray"
    },
    seller: "Apple Official",
    shipping: "FREE delivery Tomorrow",
    discount: 8
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    price: 349.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Industry-leading noise cancellation with 30-hour battery life.",
    category: "electronics",
    subcategory: "audio",
    brand: "Sony",
    rating: 4.8,
    reviewCount: 2341,
    inStock: true,
    fastDelivery: true,
    features: ["Noise Cancellation", "30hr Battery", "Touch Controls"],
    specifications: {
      battery: "30 hours",
      connectivity: "Bluetooth 5.2",
      weight: "250g"
    },
    seller: "Sony Official",
    shipping: "FREE delivery Tomorrow",
    discount: 13
  },
  {
    id: 5,
    name: "iPad Air 5th Generation",
    price: 599.99,
    originalPrice: 649.99,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    description: "Powerful iPad Air with M1 chip and Liquid Retina display.",
    category: "electronics",
    subcategory: "tablets",
    brand: "Apple",
    rating: 4.7,
    reviewCount: 892,
    inStock: true,
    fastDelivery: true,
    features: ["M1 Chip", "10.9-inch", "5G", "Touch ID"],
    specifications: {
      storage: "64GB",
      screen: "10.9-inch",
      color: "Space Gray"
    },
    seller: "Apple Official",
    shipping: "FREE delivery",
    discount: 8
  },

  // CLOTHING (10 products)
  {
    id: 6,
    name: "Nike Air Jordan 1 Retro High",
    price: 179.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Classic Air Jordan 1 Retro High in black and red colorway.",
    category: "fashion",
    subcategory: "shoes",
    brand: "Nike",
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    fastDelivery: true,
    features: ["Leather Upper", "Air Cushioning", "Classic Design"],
    specifications: {
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
      color: "Black/Red",
      material: "Leather"
    },
    seller: "Nike Official",
    shipping: "FREE delivery",
    discount: 10
  },
  {
    id: 7,
    name: "Adidas Ultraboost 21 Running Shoes",
    price: 179.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
    description: "Boost technology provides maximum energy return with every step.",
    category: "fashion",
    subcategory: "shoes",
    brand: "Adidas",
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
    fastDelivery: true,
    features: ["Boost Midsole", "Primeknit Upper", "Continental Rubber"],
    specifications: {
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
      color: "Core Black",
      material: "Primeknit"
    },
    seller: "Adidas Official",
    shipping: "FREE delivery",
    discount: 5
  },

  // HOME & KITCHEN (8 products)
  {
    id: 8,
    name: "Instant Pot Duo 7-in-1 Pressure Cooker",
    price: 89.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    description: "7-in-1 multi-functional pressure cooker for fast, easy meals.",
    category: "home",
    subcategory: "kitchen",
    brand: "Instant Pot",
    rating: 4.7,
    reviewCount: 12345,
    inStock: true,
    fastDelivery: true,
    features: ["7-in-1", "Pressure Cook", "Slow Cook", "Saute"],
    specifications: {
      capacity: "6 Quart",
      programs: "7 functions",
      color: "Stainless Steel"
    },
    seller: "KitchenPro",
    shipping: "FREE delivery Tomorrow",
    discount: 10
  },

  // BEAUTY (5 products)
  {
    id: 9,
    name: "Dyson Supersonic Hair Dryer",
    price: 429.99,
    originalPrice: 449.99,
    image: "https://images.unsplash.com/photo-1522338140264-49c0fd43dacb?w=500",
    description: "Professional hair dryer with intelligent heat control.",
    category: "beauty",
    subcategory: "hair-care",
    brand: "Dyson",
    rating: 4.6,
    reviewCount: 2341,
    inStock: true,
    fastDelivery: true,
    features: ["Intelligent Heat Control", "Fast Drying", "Damage Protection"],
    specifications: {
      power: "1600W",
      attachments: "4 included",
      color: "Iron/Fuchsia"
    },
    seller: "Dyson Official",
    shipping: "FREE delivery",
    discount: 4
  },

  // Add more products to reach 50+...
  {
    id: 10,
    name: "Samsung 55-inch 4K Smart TV",
    price: 499.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
    description: "Crystal clear 4K resolution with built-in streaming apps.",
    category: "electronics",
    subcategory: "tv",
    brand: "Samsung",
    rating: 4.5,
    reviewCount: 3124,
    inStock: true,
    fastDelivery: true,
    features: ["4K UHD", "Smart TV", "HDR", "Voice Control"],
    specifications: {
      size: "55-inch",
      resolution: "4K UHD",
      smart: "Tizen OS"
    },
    seller: "Samsung Official",
    shipping: "FREE delivery",
    discount: 17
  }
];

export default products;