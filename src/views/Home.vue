<template>
  <a-layout id="components-layout-demo-fixed-sider" style="min-height: 100vh">
    <!-- 菜单 -->
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="background: #fff">
      <div class="logo">朴新</div>
      <a-menu mode="inline" :selectedKeys="selectKeys" :defaultOpenKeys="[openKeys]" :inlineCollapsed="collapsed" @select="selectMenu">
        <template v-for="item in menuData">
          <a-menu-item v-show="item.matePerMiss" v-if="!item.children" :key="item.path"> <!-- v-if="!item.children" :key="item.key" -->
            <a-icon :type="item.icon"/>
            <span class="lidiv">
                <router-link :to="item.path">{{item.name}}</router-link>
            </span>
          </a-menu-item>
          <a-sub-menu v-else :key="item.key" v-show="item.matePerMiss">
            <span slot="title"><a-icon :type="item.icon" /><span>{{item.name}}</span></span>
            <a-menu-item v-for="child in item.children" :key="child.path">
              <router-link :to="child.path">{{child.name}}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <!-- 右侧头部及内容 -->
    <a-layout :style="{ marginLeft: left + 'px', transition: 'all .2s'}">
      <a-layout-header>
        <!-- 收缩按钮 -->
        <div class="lpc-header">
          <a-icon class="trigger" @click="toggleCollapsed" :type="collapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
          <!-- <a-avatar icon="user"></a-avatar> -->
        </div>
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        朴新前端研发团队 ©2019
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'
  import list from '@/libs/menu.config'

  @Component
  export default class Home extends Vue {
    /* @Prop() private msg!: string; */
    @State openKeys: any
    @Mutation changeOpenKeys: any
    collapsed: boolean = false // 控制收缩菜单栏
    left: string = '200'
    menuData: Array<object> = list
    selectKeys: Array<String> = []

    created () {
      (this as any).changeOpenKeys();
      this.openKeys;
    }

    mounted () {
      this.selectKeys = [this.$route.path];
    }
    toggleCollapsed ():void {
      this.collapsed = !this.collapsed;
      this.collapsed ? this.left = '80' : this.left = '200'; // 控制右侧模块margin-left的值 
    }
    selectMenu (e: any):void { // 将点击选中的实时替换
      this.selectKeys = [e.key];
      (this as any).changeOpenKeys({ openKeys: e.key })
    }
    /* go (item: any):void {
      (this as any).changeOpenKeys({ openKeys: item.key })
    } */
 }
</script>

<style scoped lang="scss">
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(123, 218, 222, 0.2);
  margin: 16px;
  color: #000;
  font-family: 'Times New Roman', Times, serif;
  font-size: 23px;
  text-align: center;
}
.ant-layout-sider{
  position: fixed;
  min-height: 100vh;
  left: 0;
  .ant-menu-item {
    padding: 0;
    .lidiv {
      display: inline-block;
      width: 100%;
      a {
        display: inline-block;
        width: 100%;
        padding: 0;
      }
    }
  }
}
.ant-layout-header {
  /* position: fixed; */
  z-index: 1;
  width: 100%;
  padding: 0;
  background: rgb(255, 255, 255);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  .lpc-header {
    display: flex;
    .anticon {
      display: inline-block;
      font-size: 20px;
      cursor: pointer;
      vertical-align: baseline;
      transition: color .3s;
      padding: 0 14px;
      line-height: 64px;
    }
  }
}
.ant-layout-content {
  /* margin: 64px 0px 0px; */
  overflow: initial;
}
</style>
