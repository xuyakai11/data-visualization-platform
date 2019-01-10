<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo">朴新logo</div>
      
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['3']" :inlineCollapsed="collapsed">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-sub-menu key="4" >
          <span slot="title"><a-icon type="user" /><span>User</span></span>
          <a-menu-item key="41">Tom</a-menu-item>
          <a-menu-item key="42">Bill</a-menu-item>
          <a-menu-item key="43">Alex</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header class="aaa">
        <!-- 收缩按钮 -->
        <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
        </a-button>
      </a-layout-header>
      <a-layout-content>
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
  color: #FFF;
  font-family: 'Times New Roman', Times, serif;
  font-size: 23px;
  text-align: center;
}
.ant-layout-header {
  position: fixed;
  z-index: 1;
  width: 100%;
  background: rgb(255, 255, 255);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.ant-layout-content {
    margin: 80px 16px 0px;
    overflow: initial;
}
</style>
