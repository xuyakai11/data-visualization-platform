<template>
  <div>
      <div class="menu-leftTree">
        <a-tree
            class="draggable-tree"
            :treeData="dataSourceTree"
            draggable
            :autoExpandParent="autoExpandParent"
            :expandedKeys="expandedKeys"
            :selectedKeys="selectedKeys"
            @expand="onExpand"
            @select="onSelect"
            @drop="onDrop"
        >
        </a-tree> 
      </div>
  </div>
</template>

<script lang='ts'>
  import  { Component, Prop, Vue, Emit } from 'vue-property-decorator'
   /* eslint-disable */
  interface treeObject {
    title: string;
    key: string;
    [propName: string]: any; // 可定义任意属性
  }
  @Component({
  })
  export default class leftTree extends Vue {   
    @Prop({}) dataSourceTree!:any // 从父组件接收树数据  这里的感叹号是对属性的非空断言；（null和undefined）的判断
    spinning: boolean = true // 进入页面缓冲动画
    loading: boolean = false
    expandedKeys: Array<string|number> = [0]
    autoExpandParent:boolean =  true
    selectedKeys: Array<string|number> = [0]
    @Emit('treeDblData') treeDblDataFun (e: number) {};
    onSelect (e:any, node:any) {
      if (e.length) {
        this.selectedKeys = [+e.toString()]
        let fieldId:number = node.id;
        this.treeDblDataFun(+e.toString())
      }
    }
    onExpand (expandedKeys:any) { // 展开折叠节点
        this.expandedKeys = expandedKeys
    }
    onDrop (info:any) {
        const dropKey = info.node.eventKey  //向下拖拽，下面那个元素的id
        const dragKey = info.dragNode.eventKey  // 当前的id
        const parentKey = info.dragNode.$parent.eventKey // 拖拽之前的父节点id
        const afterparentKey = info.node.$parent.eventKey // 拖拽之前的父节点id
        const dropPos = info.node.pos.split('-')
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
        const loop = (data:any, key:string, callback:any) => {
            data.forEach((item:any, index:number, arr:Array<object>) => {
                if (item.key === key) {
                    return callback(item, index, arr)
                }
                if (item.children) {
                    return loop(item.children, key, callback)
                }
            })
        }
        const data = this.dataSourceTree;
        // Find dragObject 是拖拽的这个元素
        let dragObj:any 
        loop(data, dragKey, (item:object, index:number, arr:Array<object>) => {
            arr.splice(index, 1)
            dragObj = item
        })
        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, (item:any) => {
                item.children = item.children || [];
                // where to insert 示例添加到尾部，可以是随意位置
                item.children.push(dragObj);
            });
        } else if (
            (info.node.children || []).length > 0 // Has children
            && info.node.expanded // Is expanded
            && dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, (item:any) => {
            item.children = item.children || [];
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.unshift(dragObj);
            });
        } else {
            let ar:any;
            let i:any;
            loop(data, dropKey, (item:object, index:number, arr:Array<object>) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        this.dataSourceTree = data;
        const sendmenuId :Array<number|string> = [];
        loop(this.dataSourceTree,dragKey,(item:object, index:number, arr:Array<object>) => {
            arr.forEach((child:any, key:number, val:Array<object>) => {
               sendmenuId.push(child.id); 
            })
        })
        this.changeMenu(sendmenuId, afterparentKey); // 请求拖拽接口
    }
    changeMenu (sendmenuId:any, afterparentKey:any) {
        const menuId = sendmenuId.join(",");
        (this as any).$post('custom/menuManage/changeMenu', {menuId:menuId, parentId:afterparentKey}).then((res: any) => {
            if (res.state === 2000) {
              (this as any).$message.success(res.message, 3);            
            } else {
              (this as any).$message.error(res.message, 3);
            }
        }).catch((err:any) => {
            if (err.code === 'ECONNABORTED') {
              (this as any).$message.error('请求超时', 3); // 弹出错误message
            } else {
              (this as any).$message.error('请求失败', 3)
            }
        });
    }
  }
</script>

<style lang='scss' rel='stylesheet/scss'>
.ant-tree{
    li{
        .ant-tree-node-content-wrapper{
            width:80%;
            height:34px;
            line-height: 32px !important;
            &.ant-tree-node-selected{
                color:#1890ff;
            }
        }        
    }
}
</style>
