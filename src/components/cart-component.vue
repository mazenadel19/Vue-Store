<template>
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
</template>

<script>
export default {
  props: [
    "cart",
    "compFinalPrice",
    "compTaxes",
    "compCartTotal",
    "currency",
    "addToCart",
    "removeFromCart",
    "validator",
  ],
};
</script>

<style></style>
