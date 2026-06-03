require("dotenv").config();
const mongoose = require("mongoose");

const Food = require("./models/Food");

const foods = [
  {
    name: "Classic Burger",
    price: 10,
    category: "Meals",
    description: "Juicy beef burger with cheese, lettuce and house sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Margherita Pizza",
    price: 15,
    category: "Meals",
    description: "Tomato sauce, mozzarella and fresh basil.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Chicken Kebab",
    price: 18,
    category: "Meals",
    description: "Grilled chicken kebab with vegetables and sauce.",
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Creamy Pasta",
    price: 13,
    category: "Meals",
    description: "Pasta served with creamy parmesan sauce.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fresh Salad",
    price: 9,
    category: "Meals",
    description: "Fresh vegetables with olive oil and lemon dressing.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Chocolate Cake",
    price: 7,
    category: "Desserts",
    description: "Rich chocolate cake with soft cream.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Baklava",
    price: 6,
    category: "Desserts",
    description: "Sweet layered pastry with nuts and syrup.",
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Ice Cream",
    price: 5,
    category: "Desserts",
    description: "Vanilla ice cream with seasonal toppings.",
    image:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cheesecake",
    price: 8,
    category: "Desserts",
    description: "Creamy cheesecake with berry sauce.",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fruit Tart",
    price: 7,
    category: "Desserts",
    description: "Crispy tart with custard and fresh fruit.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Fresh Orange Juice",
    price: 4,
    category: "Drinks",
    description: "Freshly squeezed orange juice.",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Iced Coffee",
    price: 5,
    category: "Drinks",
    description: "Cold coffee served with ice and milk.",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Mint Lemonade",
    price: 4,
    category: "Drinks",
    description: "Refreshing lemonade with mint.",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Hot Tea",
    price: 3,
    category: "Drinks",
    description: "Freshly brewed hot tea.",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sparkling Water",
    price: 2,
    category: "Drinks",
    description: "Cold sparkling mineral water.",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80",
  },
];

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in .env");
  }

  await mongoose.connect(process.env.MONGO_URI);
  await Food.deleteMany({});
  await Food.insertMany(foods);
  await mongoose.disconnect();

  console.log("QuickBite demo foods seeded successfully.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
