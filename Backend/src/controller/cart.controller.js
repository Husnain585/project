const Cart = require("../models/cart");
const Product = require("../models/product");
const CartItem = require("../models/cartItem"); 
// ✅ Get user cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.userId, status: "active" },
      include: {
        model: CartItem,
        include: {
          model: Product,
          attributes: ["name", "price", "stock"],
        },
      },
    });

    if (!cart) return res.status(404).json({ message: "Cart is empty" });

    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};

// ✅ Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity < 1) {
      return res.status(400).json({ error: "Invalid product or quantity" });
    }

    // Check if item already in cart
    const existingItem = await Cart.findOne({
      where: { userId: req.user.userId, productId },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res
        .status(200)
        .json({ message: "Cart updated", cart: existingItem });
    }

    const cartItem = await Cart.create({
      userId: req.user.userId,
      productId,
      quantity,
    });

    return res
      .status(201)
      .json({ message: "Item added to cart", cart: cartItem });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { cartId, quantity } = req.body;
    if (!cartId || quantity < 1) {
      return res.status(400).json({ error: "Invalid cart item or quantity" });
    }

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem || cartItem.userId !== req.user.userId) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    return res
      .status(200)
      .json({ message: "Cart item updated", cart: cartItem });
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Remove item from cart
const removeCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cartItem = await Cart.findByPk(cartId);
    if (!cartItem || cartItem.userId !== req.user.userId) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await cartItem.destroy();
    return res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
