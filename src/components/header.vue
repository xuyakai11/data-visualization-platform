<template>
  <div>
    <div class="header-content">
      <div class="header-layout">
        <ul ref="layout">
          <li v-for="(list, index) in layoutList" :key="index" @click="layoutFun($event, index)" :class="active == index ? 'active' : ''">{{list}}</li>
        </ul>
      </div>
      <div class="header-list">
        <ul ref="map-list">
          <li draggable="true" @dragstart="drag($event, index)" v-for="(list, index) in mapList" :key="index" @click="createMapFun(list.id, index)" :class="mapActive == index ? 'mapActive' : ''">{{list.name}}</li>
        </ul>
      </div>
    </div>
    <layout-content :mapFlag="dropFlag"></layout-content>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import layoutContent from '@/components/layoutContent.vue'

@Component({
  components: {
    layoutContent
  }
})
export default class topSelect extends Vue {
  @Prop() private msg!: string
  layoutList: string[] = ['布局一', '布局二', '布局三']
  mapList: object[] = [{'name': '折线图', 'id': '1'}, {'name': '柱状图','id': '2'}, {'name':'饼图', 'id': '3'}, {'name':'散点图', 'id': '4'}, {'name': '地图', 'id': '5'}, {'name': '雷达图', 'id': '6'}, {'name': '折线图', 'id': '7'}, {'name': '盒须图', 'id': '8'}, {'name': '热力图', 'id': '9'}, {'name': '关系图', 'id': '10'}, {'name':'路径图', 'id': '11'}, {'name': '树图', 'id': '12'}, {'name': '矩形树图', 'id': '13'}]
  active: number = 0 // 设置默认选中标识
  mapActive: number = 0
  dropFlag: number = 0 // 设置拖拽的标识

  layoutFun (e: any, index: number): void { // 生成布局方法
    this.active = index
    if (index == 0) {
      this.$store.state.layoutOne = true
      this.$store.state.layoutTwo = false
      this.$store.state.layoutThree = false
    } else if (index == 1) {
      this.$store.state.layoutTwo = true
      this.$store.state.layoutOne = false
      this.$store.state.layoutThree = false
    } else if (index == 2) {
      this.$store.state.layoutThree = true
      this.$store.state.layoutOne = false
      this.$store.state.layoutTwo = false
    }
  }
  createMapFun (id: string, index: number): void { // 创建图表方法 
    this.mapActive = index
  }
  drag (e: any, index: number): void { // dragend拖拽结束方法， dragstart拖拽开始
    this.dropFlag = index
  }

  created () {
  }
  mounted () {
   /*  let layoutList:any = this.$refs.layout as HTMLDivElement
    console.log(layoutList) */
  }
}
</script>

<style lang="scss" scoped>
.header-content {
  box-shadow: 0px 1px 10px 0px rgba(50, 50, 50, 0.2);
  background: white;
  height: 68px;
  .header-list,.header-layout {
    ul {
      display: flex;
      flex-flow: row;
      align-items: stretch;
      justify-content:space-between;
      li {
        flex: 1;
        overflow: hidden;
        text-align: center;
        line-height: 68px;
      }
      li:hover {
        background-color: aquamarine;
        cursor: pointer;
      }
      li.active {
        background-color: gold;
        cursor: pointer;
      }
      li.mapActive {
        background-color: bisque;
      }
    }
    
  }
}

</style>
