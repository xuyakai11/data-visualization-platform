<template>
  <a-layout id="components-layout-demo-fixed-sider" style="min-height: 100vh">
    <!-- 菜单 -->
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo">朴新</div>
      <a-menu theme="dark" mode="inline" :selectedKeys="selectKeys" :inlineCollapsed="collapsed" @select="go">
        <template v-for="item in list">
          <a-menu-item v-if="!item.children" :key="item.path"> <!-- v-if="!item.children" :key="item.key" -->
            <a-icon :type="item.icon"/>
            <span class="lidiv">
                <router-link :to="item.path">{{item.name}}</router-link>
            </span>
          </a-menu-item>
          <a-sub-menu v-else >
            <span slot="title"><a-icon :type="item.icon" /><span>{{item.name}}</span></span>
            <a-menu-item v-for="child in item.children" :key="child.path">
              <router-link :to="child.path">{{child.name}}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <!-- 右侧头部及内容 -->
    <a-layout>
      <a-layout-header>
        <!-- 收缩按钮 -->
        <div class="lpc-header">
          <a-icon class="trigger" @click="toggleCollapsed" :type="collapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
          <!-- <a-avatar icon="user"></a-avatar> -->
        </div>
      </a-layout-header>
      <a-layout-content>
        <a-card title="Card title" :bordered="false"></a-card>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import list from '@/libs/menu.config'

  @Component
  export default class Home extends Vue {
    /* @Prop() private msg!: string; */
    collapsed: boolean = false
    list: Array<object> = list
    selectKeys: Array<String> = []
    menuData: Array<object> = []

    beforeCreate () {
      // this.menuData = (this as any).$router.options.routes
      this.menuData = list
      console.log(this.menuData)
    }
    created () {}

    mounted () {
      this.selectKeys = [this.$route.path];
      console.log(this.selectKeys)
    }
    toggleCollapsed ():void {
      this.collapsed = !this.collapsed
    }
    go (e: any):void {
      this.selectKeys = [this.$route.path];
    }
 }
</script>

<style scoped lang="scss">
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  color: #FFF;
  font-family: 'Times New Roman', Times, serif;
  font-size: 23px;
  text-align: center;
}
.ant-layout-sider .ant-menu-item {
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
.ant-layout-header {
  position: fixed;
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
  margin: 64px 0px 0px;
  overflow: initial;
}
</style>
