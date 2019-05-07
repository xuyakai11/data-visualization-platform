<template>
  <div class="report lpc-tabs">
    <div>
     <a-spin :spinning="spinning" delayTime="500">
       <div class="top">
        <span><i v-for="(item, i) in year" :key="`${i}year`">{{item}}</i> 年 <i v-for="(item, i) in month" :key="`${i}month`">{{item}}</i> 月 <i v-for="(item, i) in day" :key="`${i}day`">{{item}}</i> 日  &nbsp;&nbsp;&nbsp; {{ week }}</span>
        <p>啄木鸟教育运营数据监控</p>
       </div>
       <div class="lpc-content">
        <div class="left">
          <div class="lpc-left-top">
            <p class="title">今日收款</p>
            <div class="content">
              <p class="totalIncomeMoney">
                <template v-for="(item, i) in dayIncomeMoney">
                  <span :class="item !== ',' ? 'num': ''" :key="i">{{ item }}</span>
                </template>
              </p>
              <div class="totalIncome">
                <div>
                  <p>周收入</p>
                  <p>{{data.totalIncomeMoney.weekIncomeMoney}}万 <span :class="data.totalIncomeMoney.weekProportion > 0 ? 'up' : 'down'"><a-icon :type="data.totalIncomeMoney.weekProportion > 0 ? 'arrow-up' : 'arrow-down'" />{{data.totalIncomeMoney.weekProportion}}%</span></p>
                </div>
                <div>
                  <p>月收入</p>
                  <p>{{data.totalIncomeMoney.weekIncomeMoney}}万 <span :class="data.totalIncomeMoney.monthProportion > 0 ? 'up' : 'down'"><a-icon :type="data.totalIncomeMoney.monthProportion > 0 ? 'arrow-up' : 'arrow-down'" />{{data.totalIncomeMoney.monthProportion}}%</span></p>
                </div>
                <div>
                  <p>年收入</p>
                  <p>{{data.totalIncomeMoney.weekIncomeMoney}}万 <span :class="data.totalIncomeMoney.yearProportion > 0 ? 'up' : 'down'"><a-icon :type="data.totalIncomeMoney.yearProportion > 0 ? 'arrow-up' : 'arrow-down'" />{{data.totalIncomeMoney.yearProportion}}%</span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="lpc-left-middle">
            <div class="lpc-left-middle-left">
               <div>
                <a-tabs>
                  <a-tab-pane tab="周收款排行" key="1" class="lpc-card-content">
                    <template>
                      <a-carousel vertical :dots="false" autoplay> <!-- autoplay -->
                          <div v-for="(item, i) in arr" :key="i">
                            <ul class="lpc-carUl" :class="i ? '': 'one'">
                              <li v-for="(list, index) in item" :key="index">
                                <span class="badge">{{list.num + 1}}</span>
                                <span>{{list.branch_name}}</span>
                                <span>{{list.total_money}}</span>
                              </li>
                            </ul>
                          </div>
                      </a-carousel>
                    </template>
                  </a-tab-pane>
                  <a-tab-pane tab="月收款排行" key="2" class="lpc-card-content">
                    <template>
                      <a-carousel vertical :dots="false" autoplay> <!-- autoplay -->
                          <div v-for="(item, i) in arr" :key="i">
                            <ul class="lpc-carUl" :class="i ? '': 'one'">
                              <li v-for="(list, index) in item" :key="index">
                                <span class="badge">{{list.num + 1}}</span>
                                <span>{{list.branch_name}}</span>
                                <span>{{list.total_money}}</span>
                              </li>
                            </ul>
                          </div>
                      </a-carousel>
                    </template>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </div>
            <div class="lpc-left-middle-right">
              <div class="lpc-carousel">
                <p class="title">年度结转排行</p>
                <template>
                  <a-carousel vertical :dots="false" autoplay> <!-- autoplay -->
                      <div v-for="(item, i) in arr" :key="i">
                        <ul class="lpc-carUl" :class="i ? '': 'one'">
                          <li v-for="(list, index) in item" :key="index">
                            <span class="badge">{{list.num + 1}}</span>
                            <span>{{list.branch_name}}</span>
                            <span>{{list.total_money}}</span>
                          </li>
                        </ul>
                      </div>
                  </a-carousel>
                </template>
              </div>
              
            </div>
          </div>
          <div class="lpc-left-bottom">
            <a-tabs>
              <a-tab-pane tab="月预算排行" key="1" class="lpc-card-content">
                <p class="title"><span>学校</span><span>预算完成</span><span>比例</span></p>
                <template>
                  <a-carousel vertical :dots="false" autoplay> <!-- autoplay -->
                      <div v-for="(item, i) in arrlength" :key="i">
                        <ul class="lpc-carUl-width" :class="i ? '': 'one'">
                          <li v-for="(list, index) in item" :key="index">
                            <span class="badge">{{list.num + 1}}</span>
                            <span style="width: 2.6rem;">{{list.branch_name}}</span>
                            <span>
                              <a-tooltip placement="rightTop" >
                                <template slot="title">
                                  <span style="color:#00D3E3;letter-spacing:0;font-size:10px;">预算金额:¥{{list.preMoney}}<br/>完成金额:¥{{list.completeMoney}}</span>
                                </template>
                                <a-progress :percent="list.proportion" strokeColor="#00D3E3" :showInfo="false" status="active" style="color:#3E495B;height: 6px;"/>
                              </a-tooltip>
                            </span>
                            <span style="float:right;">{{list.proportion}}%</span>
                          </li>
                        </ul>
                      </div>
                  </a-carousel>
                </template>
              </a-tab-pane>
              <a-tab-pane tab="年预算排行" key="2" class="lpc-card-content">
                <p class="title"><span>学校</span><span>预算完成</span><span>比例</span></p>
                <template>
                  <a-carousel vertical :dots="false" autoplay> <!-- autoplay -->
                      <div v-for="(item, i) in arrlength" :key="i">
                        <ul class="lpc-carUl-width" :class="i ? '': 'one'">
                          <li v-for="(list, index) in item" :key="index">
                            <span class="badge">{{list.num + 1}}</span>
                            <span style="width: 2.6rem;">{{list.branch_name}}</span>
                            <span>
                              <a-tooltip placement="rightTop" >
                                <template slot="title">
                                  <span style="color:#00D3E3;letter-spacing:0;font-size:10px;">预算金额:¥{{list.preMoney}}<br/>完成金额:¥{{list.completeMoney}}</span>
                                </template>
                                <a-progress :percent="list.proportion" strokeColor="#00D3E3" :showInfo="false" status="active" style="color:#3E495B;height: 6px;"/>
                              </a-tooltip>
                            </span>
                            <span style="float:right;">{{list.proportion}}%</span>
                          </li>
                        </ul>
                      </div>
                  </a-carousel>
                </template>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div class="middle">
          <p class="title">运营数据分析</p>
          <div>
            <table>
              <tbody>
                <tr>
                  <td class="spaceTd">总计售卖合同数</td><td>{{ data.dataFenxi.total }}个</td>
                  <td class="spaceTd">总计优惠金额</td><td>{{ data.dataFenxi.totalMoney }}</td>
                  <td class="spaceTd">人均产出合同</td><td>{{ data.dataFenxi.svgContract }}个</td>
                </tr>
                <tr>
                  <td class="spaceTd">签约产品</td><td>{{ data.dataFenxi.chanpin }}个</td>
                  <td class="spaceTd">优惠比例均值</td><td>{{ data.dataFenxi.bilijunzhi }}</td>
                  <td class="spaceTd">人均产出产品</td><td>{{ data.dataFenxi.renjunchanpin }}个</td>
                </tr>
                <tr>
                  <td class="spaceTd">咨询平均单臂</td><td>{{ data.dataFenxi.pinjundanbi }}</td>
                  <td class="spaceTd">低于最低</td><td>{{ data.dataFenxi.min }}</td>
                  <td class="spaceTd">咨询人均单笔</td><td>{{ data.dataFenxi.zixunrenjundanbi }}</td>
                </tr>
                <tr>
                  <td class="spaceTd">培训平均单笔</td><td>{{ data.dataFenxi.svgrenjundanbi }}</td>
                  <td class="spaceTd">销售顾问</td><td>{{ data.dataFenxi.xiaoshouguwen }}个</td>
                  <td></td><td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="right">
          <div class="lpc-right-left">
            <img src="../../assets/img/borderright.png" alt="" class="rightImg">
            <img src="../../assets/img/borderleft.png" alt="" class="leftImg">
            <pc-line title="周收入趋势" startColor="#E57373" endColor="rgba(229, 115, 115, .3)"/>
          </div>
          <div class="lpc-right-right">
            <img src="../../assets/img/borderright.png" alt="" class="rightImg">
            <img src="../../assets/img/borderleft.png" alt="" class="leftImg">
            <pc-line title="周退费趋势" startColor="#3484f5" endColor="rgba(52, 132, 245, .3)"/>
          </div>
          <div class="lpc-right-left">
            <img src="../../assets/img/borderright.png" alt="" class="rightImg">
            <img src="../../assets/img/borderleft.png" alt="" class="leftImg">
            <pc-pie title="业务培训收入构成"/>
          </div>
          <div class="lpc-right-right">
            <img src="../../assets/img/borderright.png" alt="" class="rightImg">
            <img src="../../assets/img/borderleft.png" alt="" class="leftImg">
            <pc-pie title="培训收入业务类型"/>
          </div>
          <div class="lpc-right-left">
            <img src="../../assets/img/borderright.png" alt="" class="rightImg">
            <img src="../../assets/img/borderleft.png" alt="" class="leftImg">
            <pc-pie title="咨询收入业务类型"/>
          </div>
          <div class="lpc-right-right">
            <img src="../../assets/img/borderright.png" alt="" class="rightImg">
            <img src="../../assets/img/borderleft.png" alt="" class="leftImg">
            <pc-bar title="不知道显示啥玩意儿数据"/>
          </div>
        </div>
        <div class="echart-geo" ref="echartChina">
          <pc-china datas="ggsmd"/>
        </div>
       </div>
       <div class="timeNum" ref="timeNum">
         <p class="daoJiShi" v-if="daoJiShi">{{ timeOut }}</p>
       </div>
     </a-spin>
    </div>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import * as moment from 'moment'
  import { toThousands, getTime } from '@/libs/util.ts'
  import pcLine from '@/components/chart/pcLine.vue'
  import pcPie from '@/components/chart/pcPie.vue'
  import pcChina from '@/components/chart/pcChina.vue'
  import pcBar from '@/components/chart/pcBar.vue'

  interface data {
    totalIncomeMoney:any,
    carryTotalMoney:Array<any>,
    preYearMoney:Array<any>,
    dataFenxi:any
  }

  @Component({
    components: { pcLine, pcPie, pcChina, pcBar }
  })
  export default class reportPc extends Vue {
    @Prop() private msg!: string;
    clientHeight:number = 0
    spinning:boolean = true
    timeOut:number = 0 // init倒计时设置
    daoJiShi:boolean = true
    year:string = ''
    month:string = ''
    day:string = ''
    week:string = ''
    arr:Array<any> = [] // 对结转排行进行切割
    arrlength:Array<any> = [] // 预算排行
    dayIncomeMoney:string = '' // 今日收款
    data:data = {
      totalIncomeMoney: {
        'dayIncomeMoney': 23647124, // 日总收入
        'weekIncomeMoney': 236471.18, // 周总收入
        'weekProportion': '0.00', // 周同比
        'monthIncomeMoney': 236471.18, // 月总收入
        'monthProportion': '10.00', // 月同比
        'yearIncomeMoney': 236471.18, // 年总收入
        'yearProportion': '12.23' // 年同比
      },
      carryTotalMoney: [ // 结转排行
        {
            "branch_name":"北京分公司",
            "co_firstmoney":"603.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"603.00",
            "school_code":"103",
            "month_stamp":"201901"
        },
        {
            "branch_name":"武汉分公司",
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"104",
            "month_stamp":"201901"
        },
        {
            "branch_name": '垃圾公司1',
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"98",
            "month_stamp":"201901"
        },
        {
            "branch_name":"北京分公司",
            "co_firstmoney":"603.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"603.00",
            "school_code":"103",
            "month_stamp":"201901"
        },
        {
            "branch_name":"武汉分公司",
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"104",
            "month_stamp":"201901"
        },
        {
            "branch_name":'垃圾公司2',
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"98",
            "month_stamp":"201901"
        },
        {
            "branch_name":"北京分公司",
            "co_firstmoney":"603.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"603.00",
            "school_code":"103",
            "month_stamp":"201901"
        },
        {
            "branch_name":"武汉分公司",
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"104",
            "month_stamp":"201901"
        },
        {
            "branch_name":'垃圾公司3',
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"98",
            "month_stamp":"201901"
        },
        {
            "branch_name":"北京分公司",
            "co_firstmoney":"603.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"603.00",
            "school_code":"103",
            "month_stamp":"201901"
        },
        {
            "branch_name":"武汉分公司",
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"104",
            "month_stamp":"201901"
        },
        {
            "branch_name": '垃圾公司4',
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"98",
            "month_stamp":"201901"
        },
        {
            "branch_name":"北京分公司",
            "co_firstmoney":"603.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"603.00",
            "school_code":"103",
            "month_stamp":"201901"
        },
        {
            "branch_name":"武汉分公司",
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"104",
            "month_stamp":"201901"
        },
        {
            "branch_name": '垃圾公司5',
            "co_firstmoney":"0.00",
            "co_extmoney":"0.00",
            "co_diffmoney":"0.00",
            "total_money":"0.00",
            "school_code":"98",
            "month_stamp":"201901"
        }
      ],
      preYearMoney: [ // 预算排行
        {
          "branch_name": "北京啄木鸟", // 学校名称
          "preMoney": "5000", // 预结转数据
          "completeMoney": "3000", // 完成金额
          "proportion": "80" // 比例
        },
        {
            "branch_name":"北京啄木鸟",
            "preMoney":"5000",
            "completeMoney":"3000",
            "proportion":"80"
        },
        {
            "branch_name":"深圳分公司",
            "preMoney":"6000",
            "completeMoney":"4000",
            "proportion":"60"
        },
        {
            "branch_name":"上海分公司",
            "preMoney":"6000",
            "completeMoney":"4000",
            "proportion":"60"
        },
        {
            "branch_name":"沈阳分公司",
            "preMoney":"6000",
            "completeMoney":"4000",
            "proportion":"60"
        },
        {
            "branch_name":"南京分公司",
            "preMoney":"6000",
            "completeMoney":"4000",
            "proportion":"80"
        },
        {
            "branch_name":"广州分公司",
            "preMoney":"6000",
            "completeMoney":"4000",
            "proportion":"80"
        },
        {
          "branch_name": "北京啄木鸟",
          "preMoney": "5000",
          "completeMoney": "3000",
          "proportion": "80"
        },
        {
          "branch_name": "北京啄木鸟",
          "preMoney": "5000",
          "completeMoney": "3000",
          "proportion": "80"
        },
        {
            "branch_name":"北京啄木鸟",
            "preMoney":"5000",
            "completeMoney":"3000",
            "proportion":"80"
        }
      ],
      dataFenxi: { // 运营数据分析
        total: 6,
        totalMoney: 20000,
        svgContract: 5,
        chanpin: 20,
        bilijunzhi: '80%',
        renjunchanpin: 10,
        pinjundanbi: 20000,
        min: '95%',
        zixunrenjundanbi: 250000,
        svgrenjundanbi: 2000,
        xiaoshouguwen: 2
      }
    }
    moment () {}
    created () {
      setTimeout(() => {
        this.spinning = false
      }, 1000);
      // moment汉化
      (moment as any).locale('zh-cn', {
          months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
          monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
          weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
          weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
          weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
          longDateFormat: {
              LT: 'HH:mm',
              LTS: 'HH:mm:ss',
              L: 'YYYY-MM-DD',
              LL: 'YYYY年MM月DD日',
              LLL: 'YYYY年MM月DD日Ah点mm分',
              LLLL: 'YYYY年MM月DD日ddddAh点mm分',
              l: 'YYYY-M-D',
              ll: 'YYYY年M月D日',
              lll: 'YYYY年M月D日 HH:mm',
              llll: 'YYYY年M月D日dddd HH:mm'
          },
          meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
          meridiemHour: function (hour:any, meridiem:any) {
              if (hour === 12) {
                  hour = 0;
              }
              if (meridiem === '凌晨' || meridiem === '早上' ||
                  meridiem === '上午') {
                  return hour;
              } else if (meridiem === '下午' || meridiem === '晚上') {
                  return hour + 12;
              } else {
                  // '中午'
                  return hour >= 11 ? hour : hour + 12;
              }
          },
          meridiem: function (hour:any, minute:any, isLower:any) {
              const hm = hour * 100 + minute;
              if (hm < 600) {
                  return '凌晨';
              } else if (hm < 900) {
                  return '早上';
              } else if (hm < 1130) {
                  return '上午';
              } else if (hm < 1230) {
                  return '中午';
              } else if (hm < 1800) {
                  return '下午';
              } else {
                  return '晚上';
              }
          },
          calendar: {
              sameDay: '[今天]LT',
              nextDay: '[明天]LT',
              nextWeek: '[下]ddddLT',
              lastDay: '[昨天]LT',
              lastWeek: '[上]ddddLT',
              sameElse: 'L'
          },
          dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
          ordinal: function (number:any, period:any) {
              switch (period) {
                  case 'd':
                  case 'D':
                  case 'DDD':
                      return number + '日';
                  case 'M':
                      return number + '月';
                  case 'w':
                  case 'W':
                      return number + '周';
                  default:
                      return number;
              }
          },
          relativeTime: {
              future: '%s内',
              past: '%s前',
              s: '几秒',
              ss: '%d秒',
              m: '1分钟',
              mm: '%d分钟',
              h: '1小时',
              hh: '%d小时',
              d: '1天',
              dd: '%d天',
              M: '1个月',
              MM: '%d个月',
              y: '1年',
              yy: '%d年'
          },
          week: {
              // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
              dow: 1, // Monday is the first day of the week.
              doy: 4 // The week that contains Jan 4th is the first week of the year.
          }
      })
    }
    mounted () {
      this.dayIncomeMoney = toThousands(this.data.totalIncomeMoney.dayIncomeMoney) // 转换今日收款
      let _this = this
      // let doc:HTMLDivElement = document.body.clientHeight
      let clientHeight:any = document.body.clientHeight
      let docEl = document.documentElement as HTMLDivElement
      this.clientHeight = clientHeight
      docEl.style.fontSize = Math.round((100 * clientHeight) / 1080) + 'px'
      window.onresize = () => {
        let clientHeight:any = document.body.clientHeight
        this.clientHeight = clientHeight
        let docEl = document.documentElement as HTMLDivElement
        docEl.style.fontSize = Math.round((100 * clientHeight) / 1080) + 'px'
        // (this as any).$refs.echartChina.style.height = this.clientHeight + 'px';
      }
      this.year = getTime('YYYY')
      this.month = getTime('MM')
      this.day = getTime('DD')
      this.week = getTime('dddd')
      /* console.log(moment().format('YYYY'), moment().format('MM'), moment().format('DD'))
      console.log(moment().format('dddd')) */
      this.splitObjFun(this.data.carryTotalMoney, 5) // 结转
      this.splitObjFun(this.data.preYearMoney, 8); // 预算
      // setTimeout(() => {
      //   this.timeRun()
      // }, 5000)
    }
    splitObjFun (obj:Array<any>, sliceNum:number):void { // 将数组切割成每5or8个一组
      let arr:Array<any> = []
      obj.map((v:any, i:number) => {
        v.proportion = +v.proportion
        v.num = i
      })
      for (let i = 0; i < obj.length / sliceNum; i++) {
        arr.push(obj.slice(i * sliceNum, (i+1) * sliceNum))
      }
      if (sliceNum === 5) {
        this.arr = arr
      } else {
        this.arrlength = arr
      }
      /* for (let i = 0; i < obj.length; i+=5) {
        arr.push(obj.slice(i, i+5))
      }
      for (let i = 0; i < obj.length; i+=8) {
        arrlength.push(obj.slice(i, i+8))
      } */
    }
    timeRun ():void { // 请求倒计时
      if (this.timeOut !== 0) {
        this.daoJiShi = true
        this.timeOut--
        setTimeout(() => {
          this.timeRun()
        }, 1000)
      } else {
        this.timeOut = 6
        this.daoJiShi = false
        setTimeout(() => {
          this.timeRun()
        }, 10 * 1000) // 一分钟后再次请求
      }
    }
  }
</script>
<style scoped> /* /deep/ or >>>  深度查询选择器*/
  .lpc-left-middle .ant-carousel >>> .slick-slide {
    height: 2.1rem;
    width: 3.02rem;
    color: #AFBDD1;
    letter-spacing: 0;
    font-size: .14rem;
    overflow: scroll;
  }
  .lpc-left-bottom .ant-carousel >>> .slick-slide {
    height: 3.02rem;
    width: 3.02rem;
    color: #AFBDD1;
    letter-spacing: 0;
    font-size: .14rem;
    overflow: scroll;
  }
  .lpc-carUl-width >>> .ant-progress-inner {
    background-color: #3E495B!important;
  }
  .lpc-carUl-width >>> .ant-progress-bg {
    height: 6px!important;
  }
</style>
<style lang='less' scoped>
  .report {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;
    font-family: PingFang-SC-Medium;
    font-family: 'Microsoft YaHei', sans-serif;
    background-image: radial-gradient(50% 100%, #012B71 50%, #011027 100%);
   /*   background-size: 100% 100%; */
    & > div {
      width: 100%;
      height: 100%;
      background: url('../../assets/img/repeat.png') 0 0 repeat;
      .top {
        width: 100%;
        height: .89rem;
        background: url('../../assets/img/top.png') 0 0 no-repeat;
        background-size: 100% 100%;
        z-index: 1;
        span {
          position: absolute;
          top: .2rem;
          left: .09rem;
          display: inline-block;
          font-size: .12rem;
          i {
            display: inline-block;
            background: #002E58;
            border-radius: 2px;
            width: .2rem;
            height: .28rem;
            line-height: .28rem;
            font-size: .14rem;
            margin: 0 2px;
            color: #FFF;
            letter-spacing: 0;
            text-align: center;
          }
        }
        p {
          font-size: .32rem;
          color: #00D3E3;
          letter-spacing: 0;
          text-align: center;
          padding: .35rem 0 .14rem 0;
        }
      }
      .lpc-content {
        height: 9.81rem;
        position: relative;
        .left {
          position: absolute;
          bottom: .16rem;
          left: .39rem;
          width: 6.27rem;
          z-index: 1;
          .lpc-left-top {
            width: 100%;
            height: 2.68rem;
            background: url('../../assets/img/day.png') 0 0 no-repeat;
            background-size: 100% 100%;
            p.title {
              background: rgba(0,54,115,0.30);
              font-size: .24rem;
              color: #00D3E3;
              letter-spacing: 0;
              padding: .24rem 0 .08rem .44rem;
              /* line-height: .72rem; */
            }
            .content {
              padding: .18rem .5rem .46rem .44rem;
              .totalIncomeMoney {
                span {
                  font-family: 'Helvetica';
                  font-size: .56rem;
                  color: #00D3E3;
                  // letter-spacing: .09rem;
                  width: .4rem;
                  height: .7rem;
                  &.num {
                    background: #031C3E;
                    border-radius: 6px;
                    text-align: center;
                    display: inline-block;
                    margin-right: 2px;
                  }
                }
              }
              .totalIncome {
                display: flex;
                div {
                  flex: 1;
                  margin: 2px;
                  p {
                    font-family: 'PingFang-SC-Regular';
                    font-size: .14rem;
                    color: #626F86;
                    letter-spacing: 0;
                    line-height: .18rem;
                  }
                  & > p:first-child {
                    color: #626F86;
                    margin: 10px 0;
                  }
                  & > p:last-child {
                    color: #AFBDD1;
                    word-break: break-word;
                    white-space: nowrap;
                  }
                  .up {
                    font-size: 12px;
                    color: rgb(81, 236, 151);
                  }
                  .down {
                    font-size: 12px;
                    color: #E57373;
                  }
                }
              }
            }
          }
          .lpc-left-middle {
            width: 100%;
            height: 2.6rem;
            margin-top: .1rem;
            // border: 1px solid gainsboro;
            .lpc-left-middle-left {
              display: inline-block;
              width: 3.02rem;
              height: 100%;
              
              background: rgba(4, 18, 50, .6);
              margin-right: .2rem;
              position: relative;
              /* .card-container {
                position: absolute;
                .ant-tabs-tab {
                  padding: 0!important;
                }
              } */
            }
            .lpc-left-middle-right {
              position: relative;
              display: inline-block;
              width: 3.02rem;
              height: 100%;
              border: 2px solid #003464;
              background: rgba(4, 18, 50, .6);
              .lpc-carousel {
                position: absolute;
                color: #fff;
                p.title {
                  background: rgba(0, 54, 115, .3);
                  height: .45rem;
                  line-height: .45rem;
                  width: 100%;
                  padding-left: .16rem;
                  color: #00D3E3;
                  font-size: .16rem;
                }
              }
            }
          }
          .lpc-left-bottom {
            width: 100%;
            height: 3.9rem;
            margin-top: .1rem;
            .lpc-card-content {
              p.title {
                display: flex;
                height: .42rem;
                line-height: .42rem;
                padding: 0 20px;
                span {
                  flex: 1;
                }
                span:nth-child(1) {
                  flex: 0 0 2rem;
                  text-align: left;
                }
                span:nth-child(2) {
                  flex: 0 0 1.6rem;
                  text-align: right;
                }
                span:nth-child(3) {
                  flex: 0 0 1.6rem;
                  text-align: right;
                }
              }
            }
          }
        }
        .middle {
          position: absolute;
          bottom: .16rem;
          left: 6.91rem;
          width: calc(100% - 6.27rem - 6.36rem - 1.25rem);
          min-width: 540px;
          border: 2px solid #003464;
          height: 2.5rem;
          background: rgba(4,18,50,0.80);
          z-index: 1;
          .title {
            height: .44rem;
            line-height: .44rem;
            padding-left: .2rem;
            font-size: .2rem;
            letter-spacing: 0;
            color: #00D3E3;
            background: #031334;
          }
          table {
            width: 100%;
            height: 100%;
            font-size: .12rem;
            overflow: hidden;
            tr {
              height: .5rem;
              line-height: .5rem;
              td.spaceTd {
                padding: 0 .2rem;
                width: 120px;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            tr:nth-child(odd) {
              background: rgba(128, 139, 203, .05)
            }
            tr:nth-child(event) {
              background: rgba(33, 41, 54, 0)
            }
          }
        }
        .right {
          position: absolute;
          right: .38rem;
          bottom: .16rem;
          width: 6.36rem;
          z-index: 1;
          // border: 1px solid red;
          .lpc-right-left {
            display: inline-block;
            width: 3.1rem;
            height: 2.7rem;
            margin-right: .13rem;
            margin-top: .13rem;
            border: 2px solid rgba(131, 143, 166, .3);
            border-radius: 4px;
            background: rgba(6, 41, 104, .2);
            position: relative;
            // border-image: url('../../assets/img/borderright.png') 50% round;
            img.rightImg,.leftImg {
              position: absolute;
              width: .22rem;
              height: .22rem;
            }
            img.rightImg {
              top: -3px;
              right: -3px;
            }
            img.leftImg {
              left: -3px;
              bottom: -3px;
            }
          }
          .lpc-right-right {
            display: inline-block;
            width: 3.1rem;
            height: 2.7rem;
            border: 2px solid rgba(131, 143, 166, .3);
            border-radius: 4px;
            background: rgba(6, 41, 104, .2);
            position: relative;
            img.rightImg,.leftImg {
              position: absolute;
              width: .22rem;
              height: .22rem;
            }
            img.rightImg {
              top: -3px;
              right: -3px;
            }
            img.leftImg {
              left: -3px;
              bottom: -3px;
            }
          }
        }
        .echart-geo {
          width: 100%;
          height: 100%;
        }
      }
      .timeNum {
        .daoJiShi {
          position: fixed;
          top: 50%;
          left: 50%;
          font-size: 150px;
          height: 150px;
          animation: flipOutY 1s ease both infinite;
          -webkit-animation: flipOutY 1s ease both infinite;
          -moz-animation: flipOutY 1s ease both infinite;
        }
      }
    }
  }
  @keyframes flipOutY { // 倒计时动画
    0% {
      -webkit-transform: perspective(400px) rotateY(0deg);
      opacity: .8;
      transform: scaleX(3) scaleY(3);
      margin-top: -225px;
    }
    100% {
      -webkit-transform: perspective(400px) rotateY(90deg);
      opacity: 0;
      transform: scaleX(0) scaleY(1);
      margin-top: -150px;
    }
  }
</style>
