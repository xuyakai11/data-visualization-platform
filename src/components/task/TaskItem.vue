<template>
  <div>
    <draggable class="list-group" v-model="list" group="a" v-bind="dragOptions">
        <transition-group type="transition" tag="ul" name="flip-list">
          <li v-for="(el, index) in list" :key="index" class="list-group-item" @click.stop="clickFun(index)">
            <p>{{el.name}}父节点</p>
            <draggable class="list-group" v-model="el.tasks" group="a" v-bind="dragOptions">
                <transition-group type="transition" tag="ul" name="flip-list">
                  <li v-for="(list, i) in el.tasks" :key="i" class="list-group-item" >
                    <p>{{list.name}}</p>
                  </li>
                </transition-group>
            </draggable>
          </li>
        </transition-group>
    </draggable>

  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Draggable from 'vuedraggable'

   /* eslint-disable */
  @Component({
    components: { Draggable }
  })
  export default class menuManagement extends Vue {
    dragOptions: object = {
      sort: true, // 定义是否拖拽
      group: 'task', // string or array分组用的，同一组的不同的list可以相互拖拽
      scroll: true, // 拖放可以引起区域滚动
      scrollSpeed: 2, // 滚动速度
      animation: 150, // 动画时间
      ghostClass: "sortable-ghost",  // 设置拖动元素的class的占位符的类名。
      chosenClass: "sortable-chosen",  // 设置被选中的元素的class
      dragClass: "sortable-drag",  //拖动元素的class。
      dataIdAttr: 'data-id',
      
      delay: 0, // 以毫秒为单位定义排序何时开始。
      touchStartThreshold: 0, // px,在取消延迟拖动事件之前，点应该移动多少像素?
      disabled: false, // 如果设置为真，则禁用sortable。
      store: null,  // @see Store
      preventOnFilter: true, // 调用“event.preventDefault()”时触发“filter”
      // draggable: ".item",  // 指定元素中的哪些项应该是可拖动的。
      forceFallback: false,  // 忽略HTML5的DnD行为，并强制退出。（h5里有个属性也是拖动，这里是为了去掉H5拖动对这个的影响）
      fallbackOnBody: false,  // 将克隆的DOM元素添加到文档的主体中。（默认放在被拖动元素的同级）
      fallbackTolerance: 0, // 用像素指定鼠标在被视为拖拽之前应该移动的距离。
      // scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) {  }, // if you have custom scrollbar scrollFn may be used for autoscrolling
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
    }
    loading: boolean = false
    menuData: Array<object> = [
      {
        name: '1111',
        order: 1
      }, {
        name: '2222',
        order: 2
      }, {
        name: '3333',
        order: 3
      }, {
        name: '4444',
        order: 4
      }, {
        name: '5555',
        order: 5
      }, {
        name: '6666',
        order: 6
      }, {
        name: '7777',
        order: 7
      }
    ]
    list:Array<object> = [
      {
        name: "task 1",
        tasks: [
          {
            name: "task 2",
            tasks: []
          }
        ]
      },
      {
        name: "task 3",
        tasks: [
          {
            name: "task 4",
            tasks: []
          },{
            name: "task 5",
            tasks: []
          },{
            name: "task 6",
            tasks: []
          }
        ]
      },
      {
        name: "task 5",
        tasks: []
      }
    ]

    created () {
       console.log('请求菜单列表')
      // this.initDataFun()
    }

    initDataFun () { // 初始化请求数据
      (this as any).$post('custom/menuManage/menuList').then((res: any) => { // 请求表格数据
        if (res.state === 2000) {
         
          this.loading = false // 关闭加载动画
        } else {
          this.loading = false;
          (this as any).$message.error(res.message, 3); // 弹出错误message
        }
      }).catch((err: any) => {
        if (err.code === 'ECONNABORTED') {
          (this as any).$message.error('请求超时', 3); // 弹出错误message
        } else {
          (this as any).$message.error('请求失败', 3); // 弹出错误message
        }
        this.loading = false;
        // this.menuData = {};
      });
    }
    clickFun (index:number) {
      console.log(index)
    }
  }
</script>

<style lang='scss' scoped rel='stylesheet/scss'>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.sortable-drag {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  li {
    margin: 10px 0;
  }
}
.list-group-item {
  cursor: move;
  p {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
  }
}
.list-group-item i {
  cursor: pointer;
}

</style>
