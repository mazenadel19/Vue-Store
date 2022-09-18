<script setup>
import allproducts from "./assets/products.json";
import HeaderComponent from "./components/header-component.vue";
import CartComponent from "./components/cart-component.vue";
import ProductsComponent from "./components/products-component.vue";
</script>

<template>
  <HeaderComponent
    :cart="cart"
    :compCartTotal="compCartTotal"
    @hideCart="hideCart"
    @showCart="showCart"
    :currency="currency"
  />

  <div class="container">
    <!-- Start Products -->
    <div
      v-if="!cart.isCartVisisble"
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-1"
    >
      <ProductsComponent
        :products="products"
        :shortifyText="shortifyText"
        :currency="currency"
        :addToCart="addToCart"
      />
    </div>
    <!-- End Products -->

    <!-- Start Cart -->
    <div class="row" v-else-if="cart.isCartVisisble">
      <CartComponent
        :cart="cart"
        :compTaxes="compTaxes"
        :compFinalPrice="compFinalPrice"
        :compCartTotal="compCartTotal"
        :currency="currency"
        :addToCart="addToCart"
        :removeFromCart="removeFromCart"
        :validator="validator"
      />
    </div>
    <!-- End Cart -->
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios
      .get("https://everlasting-pond-sunday.glitch.me/VueStore")
      .then((res) => (this.products = res.data))
      .catch((err) => console.log(err.message), (this.products = allproducts));
  },
  data() {
    return {
      products: [],
      cart: {
        isCartVisisble: false,
        items: [],
      },
    };
  },
  computed: {
    compCartTotal: function () {
      let _total = 0;
      this.cart.items.forEach((item) => {
        _total += item.quantity * item.price;
      });
      return _total;
    },
    compTaxes: function () {
      return this.compCartTotal * 0.1;
    },
    compFinalPrice: function () {
      return this.compTaxes + this.compCartTotal;
    },
  },
  methods: {
    validator: function (id) {
      const selectedProduct = this.products.find(
        (product) => product.id === id
      );
      return selectedProduct.instock === 0;
    },
    shortifyText: (text, num) => {
      const splitText = text.split(" ");
      if (splitText.length > num) {
        let newText = "";
        for (let index = 0; index < num; index++) {
          const word = splitText[index];
          newText += word + " ";
        }
        return newText + "...";
      } else {
        return text;
      }
    },
    currency: function (value) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
    addToCart: function (product) {
      const { items } = this.cart;
      const existingItemInCart = items.find((item) => item.id === product.id);
      // cart logic
      if (existingItemInCart) {
        existingItemInCart.quantity++;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
      // product ui logi
      const productFromStock = this.products.find((p) => p.id === product.id);
      productFromStock.instock--;
    },
    removeFromCart: function (id) {
      const { items } = this.cart;
      const existingItemInCart = items.find((item) => item.id === id);
      // cart logic
      if (existingItemInCart) {
        if (existingItemInCart.quantity > 1) {
          existingItemInCart.quantity--;
        } else {
          items.splice(items.indexOf(existingItemInCart), 1);
        }
      }
      // product ui logic
      const productFromStock = this.products.find((p) => p.id === id);
      productFromStock.instock++;
    },
    showCart: function () {
      this.cart.isCartVisisble = true;
    },
    hideCart: function () {
      this.cart.isCartVisisble = false;
    },
  },
};
</script>

<style>
@import "@/assets/base.css";

img {
  object-fit: contain;
  height: 250px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.font_20 {
  font-size: 20px;
  margin-left: 5px;
}

.instock_more {
  color: blue;
}

.instock_less {
  color: orange;
}

.instock_none {
  color: red;
}

.card {
  transition: all 1s;
}

.card:hover {
  transform: scale(1.005);
  background: rgb(238, 238, 238);
  background: linear-gradient(
    0deg,
    lightgray 0%,
    rgb(238, 238, 238) 5%,
    white 100%
  );
  box-shadow: rgba(128, 128, 128, 0.3) -5px -5px 10px;
  cursor: pointer;
}

.mh-160 {
  min-height: 160px;
}

th {
  font-weight: bold;
}

thead {
  white-space: nowrap;
}

tr td,
th {
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
