<template>
  <div>
    
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class roleTab extends Vue {
   @Prop() private !: string;
   created () {

   }
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>

</style>
