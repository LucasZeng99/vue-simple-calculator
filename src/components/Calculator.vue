<template>
  <div class="calculator">
    <input type="text" v-model="input" @keyup.enter="calcAnswer">

    <div class="calc-preview">
      <p class="formatted-input">formatted string: {{parsedInput}}</p>
      <div class="answer"><p>answer:  </p>
        <p id="answer" v-if="answer">{{ answer }}</p>
        </div>
      <p class="postfix">postfixed string: {{ postFixString }}</p>
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
    postFixString: function () {
      var postfix = this.postFix
      if (postfix) return postfix.toString()
      else return null
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
  margin-top: 200px;
  width: 80%;
  border: 2px solid violet;
}
input:focus {
  outline: none;
}
div.calculator {
  max-width: 700px;
  margin: 0 auto;
}

div.calc-preview {
  margin-top: 40px;
  font-size: 22px;
  padding: 15px;
  display: block;
  color: rgb(82, 41, 36);
  background-color: rgba(247, 218, 194, 0.849);
}

p{
  display: inline-block;
  margin: 20px 0;
}

.answer {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  transition: 1s;
}

p#answer {
  color: #a84bff;
  animation-duration: 1s;
  animation-name: slide;
}
@keyframes slide {
  0% {
    opacity: 0;
    position: relative;
    top: 20px;
  }

  100% {
    opacity: 100%;
    position: relative;
    top: 0;
  }
}

p.formatted-input {
  position: absolute;
  top: 0%;
  left: 0%;
  padding: 10px;
  background-color: rgba(194, 175, 160, 0.486);
}

p.postfix {
  display: block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  word-wrap: break-word;
}

</style>
