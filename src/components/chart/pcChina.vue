<template>
  <div class="pcChina" ref="echartGeo"> <!-- 中国地图 -->
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import echarts from 'echarts'
  import 'echarts/lib/chart/map';
  import 'echarts/map/js/china.js';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/tooltip'

  @Component({
    components: {}
  })
  export default class pcChina extends Vue {
    @Prop()private datas!: any
    // baseUrl: string = process.env.BASE_URL
    geoCoordMap:any = {
      '海门': [121.15, 31.89],
      '鄂尔多斯': [109.781327, 39.608266],
      '招远': [120.38, 37.35],
      '舟山': [122.207216, 29.985295],
      '齐齐哈尔': [123.97, 47.33],
      '盐城': [120.13, 33.38],
      '赤峰': [118.87, 42.28],
      '青岛': [120.33, 36.07],
      '乳山': [121.52, 36.89],
      '金昌': [102.188043, 38.520089],
      '泉州': [118.58, 24.93],
      '莱西': [120.53, 36.86],
      '日照': [119.46, 35.42],
      '胶南': [119.97, 35.88],
      '南通': [121.05, 32.08],
      '拉萨': [91.11, 29.97],
      '云浮': [112.02, 22.93],
      '梅州': [116.1, 24.55],
      '文登': [122.05, 37.2],
      '上海': [121.48, 31.22],
      '攀枝花': [101.718637, 26.582347],
      '威海': [122.1, 37.5],
      '承德': [117.93, 40.97],
      '厦门': [118.1, 24.46],
      '汕尾': [115.375279, 22.786211],
      '潮州': [116.63, 23.68],
      '丹东': [124.37, 40.13],
      '太仓': [121.1, 31.45],
      '曲靖': [103.79, 25.51],
      '烟台': [121.39, 37.52],
      '福州': [119.3, 26.08],
      '瓦房店': [121.979603, 39.627114],
      '即墨': [120.45, 36.38],
      '抚顺': [123.97, 41.97],
      '玉溪': [102.52, 24.35],
      '张家口': [114.87, 40.82],
      '阳泉': [113.57, 37.85],
      '莱州': [119.942327, 37.177017],
      '湖州': [120.1, 30.86],
      '汕头': [116.69, 23.39],
      '昆山': [120.95, 31.39],
      '宁波': [121.56, 29.86],
      '湛江': [110.359377, 21.270708],
      '揭阳': [116.35, 23.55],
      '荣成': [122.41, 37.16],
      '连云港': [119.16, 34.59],
      '葫芦岛': [120.836932, 40.711052],
      '常熟': [120.74, 31.64],
      '东莞': [113.75, 23.04],
      '河源': [114.68, 23.73],
      '淮安': [119.15, 33.5],
      '泰州': [119.9, 32.49],
      '南宁': [108.33, 22.84],
      '营口': [122.18, 40.65],
      '惠州': [114.4, 23.09],
      '江阴': [120.26, 31.91],
      '蓬莱': [120.75, 37.8],
      '韶关': [113.62, 24.84],
      '嘉峪关': [98.289152, 39.77313],
      '广州': [113.23, 23.16],
      '延安': [109.47, 36.6],
      '太原': [112.53, 37.87],
      '清远': [113.01, 23.7],
      '中山': [113.38, 22.52],
      '昆明': [102.73, 25.04],
      '寿光': [118.73, 36.86],
      '盘锦': [122.070714, 41.119997],
      '长治': [113.08, 36.18],
      '深圳': [114.07, 22.62],
      '珠海': [113.52, 22.3],
      '宿迁': [118.3, 33.96],
      '咸阳': [108.72, 34.36],
      '铜川': [109.11, 35.09],
      '平度': [119.97, 36.77],
      '佛山': [113.11, 23.05],
      '海口': [110.35, 20.02],
      '江门': [113.06, 22.61],
      '章丘': [117.53, 36.72],
      '肇庆': [112.44, 23.05],
      '大连': [121.62, 38.92],
      '临汾': [111.5, 36.08],
      '吴江': [120.63, 31.16],
      '石嘴山': [106.39, 39.04],
      '沈阳': [123.38, 41.8],
      '苏州': [120.62, 31.32],
      '茂名': [110.88, 21.68],
      '嘉兴': [120.76, 30.77],
      '长春': [125.35, 43.88],
      '胶州': [120.03336, 36.264622],
      '银川': [106.27, 38.47],
      '张家港': [120.555821, 31.875428],
      '三门峡': [111.19, 34.76],
      '锦州': [121.15, 41.13],
      '南昌': [115.89, 28.68],
      '柳州': [109.4, 24.33],
      '三亚': [109.511909, 18.252847],
      '自贡': [104.778442, 29.33903],
      '吉林': [126.57, 43.87],
      '阳江': [111.95, 21.85],
      '泸州': [105.39, 28.91],
      '西宁': [101.74, 36.56],
      '宜宾': [104.56, 29.77],
      '呼和浩特': [111.65, 40.82],
      '成都': [104.06, 30.67],
      '大同': [113.3, 40.12],
      '镇江': [119.44, 32.2],
      '桂林': [110.28, 25.29],
      '张家界': [110.479191, 29.117096],
      '宜兴': [119.82, 31.36],
      '北海': [109.12, 21.49],
      '西安': [108.95, 34.27],
      '金坛': [119.56, 31.74],
      '东营': [118.49, 37.46],
      '牡丹江': [129.58, 44.6],
      '遵义': [106.9, 27.7],
      '绍兴': [120.58, 30.01],
      '扬州': [119.42, 32.39],
      '常州': [119.95, 31.79],
      '潍坊': [119.1, 36.62],
      '重庆': [106.54, 29.59],
      '台州': [121.420757, 28.656386],
      '南京': [118.78, 32.04],
      '滨州': [118.03, 37.36],
      '贵阳': [106.71, 26.57],
      '无锡': [120.29, 31.59],
      '本溪': [123.73, 41.3],
      '克拉玛依': [84.77, 45.59],
      '渭南': [109.5, 34.52],
      '马鞍山': [118.48, 31.56],
      '宝鸡': [107.15, 34.38],
      '焦作': [113.21, 35.24],
      '句容': [119.16, 31.95],
      '北京': [116.46, 39.92],
      '徐州': [117.2, 34.26],
      '衡水': [115.72, 37.72],
      '包头': [110, 40.58],
      '绵阳': [104.73, 31.48],
      '乌鲁木齐': [87.68, 43.77],
      '枣庄': [117.57, 34.86],
      '杭州': [120.19, 30.26],
      '淄博': [118.05, 36.78],
      '鞍山': [122.85, 41.12],
      '溧阳': [119.48, 31.43],
      '库尔勒': [86.06, 41.68],
      '安阳': [114.35, 36.1],
      '开封': [114.35, 34.79],
      '济南': [117, 36.65],
      '德阳': [104.37, 31.13],
      '温州': [120.65, 28.01],
      '九江': [115.97, 29.71],
      '邯郸': [114.47, 36.6],
      '临安': [119.72, 30.23],
      '兰州': [103.73, 36.03],
      '沧州': [116.83, 38.33],
      '临沂': [118.35, 35.05],
      '南充': [106.110698, 30.837793],
      '天津': [117.2, 39.13],
      '富阳': [119.95, 30.07],
      '泰安': [117.13, 36.18],
      '诸暨': [120.23, 29.71],
      '郑州': [113.65, 34.76],
      '哈尔滨': [126.63, 45.75],
      '聊城': [115.97, 36.45],
      '芜湖': [118.38, 31.33],
      '唐山': [118.02, 39.63],
      '平顶山': [113.29, 33.75],
      '邢台': [114.48, 37.05],
      '德州': [116.29, 37.45],
      '济宁': [116.59, 35.38],
      '荆州': [112.239741, 30.335165],
      '宜昌': [111.3, 30.7],
      '义乌': [120.06, 29.32],
      '丽水': [119.92, 28.45],
      '洛阳': [112.44, 34.7],
      '秦皇岛': [119.57, 39.95],
      '株洲': [113.16, 27.83],
      '石家庄': [114.48, 38.03],
      '莱芜': [117.67, 36.19],
      '常德': [111.69, 29.05],
      '保定': [115.48, 38.85],
      '湘潭': [112.91, 27.87],
      '金华': [119.64, 29.12],
      '岳阳': [113.09, 29.37],
      '长沙': [113, 28.21],
      '衢州': [118.88, 28.97],
      '廊坊': [116.7, 39.53],
      '菏泽': [115.480656, 35.23375],
      '合肥': [117.27, 31.86],
      '武汉': [114.31, 30.52],
      '大庆': [125.03, 46.58]
    }
    data:Array<any> = [
      {name: '海门', value: 9},
      {name: '鄂尔多斯', value: 12},
      {name: '招远', value: 12},
      {name: '舟山', value: 12},
      {name: '齐齐哈尔', value: 14},
      {name: '盐城', value: 15},
      {name: '赤峰', value: 16},
      {name: '青岛', value: 18},
      {name: '乳山', value: 18},
      {name: '金昌', value: 19},
      {name: '泉州', value: 21},
      {name: '莱西', value: 21},
      {name: '日照', value: 21},
      {name: '胶南', value: 22},
      {name: '南通', value: 23},
      {name: '拉萨', value: 24},
      {name: '云浮', value: 24},
      {name: '梅州', value: 25},
      {name: '文登', value: 25},
      {name: '上海', value: 25},
      {name: '攀枝花', value: 25},
      {name: '威海', value: 25},
      {name: '承德', value: 25},
      {name: '厦门', value: 26},
      {name: '汕尾', value: 26},
      {name: '潮州', value: 26},
      {name: '丹东', value: 27},
      {name: '太仓', value: 27},
      {name: '曲靖', value: 27},
      {name: '烟台', value: 28},
      {name: '福州', value: 29},
      {name: '营口', value: 37},
      {name: '惠州', value: 37},
      {name: '江阴', value: 37},
      {name: '蓬莱', value: 37},
      {name: '韶关', value: 38},
      {name: '嘉峪关', value: 38},
      {name: '广州', value: 38},
      {name: '延安', value: 38},
      {name: '太原', value: 39},
      {name: '清远', value: 39},
      {name: '中山', value: 39},
      {name: '昆明', value: 39},
      {name: '寿光', value: 40},
      {name: '张家港', value: 52},
      {name: '三门峡', value: 53},
      {name: '锦州', value: 54},
      {name: '南昌', value: 54},
      {name: '柳州', value: 54},
      {name: '三亚', value: 54},
      {name: '自贡', value: 56},
      {name: '吉林', value: 56},
      {name: '阳江', value: 57},
      {name: '泸州', value: 57},
      {name: '西宁', value: 57},
      {name: '宜宾', value: 58},
      {name: '呼和浩特', value: 58},
      {name: '成都', value: 58},
      {name: '大同', value: 58},
      {name: '句容', value: 75},
      {name: '北京', value: 79},
      {name: '徐州', value: 79},
      {name: '衡水', value: 80},
      {name: '包头', value: 80},
      {name: '绵阳', value: 80},
      {name: '乌鲁木齐', value: 84},
      {name: '枣庄', value: 84},
      {name: '杭州', value: 84},
      {name: '淄博', value: 85},
      {name: '鞍山', value: 86},
      {name: '溧阳', value: 86},
      {name: '库尔勒', value: 86},
      {name: '安阳', value: 90},
      {name: '开封', value: 90},
      {name: '济南', value: 92},
      {name: '德阳', value: 93},
      {name: '温州', value: 95},
      {name: '九江', value: 96},
      {name: '邯郸', value: 98},
      {name: '临安', value: 99},
      {name: '兰州', value: 99},
      {name: '沧州', value: 100},
      {name: '临沂', value: 103},
      {name: '南充', value: 104},
      {name: '天津', value: 105},
      {name: '富阳', value: 106},
      {name: '泰安', value: 112},
      {name: '诸暨', value: 112},
      {name: '郑州', value: 113},
      {name: '哈尔滨', value: 114},
      {name: '聊城', value: 116},
      {name: '芜湖', value: 117},
      {name: '唐山', value: 119},
      {name: '平顶山', value: 119},
      {name: '邢台', value: 119},
      {name: '德州', value: 120},
      {name: '济宁', value: 120},
      {name: '荆州', value: 127},
      {name: '宜昌', value: 130},
      {name: '义乌', value: 132},
      {name: '丽水', value: 133},
      {name: '洛阳', value: 134},
      {name: '秦皇岛', value: 136},
      {name: '株洲', value: 143},
      {name: '石家庄', value: 147},
      {name: '莱芜', value: 148},
      {name: '常德', value: 152},
      {name: '保定', value: 153},
      {name: '湘潭', value: 154},
      {name: '金华', value: 157},
      {name: '岳阳', value: 169},
      {name: '长沙', value: 175},
      {name: '衢州', value: 177},
      {name: '廊坊', value: 193},
      {name: '菏泽', value: 194},
      {name: '合肥', value: 229},
      {name: '武汉', value: 273},
      {name: '大庆', value: 279}
    ]
    @Watch('datas', {deep: true})
    /* watchDatas (): void {
      if (!this.datas) return;
      (this as any).$get(this.baseUrl+'json/china.json').then((r: any) => {
        this.drawChartAreaBasic(r)
      })
    }; */
    mounted () {
      /* (this as any).$get(this.baseUrl+'json/china.json').then((r: any) => {
        this.drawChartAreaBasic(r)
      }) */
      this.initEchartsFun()
      /* window.onresize = () => { //  根据窗口大小调整曲线大小
		    const myChart = echarts.init(this.$refs.map as HTMLDivElement)
		    myChart.resize();
		  } */
    }
    drawChartAreaBasic (geoJson: any) {
      const myChart = echarts.init(this.$refs.echartGeo as HTMLDivElement)
      myChart.resize()
      echarts.registerMap('henan', geoJson);
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: 'title',
            type: 'map',
            mapType: 'henan', // 自定义扩展图表类型
            itemStyle: {
              normal: { label: { show: true } },
              emphasis: { label: { show: true } }
            },
            data: [
              { name: '金水区', value: 20057.34 },
              { name: '中原区', value: 15477.48 }
            ]
          }
        ]
      }, true)
    }

    convertData (data:Array<any>) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
    initEchartsFun () {
      const myChart = echarts.init(this.$refs.echartGeo as HTMLDivElement)
      let _this = this
      // let max = this.data[0].value, min = this.data[0].value // 假设第一个为最大或者最小
      // this.data.map((v:any, i:number) => {
      //   let cur = v.value;
      //   cur > max ? max = cur : null;
      //   cur < min ? min = cur : null;
      // })
      // console.log(min, max)
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        visualMap: {
          show: false, // 左下角小柱子
          // min: min,
          // max: max,
          // left: '30%',
          // top: 'bottom',
          // text: ['High', 'Low'], // 左下角柱子两端的文本
          textStyle: {
            color: '#fff'
          },
          seriesIndex: [2],
          calculable: true, // 是否拖拽
          inRange: { // 设置颜色
            color: ['rgba(63, 155, 255, .5)', 'rgba(63, 155, 255, 1)']
          }
        },
        geo: {
          map: 'china',
          roam: true,
          left: '30%',
          top: '2%',
          scaleLimit: { // 规模限制
            min: 1,
            max: 4
          },
          label: {
            normal: {
              show: true, // 是否显示地区文本
              textStyle: {
                color: '#fff'
              }
            }
          },
          emphasis: { // 高亮时样式
            label: {
              show: true,
              textStyle: {
                color: '#FFF'
              }
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: '#1B3B75',
              borderColor: '#80b3dc'
            },
            emphasis: {
              color: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '啄木鸟教育运营',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: _this.convertData(_this.data),
            symbolSize: function (val:any) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: '{b}', // 地名
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#FFEA00'
              }
            }
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: _this.convertData(_this.data.sort(function (a, b) {
              return b.value - a.value;
            }).slice(0, 6)), // 提取出最大的5个显示波纹动画
            symbolSize: function (val:any) {
              return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#FFEA00',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      })
    }
  }
</script>

<style lang='less' scoped>
.pcChina {
  position: absolute;
  width: 100%;
  min-height: 600px;
}
</style>
