<template>
  <div class="calculator">
    <input type="text" v-model="input" @keyup.enter="calcAnswer">

    <div class="calc-preview">
      <p class="parse-input">parsedInput: {{parsedInput}}</p>
      <h3 class="answer">{{ answer }}</h3>
    </div>
  </div>
</template>


<script>
var parser = require('./lib/parser').default

export default {
  name: '',
  data () {
    return {
      input: '',
      answer: null,
    }
  },
  methods: {
    calcAnswer: function () {
      if (this.postFix) {
        this.answer = parser.reducePostfix(this.postFix)
      }
    }
  },
  watch: {
    input: function() {
      this.answer = null
    }
  },
  computed: {
    parsedInput: function () {
      return parser.parseRawInput(this.input)
    },
    postFix: function () {
      this.answer = null
      return parser.toPostfix(parser.parseRawInput(this.input))
      },
  },

}
</script>

<style scoped>
input {
  padding: 6px;
  margin: 0 auto;
}
div.calculator {
  max-width: 600px;
  margin: 0 auto;
}

div.calc-preview {
  position: absolute;
  left: 5%;
  top: 1%;
}

</style>
