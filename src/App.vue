<script setup>
import allproducts from "./assets/products.json";
</script>

<template>
  <div class="container">
    <!-- Start Banner -->
    <div class="row">
      <div
        class="col-md-12 bg-dark text-light d-flex justify-content-between align-items-baseline p-3"
      >
        <a
          href="#"
          class="text-warning text-decoration-none"
          @click.prevent="hideCart"
          >Vue-Store</a
        >
        <div class="d-flex align-items-baseline">
          <p class="lead mb-0">
            {{ cart.items.length }} item<template v-if="cart.items.length !== 1"
              >s</template
            >
            in your chart with total price {{ currency(cart.cartTotal) }}
          </p>
          <button class="btn btn-primary ms-3" @click="showCart">
            show chart
          </button>
        </div>
      </div>
    </div>
    <!-- End Banner -->

    <!-- Start Products -->
    <div
      v-show="!isShowCart"
      class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-1"
    >
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.image" class="card-img-top" :alt="product.name" />
          <div class="card-body text-center">
            <h5 class="card-title" :title="product.name">
              {{ shortifyText(product.name, 3) }}
            </h5>
            <p class="card-text">
              {{ shortifyText(product.description, 15) }}
            </p>
          </div>
          <div class="card-footer d-flex flex-column">
            <div class="row">
              <p class="badge text-dark center col">
                InStock:
                <span
                  class="font_20"
                  :class="[
                    product.instock <= 150 ? 'instock_none' : '',
                    product.instock <= 300 && product.instock > 150
                      ? 'instock_less'
                      : '',
                    product.instock > 300 && product.instock < 1000
                      ? 'instock_more'
                      : '',
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
    <div class="row" v-show="isShowCart">
      <!-- Start Header -->
      <div class="col-12">
        <div class="p-5 border mb-4 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h1 v-if="cart.items.length" class="display-5 fw-bold text-center">
              Your Cart <i class="fa-brands fa-opencart"></i>
            </h1>
            <h1 v-else class="display-5 fw-bold text-center">
              Your Cart is Empty
            </h1>
          </div>
        </div>
      </div>
      <!-- End Header -->

      <!-- Start Cart Products -->
      <div class="container" v-show="cart.items.length">
        <div class="row">
          <div class="col-12">
            <table class="table table-striped text-center">
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
                  <th>{{ currency(item.totalItemPrice) }}</th>
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
      isShowCart: false,
      cart: {
        items: [],
        cartTotal: 0,
      },
    };
  },
  methods: {
    shortifyText: (text, num) => {
      const tArray = text.split(" ");
      if (tArray.length > num) {
        let newText = "";
        for (let index = 0; index < num; index++) {
          const word = tArray[index];
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
      const existingItem = items.find((item) => item.id === product.id);
      // cart logic
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalItemPrice += existingItem.price;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          totalItemPrice: product.price,
        });
      }
      this.cart.cartTotal = this.cart.cartTotal + product.price;
      // product ui logic
      const existingProduct = this.products.find((p) => p.id === product.id);
      existingProduct.instock--;
    },
    showCart: function () {
      this.isShowCart = true;
    },
    hideCart: function () {
      this.isShowCart = false;
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
  transform: scale(1.025);
  background: rgb(238, 238, 238);
  background: linear-gradient(
    0deg,
    lightgray 0%,
    rgb(238, 238, 238) 5%,
    white 100%
  );
  box-shadow: gray -5px -5px 10px;
  cursor: pointer;
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
