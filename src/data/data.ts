export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  about: string;
};

export type CartItem = {
  productId: string;
  size: "Small" | "Medium" | "Large";
  sugar: "No Sugar" | "Low" | "Medium";
  quantity: number;
};

export const USER = {
  id: "1",
  name: "Ghofrane",
  email: "ghofrane@gmail.com",
  profileImage: "https://via.placeholder.com/80",
  location: "Tunis, Tunisia",
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cappuccino",
    description: "With Chocolate",
    price: 50000,
    imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
    category: "Cappuccino",
    rating: 4.8,
    about:
      "A cappuccino is an approximately 150 ml beverage, with 25 ml of espresso coffee and 85ml of fresh milk the froth has a creamy texture...",
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "With Oat Milk",
    price: 50000,
    imageUrl: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400",
    category: "Cappuccino",
    rating: 4.8,
    about:
      "Cappuccino with creamy oat milk for a smooth dairy-free experience perfect for afternoon...",
  },
  {
    id: "3",
    name: "Coffee",
    description: "With Sugar",
    price: 50000,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    category: "Coffee",
    rating: 4.8,
    about:
      "Classic coffee with perfect sweetness made from finest arabica beans roasted to perfection...",
  },
  {
    id: "4",
    name: "Coffee",
    description: "With Ice",
    price: 50000,
    imageUrl: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400",
    category: "Coffee",
    rating: 4.8,
    about:
      "Refreshing iced coffee perfect for hot days with bold flavor and smooth finish...",
  },
  {
    id: "5",
    name: "Espresso",
    description: "Double Shot",
    price: 50000,
    imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
    category: "Espresso",
    rating: 4.8,
    about:
      "Intense double shot espresso for true coffee lovers rich bold and full-bodied...",
  },
  {
    id: "6",
    name: "Espresso",
    description: "Single Shot",
    price: 50000,
    imageUrl: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400",
    category: "Espresso",
    rating: 4.8,
    about:
      "Classic single shot espresso pure and authentic coffee experience in every sip...",
  },
];

export const CATEGORIES = ["Cappuccino", "Coffee", "Espresso", "Cream"];

export const getProductById = (id: string) => {
  return PRODUCTS.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string) => {
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
};
