<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  margin-top: 60px;
}
body {
  background-image: url("/static/image/in_the_rain-min.png");
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}
</style>
