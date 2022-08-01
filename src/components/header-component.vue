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
</template>

<script>
export default {
  props: ["cart", "compCartTotal","currency"],
  methods: {
    hideCart: function () {
      this.$emit("hideCart");
    },
    showCart: function () {
      this.$emit("showCart");
    },
  },
};
</script>

<style></style>
