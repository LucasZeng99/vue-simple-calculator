import { isNumber } from "util";

// 不是topostfix 的问题，问题在于postfix不健全的时候reduce要崩溃。
// 目标： 等待健全的postfix.
var parser = {
    /**
   * parse all multiple digits.
   * @param {string} rawInput
   * @returns {string}
   */
  parseRawInput: (rawInput) => {
    var i = 0
    var output = []
    while (i < rawInput.length) {
      var j = 1
      var num = [rawInput[i]]
      // console.log(i + j < rawInput.length,!isNaN(parseInt(rawInput[i])), !isNaN(parseInt(rawInput[i+j])))
      while (i + j < rawInput.length && !isNaN(parseInt(rawInput[i])) && !isNaN(parseInt(rawInput[i+j]))) {
        num = num.concat(rawInput[i+j])
        j++
      }
      output.push(num.join(''))
      i = i + j 
    } 
    return output
  },

  toPostfix: (rawInput) => {
    var stack = []
    var prec = {
      '*': 3,
      '/': 3,
      '-': 2,
      '+': 2,
      '^': 4,
      '(': 1,
      ')': 1,
    }
    var output = []

    if (rawInput != null || rawInput != undefined) {

      for (let i in rawInput) {
        console.log(rawInput[i])
        if (Number.isInteger(parseInt(rawInput[i]))) {
          output.push(rawInput[i])
        } 
        else if (rawInput[i] == '(') {
          stack.push(rawInput[i])
        }
        else if (rawInput[i] == ')') {
          var topToken = stack.pop()
          for (let i = stack.length; i > 0; i--) {
            if (topToken != '(') {
              output.push(topToken)
              topToken = stack.pop()
              continue
            }
            else {
              break
            }
          }
        }
        else {
          while (stack && prec[stack[stack.length - 1]] >= prec[rawInput[i]]) {
            output.push(stack.pop())
          }
          stack.push(rawInput[i])
        }

      }
      while (stack && stack.length > 0) {
        output.push(stack.pop())
      }
      return output
    }
    else {
      return null
    }
  },
  reducePostfix: (rawPostfix) => {
    var postfix = rawPostfix
    var prec = {
      '*': 3,
      '/': 3,
      '-': 2,
      '+': 2,
      '^': 4,
      '(': 1,
      ')': 1,
    }
    for (let i in postfix) {
      if (!isNaN(parseInt(postfix[i]))) {
        postfix[i] = parseInt(postfix[i])
      }
      else if (!Object.keys(prec).includes(postfix[i])) {
        return "your input might be wrong."
      }
    }
    while (postfix.length > 1) {
      for (let i in postfix) {
        if (postfix[i] in prec) {

          if (postfix[i] == '+') {
            postfix[i-2] += postfix[i-1]
            postfix.splice(i-1, 2)
            break
          }
          else if (postfix[i] == '-'){
            postfix[i-2] -= postfix[i-1]
            postfix.splice(i-1, 2)
            break
          }
          else if (postfix[i] == '^'){
            postfix[i-2] = Math.pow(postfix[i-2], postfix[i-1])
            postfix.splice(i-1, 2)
            break
          }
          else if (postfix[i] == '*'){
            postfix[i-2] *= postfix[i-1]
            postfix.splice(i-1, 2)
            break
          }
          else if (postfix[i] == '/'){
            postfix[i-2] /= postfix[i-1]
            postfix.splice(i-1, 2)
            break
          }
        }
      }
    }
    if (!(postfix.length == 1) || !isNumber(postfix[0])) {
      return "your input might be wrong."
    }
    return postfix[0]
  },
    

}

export default parser