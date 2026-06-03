import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const categoryOptions = ["All", "Meals", "Soups", "Desserts", "Drinks"];

const sampleFoods = [
  {
    _id: "demo-meal-1",
    name: "Classic Burger",
    price: 39,
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-meal-2",
    name: "Margherita Pizza",
    price: 42,
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-meal-3",
    name: "Chicken Kebab",
    price: 34,
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-meal-4",
    name: "Creamy Pasta",
    price: 38,
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-meal-5",
    name: "Fresh Salad",
    price: 29,
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-soup-1",
    name: "Tomato Soup",
    price: 19,
    category: "Soups",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-soup-2",
    name: "Lentil Soup",
    price: 18,
    category: "Soups",
    image:
      "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-soup-3",
    name: "Chicken Noodle Soup",
    price: 23,
    category: "Soups",
    image:
      "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-soup-4",
    name: "Mushroom Cream Soup",
    price: 24,
    category: "Soups",
    image:
      "https://images.unsplash.com/photo-1632931057819-4eefffa8e007?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-soup-5",
    name: "Vegetable Soup",
    price: 20,
    category: "Soups",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-dessert-1",
    name: "Chocolate Cake",
    price: 24,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-dessert-2",
    name: "Baklava",
    price: 22,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-dessert-3",
    name: "Ice Cream",
    price: 20,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-dessert-4",
    name: "Cheesecake",
    price: 26,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-dessert-5",
    name: "Fruit Tart",
    price: 25,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-drink-1",
    name: "Fresh Orange Juice",
    price: 16,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-drink-2",
    name: "Iced Coffee",
    price: 18,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-drink-3",
    name: "Mint Lemonade",
    price: 17,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-drink-4",
    name: "Hot Tea",
    price: 12,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
  },
  {
    _id: "demo-drink-5",
    name: "Sparkling Water",
    price: 8,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80",
  },
];

const menuMeta = [
  {
    keys: ["burger", "hamburger"],
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["pizza"],
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["kebab", "kabab"],
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["pasta", "spaghetti"],
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["steak", "meat"],
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["salad"],
    category: "Meals",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["soup", "lentil", "tomato soup", "noodle soup", "mushroom soup"],
    category: "Soups",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["cake", "tort"],
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["baklava", "paxlava"],
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["ice cream", "dondurma"],
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["coffee", "kofe"],
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["tea", "cay"],
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
  },
  {
    keys: ["cola", "juice", "soda", "drink", "water", "limonad"],
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80",
  },
];

const defaultMeta = {
  category: "Meals",
  image:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
};

function mergeWithSampleFoods(apiFoods = []) {
  const apiFoodNames = new Set(
    apiFoods.map((food) => food.name.toLowerCase().trim())
  );

  const missingSampleFoods = sampleFoods.filter(
    (food) => !apiFoodNames.has(food.name.toLowerCase().trim())
  );

  return [...apiFoods, ...missingSampleFoods];
}

function getFoodMeta(name = "") {
  const normalizedName = name.toLowerCase();
  return (
    menuMeta.find((item) =>
      item.keys.some((key) => normalizedName.includes(key))
    ) || defaultMeta
  );
}

function getCartKey(user) {
  return `quickbite-cart-${user?.id || user?.email || "guest"}`;
}

function App() {
  const [foods, setFoods] = useState([]);
  const [foodForm, setFoodForm] = useState({ name: "", price: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loggedUser, setLoggedUser] = useState(null);
  const [token, setToken] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [liveNotification, setLiveNotification] = useState("");
  const [weather, setWeather] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchFoods();
    fetchWeather();
    fetchAnalytics();

    const events = new EventSource(`${API_URL}/events`);
    events.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setLiveNotification(notification.message);
    };

    events.onerror = () => {
      events.close();
    };

    return () => {
      events.close();
    };
  }, []);

  useEffect(() => {
    if (!loggedUser) {
      setCartItems([]);
      return;
    }

    const savedCart = localStorage.getItem(getCartKey(loggedUser));
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, [loggedUser]);

  const menuItems = useMemo(
    () =>
      foods.map((food) => ({
        ...getFoodMeta(food.name),
        ...food,
      })),
    [foods]
  );

  const filteredFoods =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((food) => food.category === activeCategory);

  const isAdmin = loggedUser?.role === "admin";

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const saveCart = (nextCart) => {
    setCartItems(nextCart);

    if (loggedUser) {
      localStorage.setItem(getCartKey(loggedUser), JSON.stringify(nextCart));
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${API_URL}/foods`);
      const apiFoods = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setFoods(mergeWithSampleFoods(apiFoods));
      setMessage("");
    } catch (error) {
      console.error(error);
      setFoods(sampleFoods);
      setMessage("");
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`${API_URL}/weather`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${API_URL}/analytics`);
      setAnalytics(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFoodChange = (event) => {
    const { name, value } = event.target;
    setFoodForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const addFood = async (event) => {
    event.preventDefault();

    const trimmedName = foodForm.name.trim();
    const price = Number(foodForm.price);

    if (!trimmedName || !price || price <= 0) {
      setMessage("Please enter a valid food name and price.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/foods`,
        {
          name: trimmedName,
          price,
          category: activeCategory === "All" ? "Meals" : activeCategory,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setFoods((currentFoods) => [...currentFoods, response.data.food]);
      fetchAnalytics();
      setFoodForm({ name: "", price: "" });
      setMessage("Food added successfully.");
    } catch (error) {
      console.error(error);
      setFoods((currentFoods) => [
        ...currentFoods,
        {
          _id: `demo-${Date.now()}`,
          name: trimmedName,
          price,
        },
      ]);
      setFoodForm({ name: "", price: "" });
      setMessage("Food added to the demo menu.");
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (event) => {
    event.preventDefault();

    if (
      !registerForm.name.trim() ||
      !registerForm.email.trim() ||
      !registerForm.password
    ) {
      setMessage("Please fill all registration fields.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${API_URL}/register`, registerForm);
      const response = await axios.post(`${API_URL}/login`, {
        email: registerForm.email,
        password: registerForm.password,
      });

      setLoggedUser(response.data.user);
      setToken(response.data.token || "");
      setRegisterForm({ name: "", email: "", password: "" });
      setMessage("User registered successfully.");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (event) => {
    event.preventDefault();

    if (!loginForm.email.trim() || !loginForm.password) {
      setMessage("Please enter email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/login`, loginForm);
      setLoggedUser(response.data.user);
      setToken(response.data.token || "");
      setLoginForm({ email: "", password: "" });
      setMessage("Login successful.");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    setLoggedUser(null);
    setToken("");
    setMessage("Logged out.");
  };

  const addToCart = (food) => {
    if (!loggedUser) {
      setMessage("Please login to add items to your cart.");
      return;
    }

    const nextCart = cartItems.some((item) => item.id === food._id)
      ? cartItems.map((item) =>
          item.id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [
          ...cartItems,
          {
            id: food._id,
            name: food.name,
            price: Number(food.price),
            image: food.image,
            category: food.category,
            quantity: 1,
          },
        ];

    saveCart(nextCart);
    setMessage(`${food.name} added to your cart.`);
  };

  const changeCartQuantity = (id, amount) => {
    const nextCart = cartItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(nextCart);
  };

  const removeFromCart = (id) => {
    saveCart(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    saveCart([]);
    setMessage("Cart cleared.");
  };

  const deleteFood = async (id) => {
    if (id.startsWith("demo-")) {
      setFoods((currentFoods) => currentFoods.filter((food) => food._id !== id));
      setMessage("Food deleted successfully.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/foods/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setFoods((currentFoods) => currentFoods.filter((food) => food._id !== id));
      fetchAnalytics();
      setMessage("Food deleted successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Food could not be deleted.");
    }
  };

  const editFood = async (food) => {
    const newName = window.prompt("New food name:", food.name);
    const trimmedName = newName?.trim();

    if (!trimmedName || trimmedName === food.name) return;

    if (food._id.startsWith("demo-")) {
      setFoods((currentFoods) =>
        currentFoods.map((currentFood) =>
          currentFood._id === food._id
            ? { ...currentFood, name: trimmedName }
            : currentFood
        )
      );
      setMessage("Food updated successfully.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/foods/${food._id}`,
        {
          name: trimmedName,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      setFoods((currentFoods) =>
        currentFoods.map((currentFood) =>
          currentFood._id === food._id ? response.data.food : currentFood
        )
      );
      fetchAnalytics();
      setMessage("Food updated successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Food could not be updated.");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <main className="page">
        <section className="hero">
          <div className="hero__content">
            <p className="eyebrow">Fresh taste, fast service</p>
            <h1>QuickBite Restaurant</h1>
            <p className="hero__text">
              Meals, soups, desserts and drinks in one warm restaurant menu.
            </p>
          </div>
        </section>

        <section className="panel auth-panel">
          <form onSubmit={registerUser} className="form">
            <h2>Register</h2>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
            />
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
            />
            <button type="submit" disabled={isLoading}>
              Register
            </button>
          </form>

          <form onSubmit={loginUser} className="form">
            <h2>Login</h2>
            {loggedUser ? (
              <div className="welcome">
                <strong>Welcome, {loggedUser.name}</strong>
                <button type="button" onClick={logoutUser}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                <button type="submit" disabled={isLoading}>
                  Login
                </button>
              </>
            )}
          </form>
        </section>

        {message && <p className="message">{message}</p>}
        {liveNotification && (
          <p className="message live-message">Live update: {liveNotification}</p>
        )}

        <section className="insights-grid">
          <article className="insight-card">
            <span>Third-party API</span>
            <h2>{weather?.temperature ?? "--"} C</h2>
            <p>Warsaw weather by Open-Meteo for delivery demand planning.</p>
          </article>

          <article className="insight-card">
            <span>Analytics</span>
            <h2>{analytics?.totalFoods ?? menuItems.length}</h2>
            <p>Total menu items tracked through the backend database.</p>
          </article>

          <article className="insight-card">
            <span>Average price</span>
            <h2>{analytics?.averagePrice ?? "0.00"} PLN</h2>
            <p>Calculated from stored restaurant products.</p>
          </article>
        </section>

        <section className="panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Restaurant menu</p>
              <h2>Popular Choices</h2>
            </div>

            {isAdmin && (
              <form onSubmit={addFood} className="add-form">
              <input
                name="name"
                type="text"
                placeholder="Food name"
                value={foodForm.name}
                onChange={handleFoodChange}
              />
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                  placeholder="Price (PLN)"
                value={foodForm.price}
                onChange={handleFoodChange}
              />
              <button type="submit" disabled={isLoading}>
                Add
              </button>
              </form>
            )}
          </div>

          <div className="categories">
            {categoryOptions.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredFoods.length === 0 ? (
            <p className="empty">No menu items in this category yet.</p>
          ) : (
            <div className="menu-grid">
              {filteredFoods.map((food) => (
                <article key={food._id} className="food-card">
                  <img src={food.image} alt={food.name} />
                  <div className="food-card__body">
                    <span>{food.category}</span>
                    <div className="food-card__title">
                      <h3>{food.name}</h3>
                      <strong>{Number(food.price).toFixed(2)} PLN</strong>
                    </div>
                    <div className="actions">
                      <button type="button" onClick={() => addToCart(food)}>
                        Add to cart
                      </button>
                      {isAdmin && (
                        <>
                          <button type="button" onClick={() => editFood(food)}>
                            Edit
                          </button>
                          <button
                            type="button"
                            className="danger"
                            onClick={() => deleteFood(food._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="panel cart-panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Personal cart</p>
              <h2>{loggedUser ? `${loggedUser.name}'s Cart` : "Your Cart"}</h2>
            </div>
            <strong className="cart-total">{cartTotal.toFixed(2)} PLN</strong>
          </div>

          {!loggedUser ? (
            <p className="empty">Login to add foods to your personal cart.</p>
          ) : cartItems.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-list">
                {cartItems.map((item) => (
                  <article key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>
                        {item.quantity} x {Number(item.price).toFixed(2)} PLN
                      </p>
                    </div>
                    <div className="qty-actions">
                      <button
                        type="button"
                        onClick={() => changeCartQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <strong>{item.quantity}</strong>
                      <button
                        type="button"
                        onClick={() => changeCartQuantity(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <button type="button" className="clear-cart" onClick={clearCart}>
                Clear cart
              </button>
            </>
          )}
        </section>
      </main>
    </>
  );
}

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  color: #201713;
  background:
    linear-gradient(rgba(255, 250, 243, 0.88), rgba(255, 250, 243, 0.94)),
    url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80");
  background-attachment: fixed;
  background-size: cover;
  font-family: Inter, Arial, sans-serif;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  background: #c64b2a;
  font-weight: 700;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

input {
  width: 100%;
  border: 1px solid #ead8c7;
  border-radius: 8px;
  padding: 11px 12px;
  color: #2b211c;
  background: #fffdf9;
  outline: none;
}

input:focus {
  border-color: #c64b2a;
  box-shadow: 0 0 0 3px rgba(198, 75, 42, 0.16);
}

.page {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 56px;
}

.hero {
  min-height: 330px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border-radius: 10px;
  background:
    linear-gradient(90deg, rgba(32, 23, 19, 0.82), rgba(32, 23, 19, 0.18)),
    url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80");
  background-position: center;
  background-size: cover;
  box-shadow: 0 24px 70px rgba(74, 45, 30, 0.22);
}

.hero__content {
  max-width: 620px;
  padding: 48px;
  color: #fff;
}

.eyebrow {
  margin: 0 0 8px;
  color: #c64b2a;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.hero .eyebrow {
  color: #ffd08f;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 12px;
  font-size: clamp(42px, 7vw, 82px);
  line-height: 0.95;
}

h2 {
  margin-bottom: 16px;
  font-size: 30px;
}

.hero__text {
  max-width: 460px;
  margin-bottom: 0;
  color: #fff1e3;
  font-size: 18px;
}

.panel {
  margin-top: 22px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  background: rgba(255, 252, 247, 0.92);
  box-shadow: 0 18px 50px rgba(74, 45, 30, 0.12);
  backdrop-filter: blur(10px);
}

.auth-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.form {
  display: grid;
  gap: 10px;
}

.form h2 {
  margin-bottom: 4px;
  font-size: 22px;
}

.welcome {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 46px;
}

.message {
  margin: 18px 0 0;
  padding: 13px 15px;
  border-radius: 8px;
  color: #6c341f;
  background: #fff0df;
  border: 1px solid #ffd6ad;
  font-weight: 700;
}

.live-message {
  color: #22533d;
  background: #e9f8ef;
  border-color: #bfe8cf;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.insight-card {
  padding: 18px;
  border-radius: 10px;
  background: rgba(255, 252, 247, 0.92);
  border: 1px solid rgba(234, 216, 199, 0.9);
  box-shadow: 0 14px 35px rgba(74, 45, 30, 0.1);
}

.insight-card span {
  color: #2f6b4f;
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
}

.insight-card h2 {
  margin: 8px 0;
  color: #c64b2a;
}

.insight-card p {
  margin-bottom: 0;
  color: #6c5b51;
  font-weight: 700;
}

.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
}

.section-head h2 {
  margin-bottom: 0;
}

.add-form {
  width: min(560px, 100%);
  display: grid;
  grid-template-columns: 1fr 130px auto;
  gap: 10px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 22px 0;
}

.categories button {
  color: #4a2d1e;
  background: #f7e4d0;
}

.categories button.active {
  color: #fff;
  background: #2f6b4f;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 18px;
}

.food-card {
  overflow: hidden;
  border: 1px solid #ead8c7;
  border-radius: 10px;
  background: #fffdf9;
  box-shadow: 0 16px 35px rgba(74, 45, 30, 0.1);
}

.food-card img {
  width: 100%;
  height: 180px;
  display: block;
  object-fit: cover;
}

.food-card__body {
  padding: 16px;
}

.food-card__body span {
  color: #2f6b4f;
  font-size: 13px;
  font-weight: 800;
}

.food-card__title {
  min-height: 66px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.food-card h3 {
  margin-bottom: 0;
  color: #4a3429;
  font-size: 23px;
}

.food-card strong {
  white-space: nowrap;
  color: #c64b2a;
  font-size: 22px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.actions button {
  flex: 1;
  color: #4a2d1e;
  background: #f7e4d0;
}

.actions .danger {
  color: #fff;
  background: #b3261e;
}

.cart-panel {
  margin-bottom: 24px;
}

.cart-total {
  color: #c64b2a;
  font-size: 28px;
}

.cart-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.cart-item {
  display: grid;
  grid-template-columns: 74px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border: 1px solid #ead8c7;
  border-radius: 10px;
  background: #fffdf9;
}

.cart-item img {
  width: 74px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}

.cart-item h3 {
  margin-bottom: 4px;
  font-size: 18px;
}

.cart-item p {
  margin-bottom: 0;
  color: #6c5b51;
  font-weight: 700;
}

.qty-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-actions button {
  min-width: 38px;
  padding: 9px 10px;
}

.qty-actions .danger {
  color: #fff;
  background: #b3261e;
}

.clear-cart {
  margin-top: 14px;
}

.empty {
  margin-bottom: 0;
  color: #6c5b51;
  font-weight: 700;
}

@media (max-width: 760px) {
  .page {
    width: min(100% - 20px, 1180px);
    padding-top: 10px;
  }

  .hero {
    min-height: 300px;
  }

  .hero__content {
    padding: 28px;
  }

  .auth-panel,
  .section-head,
  .insights-grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .add-form {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 64px 1fr;
  }

  .qty-actions {
    grid-column: 1 / -1;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
`;

export default App;
