<template>
  <div>
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" style="background: #fff">
      <div class="logo">朴新</div>
      <a-menu mode="inline" :selectedKeys="selectKeys" :defaultOpenKeys="[openKeys]" :inlineCollapsed="collapsed" @select="selectMenu">
        <template v-for="item in menuData">
          <a-menu-item v-if="item.children.length === 0" :key="item.path"> 
            <a-icon :type="item.icon"/>
            <span class="lidiv">
                <router-link :to="item.path">{{item.name}}</router-link>
            </span>
          </a-menu-item>
          <a-sub-menu v-else :key="item.key">
            <span slot="title"><a-icon :type="item.icon" /><span>{{item.name}}</span></span>
            <a-menu-item v-for="child in item.children" :key="child.path">
              <router-link :to="child.path">{{child.name}}</router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'

  @Component
export default class menuList extends Vue {
  @Prop() 
  collapsed: boolean = false;
  selectKeys:Array<String> = [];

  @State openKeys: any
  @Mutation changeOpenKeys: any
  @State('menu') menuData: any
  @Mutation menuList: any

  created () {
    // 请求菜单
    // if (!this.menuData) {
      (this as any).$post('custom/GlobalApi/getMenu').then((res: any) => {
        if (res.state === 2000) {
          this.menuList(res.data);
          // this.menuData = res.data;
        } else {
          (this as any).$message.error(res.message, 3);
        }
      }).catch((err:any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        }
      });
    // }
  }
  mounted () {
    this.selectKeys = [(this as any).$route.path];
  }
  selectMenu (e: any):void { // 将点击选中的实时替换
    this.selectKeys = [e.key];
    (this as any).changeOpenKeys({ openKeys: e.key })
  }
}
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
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
</style>
