<template>
  <div class="calculator">
    <input type="text" v-model="calcInput">
    <div class="calc-preview">
      <p>{{ calcInput }}</p>
    </div>
  </div>
</template>


<script>
export default {
  name: '',
  data () {
    return {
      calcInput: '',
    }
  }
}
</script>

<style scoped>

</style>
