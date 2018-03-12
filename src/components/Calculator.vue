<template>
  <div class="calculator">
    <input type="text" v-model="input" @keyup.enter="calcAnswer">

    <div class="calc-preview">
      <p class="parse-input">Postfix string: {{parsedInput}}</p>
      <p class="answer">{{ answer }}</p>
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
  display: block;
  padding: 10px;
  font-size: 25px;
  margin: 0 auto;
  margin-top: 100px;
  width: 80%;
  border: 2px solid violet;
}
input:focus {
  outline: none;
}
div.calculator {
  max-width: 600px;
  margin: 0 auto;
}

div.calc-preview {
  font-size: 22px;
  display: block;
}

p.answer {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
}

p.parse-input {
  position: absolute;
  top: 0%;
  left: 0%;
}


</style>
