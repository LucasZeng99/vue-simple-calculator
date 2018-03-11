<template>
  <div class="calculator">
    <input type="text" v-model="calcInput">
    <div class="calc-preview">
      <p>{{ calcInput }}</p>
      <p>{{ answer }}</p>
      <p>{{ postFix }}</p>
    </div>
  </div>
</template>


<script>
var parser = require('./lib/parser')
export default {
  name: '',
  data () {
    return {
      calcInput: '',
    }
  },

  methods: {
  },
  // watch: {
  //   calcInput: (calcInput) => {
  //     this.postFix = parser.default.toPostfix(calcInput, () => {
  //     })
  //     if (this.postFix) {
  //       this.answer = parser.default.reducePostfix(this.postFix)
  //     }
  //   }
  // },
  computed: {
    // answer: () => {
    postFix: function () {
      return parser.default.toPostfix(this.calcInput)
      },
    answer: function () { 
      if (this.postFix) {
        return parser.default.reducePostfix(this.postFix)
      }
    }
    // }
  },

}
</script>

<style scoped>

</style>
