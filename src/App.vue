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
            class="text-warning text-decoration-none"
            @click.prevent="hideCart"
            >Vue-Store</a
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
                currency(cart.cartTotal)
              "
            >
              show chart
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- End Banner -->

  <!-- Start Products -->
  <div class="container">
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                  d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"
                />
              </svg>
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
