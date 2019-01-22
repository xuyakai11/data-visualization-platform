<template>
  <a-layout id="components-layout-demo-fixed-sider" style="min-height: 100vh">
    <!-- 菜单 -->
    <menu-nav :collapsed="collapsed" :selectKeys="selectKeys"></menu-nav>
    <!-- 右侧头部及内容 -->
    <a-layout :style="{ marginLeft: left + 'px', transition: 'all .2s'}">
      <a-layout-header>
        <!-- 收缩按钮 -->
        <div class="lpc-header">
          <a-icon class="triggMenu" @click="toggleCollapsed" :type="collapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
          <div class="user-icon">
            <a-avatar :src="userSrc"></a-avatar>
            <!-- <a-icon type="logout"/>
            <label :text="userName"></label> -->
            <a-dropdown :trigger="['click']">
              <a href="javascript:void(0);" class="ant-dropdown-link">{{ userName }}</a>
              <a-menu slot="overlay" @click="logout">
                <a-menu-item>
                  <a href="javascript:;" key="1">退出</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
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
  import menuNav from '@/components/menu/menu.vue'

  @Component({
    components: { menuNav }
  })
  export default class Home extends Vue {
    /* @Prop() private msg!: string; */
    
    collapsed: boolean = false // 控制收缩菜单栏
    left: string = '200'
    // menuData: Array<object> = []
    selectKeys: Array<String> = []
    userSrc:string = ""
    userName:string = ""

    created () {
      // this.menuData = list;
    }

    mounted () {
      // this.selectKeys = [this.$route.path];
      // 请求用户信息
      (this as any).$post('custom/GlobalApi/getUserInfo').then((res: any) => {
        if (res.state === 2000) {
          this.userSrc = res.data.logo
          this.userName = res.data.userName
        } else {
          (this as any).$message.error(res.message, 3);
        }
      });
    }
    toggleCollapsed ():void {
      this.collapsed = !this.collapsed;
      this.collapsed ? this.left = '80' : this.left = '200'; // 控制右侧模块margin-left的值 
    }
    /* selectMenu (e: any):void { // 将点击选中的实时替换
      this.selectKeys = [e.key];
      (this as any).changeOpenKeys({ openKeys: e.key })
    } */
    logout ():void {
      (this as any).$post('/custom/GlobalApi/logOut').then((res: any) => {
        if (res.state === 2000) {
          window.location.replace(`${res.data.redirectUrl}`);
          (this as any).$message.success(res.message, 3);
        } else {
          (this as any).$message.error(res.message, 3);
        }
      });
    }
    /* go (item: any):void {
      (this as any).changeOpenKeys({ openKeys: item.key })
    } */
 }
</script>

<style scoped lang="scss">

.ant-layout-header {
  /* position: fixed; */
  z-index: 1;
  width: 100%;
  padding: 0;
  background: rgb(255, 255, 255);
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  .lpc-header {
    display: flex;
    .triggMenu {
      cursor: pointer;
      display: inline-block;
      font-size: 20px;
      vertical-align: baseline;
      transition: color .3s;
      padding: 0 14px;
      line-height: 64px;
      flex: 1;
      text-align: left;
    }
    .user-icon {
      flex: 0 0 200px;
      cursor: pointer;
      .ant-avatar {
        margin-right: 20px;
      }
    }
  }
}
.ant-layout-content {
  /* margin: 64px 0px 0px; */
  overflow: initial;
}
</style>
