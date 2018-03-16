<template>
  <div id="app">
    <router-view/>
    <div class="footer">
        <a href="https://github.com/LucasZeng99/vue-simple-calculator" target="_blank">Visit on Github</a>
    </div>
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

div.footer {
  position: absolute;
  bottom: 20px;
  right: 40px;
  margin-bottom: 2px;
}

a {
  display: inline-block;
  padding:10px;
  margin: 4px;
  text-decoration: none;
  color: rgb(220, 45, 255);
  font-size: 24px;
  transition: 0.6s;
  margin-bottom: 2px;
}
a:hover {
  margin-bottom: 0;
  border-bottom: 2px solid #ff7525; 
  animation-duration: 0.5s;
  animation-name: jump;
}

@keyframes jump {
  0% {
    position: relative;
    bottom: 0px;
  }
  30% {
    position: relative;
    bottom: 12px;
  }
  60% {
    position: relative;
    bottom: 0px;
  }
  80% {
    position: relative;
    bottom: 3px;
  }
  100% {
    position: relative;
    bottom: 0px;
  }
}



</style>
