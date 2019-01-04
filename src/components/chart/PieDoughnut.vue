<template>
  <div>
    
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class XXX extends Vue {
   @Prop() private msg!: string;
    created () {

    }
 }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>

</style>
