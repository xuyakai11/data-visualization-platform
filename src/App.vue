<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background: #f0f2f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
/* #nav {
  padding: 30px;
  text-align: right;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
} */
</style>
