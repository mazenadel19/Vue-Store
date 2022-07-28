<script setup>
import allproducts from "./assets/products.json";
</script>

<template>
  <!-- Start Banner -->
  <header class="bg-dark">
    <div class="container">
      <div class="row">
        <div
          class="col-md-12 text-light d-flex justify-content-between align-items-baseline p-3"
        >
          <a
            href="#"
            class="text-warning text-decoration-none h4"
            @click.prevent="hideCart"
            >Vue Store</a
          >
          <div class="d-flex align-items-baseline">
            <button
              class="btn btn-primary ms-3"
              @click="showCart"
              :title="
                cart.items.length +
                ` item${
                  cart.items.length !== 1 ? 's' : ''
                } in your chart with total price ` +
                currency(compCartTotal)
              "
            >
              show chart
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ cart.items.length }}
                <span class="visually-hidden">number of items in cart</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- End Banner -->

  <div class="container">
    <!-- Start Products -->
    <div
      v-if="!cart.isCartVisisble"
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-1"
    >
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.image" class="card-img-top" :alt="product.name" />
          <div class="card-body mh-160 text-center">
            <h5 class="card-title fw-bold" :title="product.name">
              {{ shortifyText(product.name, 4) }}
            </h5>
            <p class="card-text mt-4">
              {{ shortifyText(product.description, 11) }}
            </p>
          </div>
          <div class="card-footer d-flex flex-column">
            <div class="row">
              <p class="badge text-dark d-flex center col">
                InStock:
                <span
                  class="font_20"
                  :class="[
                    product.instock <= 25 ? 'instock_none' : '',
                    product.instock <= 65 && product.instock > 25
                      ? 'instock_less'
                      : '',
                    product.instock > 65 ? 'instock_more' : '',
                  ]"
                  >{{ product.instock }}</span
                >
              </p>
              <p class="col center">
                Price:<span class="font_20">
                  {{ currency(product.price) }}</span
                >
              </p>
            </div>
            <div class="row">
              <p class="col center">
                Rating: <span class="font_20">{{ product.rate }}</span>
              </p>
              <button
                class="col btn btn-success btn-sm"
                :disabled="product.instock === 0"
                @click="addToCart(product)"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Products -->

    <!-- Start Cart -->
    <div class="row" v-else-if="cart.isCartVisisble">
      <!-- Start Header -->
      <div class="col-12">
        <div class="p-5 border mb-4 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h1 v-if="cart.items.length" class="display-5 fw-bold text-center">
              Your Cart 🛍️
            </h1>
            <h1 v-else class="display-5 fw-bold text-center">
              Your Cart is Empty 🛒
            </h1>
          </div>
        </div>
      </div>
      <!-- End Header -->

      <!-- Start Cart Products -->
      <div class="container" v-if="cart.items.length">
        <div class="row">
          <div class="col-12 table-responsive">
            <table class="table table-striped text-center table align-middle">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Quantity</th>
                  <th scope="col">Product Price</th>
                  <th scope="col">Product Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.items" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ currency(item.price) }}</td>
                  <th>{{ currency(item.price * item.quantity) }}</th>
                  <td>
                    <button
                      class="col btn btn-danger btn-sm"
                      @click="removeFromCart(item.id)"
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <button
                      class="col btn btn-success btn-sm"
                      :disabled="validator(item.id)"
                      @click="addToCart(item)"
                    >
                      +
                    </button>
                  </td>
                </tr>
                <tr>
                  <th colspan="3" class="text-end">Price</th>
                  <th colspan="1">{{ currency(compCartTotal) }}</th>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <th colspan="3" class="text-end">Taxes</th>
                  <th colspan="1">{{ currency(compTaxes) }}</th>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <th colspan="3" class="text-end">Total</th>
                  <th colspan="1">{{ currency(compFinalPrice) }}</th>
                  <td colspan="2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- End Cart Products-->
    </div>
    <!-- End Cart -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: allproducts,
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
    }
  },
  methods: {
    validator:function (id){
     const selectedProduct=  this.products.find(product=>product.id===id)
     return selectedProduct.instock ===0
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
