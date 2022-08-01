<template>
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
            Price:<span class="font_20"> {{ currency(product.price) }}</span>
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
</template>

<script>
export default {
  props: ["products", "shortifyText", "currency", "addToCart"],
};
</script>

<style></style>
