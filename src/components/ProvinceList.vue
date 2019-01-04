<template>
  <div class="main">
    <MapCity :datas=option />
    <div>
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
    </div>
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
  option: any = false;
  list: Array<string> = ['河南/郑州市', '北京/北京']
  current: number = 0
  
  makeUpMap (): void {
    const nowV: any = {
      w: this.w + 'px',
      h: this.h + 'px',
      name: this.list[this.current]
    }
    // 预览的时候做验重判断
    const flag: boolean = Object.keys(nowV).some((v: string) => {
      return nowV[v] !== this.option[v]
    })
    if (flag) {
      this.option = nowV
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  display: flex;
  padding: 30px;
  justify-content: center;
  ul{
    display:flex;
    margin-bottom: 30px;
    li {
      flex-basis: 100px;
      // flex-grow: 1;
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
