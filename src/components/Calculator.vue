<template>
  <div class="calculator">
    <input type="text" v-model="calcInput" @keyup.enter="calcAnswer">
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
      answer: null,
    }
  },
  methods: {
    calcAnswer: function () {
      if (this.postFix) {
        this.answer = parser.default.reducePostfix(this.postFix)
      }
    }
  },
  computed: {
    // answer: () => {
    postFix: function () {
      return parser.default.toPostfix(this.calcInput)
      },
    // }
  },

}
</script>

<style scoped>

</style>
