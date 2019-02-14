<template>
  <div>
    <a-card class="task-item" type="inner">
      {{content}}
    </a-card>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class taskItem extends Vue {
  @Prop() private msg!: string;

 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>

</style>
