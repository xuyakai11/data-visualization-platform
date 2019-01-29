<template>
  <div>
    <div class="leftMenu">
      <header>
        <a-auto-complete style="width: 200px;">
          <a-input-search placeholder="input search menu"/>
        </a-auto-complete>
        <!-- <div class="certain-category-search-wrapper" style="width:250px">
          <a-auto-complete
            class="certain-category-search"
            dropdownClassName="certain-category-search-dropdown"
            :dropdownMatchSelectWidth="false"
            :dropdownStyle="{ width: '300px' }"
            size="large"
            style="width:100%"
            placeholder="input here"
            optionLabelProp="value"
          >
            <template slot="dataSource">
              <a-select-opt-group
                v-for="group in dataSource"
                :key="group.title"
              >
                <span slot="label">{{group.title}}</span>
                <a-select-option v-for="opt in group.children" :key="opt.title">
                  {{opt.title}}
                  <span class="certain-search-item-count">{{opt.count}}</span>
                </a-select-option>
              </a-select-opt-group>
            </template>
            <a-input>
              <a-icon slot="suffix" type="search" class="certain-category-icon"></a-icon>
            </a-input>
          </a-auto-complete>
        </div> -->
      </header>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class step2LeftMenu extends Vue {
    @Prop() private msg!: string;
    dataSource:Array<object> = [{
      title: '话题',
      children: [{
        title: 'AntDesign',
        count: 10000,
      }, {
        title: 'AntDesign UI',
        count: 10600,
      }],
    }, {
      title: '问题',
      children: [{
        title: 'AntDesign UI 有多好',
        count: 60100,
      }, {
        title: 'AntDesign 是啥',
        count: 30010,
      }],
    }, {
      title: '文章',
      children: [{
        title: 'AntDesign 是一个设计语言',
        count: 100000,
      }],
    }];

    created () {

    }

    onSearch (val:string):void {
      
    }
    onSelect ():void {

    }
 }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
  .leftMenu {
    width: 250px;
    header {
      background-color: #f9f7f7;
      padding: 5px 10px;
    }
  }
</style>
