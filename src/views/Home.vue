<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <v-header></v-header>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import header from '@/components/header.vue'
import layoutContent from '@/components/layoutContent.vue'

@Component({
  components: {
    HelloWorld,
    'v-header': header,
    layoutContent
  }
})

export default class Home extends Vue {}
</script>
<style lang="scss" scoped>

</style>
