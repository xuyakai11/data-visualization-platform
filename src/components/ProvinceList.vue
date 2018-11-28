<template>
  <div class="main">
    <ul>
      <li 
        :class="{active: index === current}" 
        v-for="(item,index) in list" 
        :key="item.id"
        @click="current = index"
      >
        {{item}}
      </li>
    </ul>
    宽(px)：<input type="text" v-model="w">
    高(px)：<input type="text" v-model="h">
    <button class="btn" @click="makeUpMap">预览</button>
    <MapCity :datas=option />
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MapCity from '@/components/chart/MapCity.vue'

@Component({
  components: {
    MapCity,
  }
  })
export default class ProvinceList extends Vue {
  w: number = 500
  h: number = 300
  option: any = {}
  list: Array<string> = ['郑州', '北京']
  current: number = 0
  makeUpMap (): void {
    this.option = {
      w: this.w,
      h: this.h,
      name: this.list[this.current]
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  padding: 30px;
  ul{
    display:flex;
    margin-bottom: 30px;
    li {
      flex-basis: 50px;
      cursor: pointer;
    }
  }
  .active {
    color:#42b983
  }
  input{
    display: block;
    margin-bottom: 15px;
    padding: 4px 8px;
    color: #555;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
}
</style>
