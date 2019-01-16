const list: Array <object> = [{
  key: '1',
  name: '数据源管理',
  icon: 'user',
  path: '/dataOriginManagement',
  matePerMiss: true
}, {
  key: '2',
  name: '报表管理',
  icon: 'area-chart',
  path: '/statementManagement',
  matePerMiss: true
}, {
  key: '3',
  name: '仪表盘制作',
  icon: 'pie-chart',
  path: '/instrumentPanelMake',
  matePerMiss: true,
  children: [{
    key: '3.1',
    name: '测试子菜单回显',
    path: '/APIList'
  }]
}, {
  key: '4',
  name: '报表制作',
  icon: 'bar-chart',
  path: '/statementMake',
  matePerMiss: false // （可不设置菜单）报表管理 - 报表制作不在菜单中显示
}, {
  key: '5',
  name: '模型管理',
  icon: 'radar-chart',
  path: '/modelManagement',
  matePerMiss: true
}, {
  key: '6',
  name: '字段管理',
  icon: 'bar-chart',
  path: '/fieldManagement',
  matePerMiss: false // （可不设置菜单）模型管理 - 字段管理不在菜单中显示
}]
export default list
