<template>
  <div class="task-group">
    <div class="task-content">
      <draggable :options="dragOptions">
        <slot></slot>
      </draggable>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Draggable from 'vuedraggable'

  @Component({
    components: { Draggable }
  })
  export default class taskGroup extends Vue {
  @Prop() private msg!: string;
   dragOptions: object = {
     sort: true,
     scroll: true,
     scrollSpeed: 2,
     animation: 150,
     ghostClass: 'dragable-ghost',
     chosenClass: 'dragable-chose',
     dragClass: 'dragable-drag'
   }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>

</style>
