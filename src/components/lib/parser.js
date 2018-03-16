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
    let i = 0
    let output = []
    while (i < rawInput.length) {
      let j = 1
      let num = [rawInput[i]]
      while (i + j < rawInput.length && !isNaN(parseInt(rawInput[i])) && !isNaN(parseInt(rawInput[i+j]))) {
        num = num.concat(rawInput[i+j])
        j++
      }
      output.push(num.join(''))
      i = i + j 
    } 
    return output
  },
  /**
   * @param {string} rawInput
   * @returns {string | Error}
   */
  toPostfix(rawInput) {
    let stack = []
    let prec = {
      '.': 4,
      '*': 3,
      '/': 3,
      '-': 2,
      '+': 2,
      '^': 4,
      '(': 1,
      ')': 1,
    }
    let output = []

    if (rawInput != null || rawInput != undefined) {

      for (let i in rawInput) {
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

/**
 * if a dot exists between numbers, concate them.
 * @param {string} rawPostfix
 * @returns {string}
 */
  concatenDecimals(parsedPostfix) {
    let postfix = parsedPostfix
    for (let i in postfix) {
      if (postfix[i] === '.') {
        if (i > 0 &&
           i < postfix.length &&
           !isNaN(parseInt(postfix[i-1])) && 
           !isNaN(parseInt(postfix[i-2]))) {
             // if there is a point between numbers
            postfix[i] = postfix[i-2].concat('.', postfix[i-1])
            postfix.splice(i-2, 2)
           }
      }
    }
    return postfix
  },
  /**
   * @param {string} rawPostfix formatted postfix
   * @returns {Number | string} calculated answer
   * 
   * need more robust improvement.
   */
  reducePostfix(rawPostfix) {
    let postfix = this.concatenDecimals(rawPostfix)
    let prec = {
      '.': 5,
      '*': 3,
      '/': 3,
      '-': 2,
      '+': 2,
      '^': 4,
    }
    for (let i in postfix) {
      if (!isNaN(parseFloat(postfix[i]))) {
        postfix[i] = parseFloat(postfix[i])
      }
      else if (!Object.keys(prec).includes(postfix[i])) {
        return "your input might be wrong. (~)_(~) =33"
      }
    }
    let last_fix = []
    while (postfix.length > 1) {
      last_fix = postfix.slice()
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
      // if the thing doesn't change, whatever must be wrong.
      if (last_fix.length==postfix.length && last_fix.every((v,i)=> v === postfix[i])) {
        return "your input might be wrong.  (@ v  @) ==33"
      }
    }
    if (!(postfix.length == 1) || !isNumber(postfix[0])) {
      return "your input might be wrong. (^ v ^!) =33"
    }
    return postfix[0]
  },

}

export default parser