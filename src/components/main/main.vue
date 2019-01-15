<template>
  <div>
    
  </div>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component
 export default class main extends Vue {
   @Prop() private msg!: string;
    created () {

    }
 }
</script>

<style scoped lang="scss">

</style>
