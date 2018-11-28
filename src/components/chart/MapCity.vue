<template>
  <div id="map" ref="echart" :style="{width:datas.w, height: datas.h}">
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import echarts from 'echarts'
import 'echarts/lib/chart/map';
import 'echarts/map/js/china.js';
import 'echarts/lib/component/title';
// 引入提示框和标题组件
// require('echarts/lib/component/tooltip')

@Component
export default class MapCity extends Vue {
	@Prop()private datas!: any
	
	baseUrl: string = process.env.BASE_URL

	@Watch('datas', {deep: true})
	watchDatas (): void {
		if (!this.datas) return;
		console.log(this.datas);
		(this as any).$get(this.baseUrl+'json/'+this.datas.name+'.json').then((r: any) => {
			this.drawChartAreaBasic(r)
		})
	}
  drawChartAreaBasic (geoJson: any) {
		const myChart = echarts.init(this.$refs.echart as HTMLDivElement)
		myChart.resize()
    echarts.registerMap('henan', geoJson);
    myChart.setOption({
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
}
</script>
