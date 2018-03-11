
var parser = {
  test: function (x, y) {
    console.log("x: " + x + " y: " + y)
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
        // console.log(rawInput[i],Object.keys(prec))
        if (Number.isInteger(parseInt(rawInput[i]))) {
          output.push(rawInput[i])

        } 
          
        else if (rawInput[i] == '(') {
          stack.push(rawInput[i])
        }
        else if (rawInput[i] == ')') {

          var stack_copy = stack
          var topToken = stack_copy.pop()
          var inside_count = 0
          while (topToken != '(' && stack_copy) {
            inside_count++
            topToken = stack_copy.pop()
            console.log('stack_copy reducing')
          }
          if (inside_count) {
            while (inside_count > 0) {
              inside_count--
              topToken = stack_copy.pop()
              output.push(topToken)
              console.log("real stack reducing.")
            }
          }
          else {
            return null
          }
        }

        else {
          while (stack && prec[stack[0]] > prec[rawInput[i]]) {
            output.push(stack.pop())
          }
          stack.push(rawInput[i])
        }

      }
      while (stack.length > 0) {
        output.push(stack.pop())
      }
      console.log(output)
      return output
    }
    else {
      return null
    }
  },
  reducePostfix: (postfix) => {
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
      if (Number.isInteger(parseInt(postfix[i]))) {
        postfix[i] = parseInt(postfix[i])
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
    return postfix[0]
  }
}

export default parser