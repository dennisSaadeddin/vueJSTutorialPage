Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    details: {

    }
  },
  template: `
  <div class="product">
    <div class="product-image">
        <img v-bind:src="image">
        <a :href="lnk">Follow me</a>
    </div>
    <div class="product-info">
      <h1>{{ product }}</h1>
      <p>{{ descr }}</p>
      <p v-if="inventory > 10">In stock</p>
      <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
      <p v-else :class="{ outOfStock: !inStock }">Out of stock</p>
      <p>{{ printOnSale }}</p>
      <p> Shipping: {{ shipping }}</p>

      <product-details :details="details"></product-details>

      <div v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)">
      </div>

      <div>
        <p>Sizes:</p>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>
      </div>

      <button v-on:click="addToCart"
              :disabled="!inStock"
              :class="{disabledButton: !inStock}"
              >
      Add to Cart
      </button>
      <button v-on:click="removeFromCart">Remove from Cart</button>

    </div>
  </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      descr: 'Warm, fuzzy winter socks.',
      lnk: 'https://www.google.com',
      selectedVariant: 0,
      inventory: 10,
      onSale: true,
      details:["80% cotton", "20% polyester", "Gender-neutral"],
      sizes: [40,41,42,43,44,45],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: 'vmSocks-green-onWhite.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: 'vmSocks-blue-onWhite.jpg',
          variantQuantity: 0
        }]
    }
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart');
    },

    removeFromCart () {
      if (this.cart == 0) {
        return;
      }
      else {
        this.cart -= 1;
      }
    },

    updateProduct: function (index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  // these are cached, so it's better to use a computed property
  // than a method, because the computed property will no be run
  // multiple times, unless its values have changed
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    printOnSale() {
      if(this.onSale) {
        return this.brand + " " + this.product + " is on Sale!";
      }
      else {
        return this.brand + " " + this.product + " is not on Sale.";
      }
    },
    shipping() {
      if(this.premium) {
        return "Free";
      }
      else {
        return 2.99;
      }
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: 0
  }
})
