<script setup>
import products from "./assets/products.json";
</script>

<template>
  <div class="container">
    <!-- Start Banner -->
    <div class="row">
      <div
        class="col-md-12 bg-dark text-light d-flex justify-content-between align-items-baseline p-3"
      >
        <a href="#" class="text-warning">Vue-Store</a>
        <div class="d-flex align-items-baseline">
          <p class="lead mb-0">[0] items in your chart with total price [0]$</p>
          <button class="btn btn-primary ms-3">show chart</button>
        </div>
      </div>
    </div>
    <!-- End Banner -->

    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mt-1">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card">
          <img :src="product.image" class="card-img-top" :alt="product.name" />
          <div class="card-body text-center">
            <h5 class="card-title">{{ shortifyText(product.name, 3) }}</h5>
            <p class="card-text">
              {{ shortifyText(product.description, 15) }}
            </p>
          </div>
          <div class="card-footer d-flex flex-column">
            <div class="row">
              <p class="badge text-primary center col">
                InStock: <span>{{ product.instock }}</span>
              </p>
              <p class="col center">Price: {{ product.price }}</p>
            </div>
            <div class="row">
              <p class="col center">
                Rating: <span>{{ product.rate }}</span>
              </p>
              <button class="col btn btn-success btn-sm" :disabled="product.instock===0">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
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

      // return text.slice(200)+"..."
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
</style>
