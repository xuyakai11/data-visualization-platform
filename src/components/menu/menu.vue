<template>
  <div>
    <a-layout-sider :trigger="null" collapsible :collapsed="collapsed"
      breakpoint="lg"
      collapsedWidth="80"
      @breakpoint="onBreakpoint"
      :class="theme === 'light' ? 'lightClass' : 'barkClass'"
    > <!-- :style="{ background: (theme === 'light' ? 'white' : '#001529') }" -->
      <div class="logo">朴新</div>
      <a-menu mode="inline" :theme="theme" :selectedKeys="selectKeys" :defaultOpenKeys="[openKeys]" :inlineCollapsed="collapsed" @select="selectMenu">
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
      <div class="setting" v-if="!setting">
        <a-switch
          defaultChecked
          @change="changeTheme"
          checkedChildren="light"
          unCheckedChildren="dark"
        />
      </div>
    </a-layout-sider>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
  import { State, Mutation } from 'vuex-class'

  @Component({
    components: {}
  })
export default class menuList extends Vue {
  // collapsed: boolean = false;
  @Prop({
      type: Boolean, // 父组件传递给子组件的数据类型
      required: false, // 是否必填
      default: false // 默认值， 如果传入的是 Object，则要 default: ()=>({}) 参数为函数
  }) collapsed !: boolean
  selectKeys:Array<String> = []
  // theme:string = (localStorage as any).getItem('theme') || 'light'
  setting:boolean = this.collapsed

  @State openKeys: any
  @Mutation changeOpenKeys: any
  @State('menu') menuData: any
  @Mutation menuList: any
  @Emit('menuChildChange') send (collapse: boolean) {}

  @Mutation themeMutation: any
  @State('theme') theme: any

  @Watch('collapsed', { deep: true, immediate: true }) collapsedWatch (newVal:boolean, oldVal:boolean) {
    if (newVal !== oldVal) {
       this.setting = this.collapsed
    }
  }
  created () {
    console.log(this.setting);
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
  onBreakpoint (broken:boolean):void { // 触发响应式布局断点时的回调
    this.send(broken)
  }
  changeTheme (check:boolean):void { // 切换主题
    // this.theme = check ? 'light' : 'dark'
    this.themeMutation(check)
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
  .ant-layout-sider-children {
    position: relative;
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
    .setting { // 配置项样式
      position: absolute;
      text-align: center;
      width: 100%;
      bottom: 20px;
      left: 0;
    }
  }
}
// 主题颜色切换样式
.lightClass {
  background: white;
}
.barkClass {
  background: #001529;
  .logo {
    color: white!important;
  }
}
</style>
