const list: Array <object> = [{
  key: '1',
  name: '数据源管理',
  icon: 'user',
  path: '/dataOriginManagement'
}, {
  key: '2',
  name: '报表管理',
  icon: 'area-chart',
  children: [{
    key: '2.1',
    name: '报表制作',
    path: '/statementMake'
  }]
}, {
  key: '3',
  name: '仪表盘制作',
  icon: 'pie-chart',
  path: '/instrumentPanelMake'
}]
export default list
