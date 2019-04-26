<template>
  <div class="reportScreen">
    <a-row style="margin: 0 -12px" class="lpc-header-content">
      <a-col class="lpc-col-padding" :sm="24" :md="12" :xl="6" style="padding-left: 12px;">
        <chart-card title="本日收入" total="￥ 189,345">
          <a-tooltip title="本日收入" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" term="同周比" :percent="12" :is-increase="true" :scale="0" />
            <trend term="日环比" :target="100" :value="89" :percent="12" :scale="0" />
          </div>
          <div slot="footer"><!-- 日均销售额<span> ￥234.56</span> --></div>
        </chart-card>
      </a-col>
      <a-col class="lpc-col-padding nth2" :sm="24" :md="12" :xl="6">
        <chart-card title="本周收入" total="￥ 189,345">
          <a-tooltip title="本周收入" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div> <!-- class="chart-content" -->
            <mini-area />
          </div>
          <div slot="footer"><!-- 日访问量<span> 123,4</span> --></div>
        </chart-card>
      </a-col>
      <a-col class="lpc-col-padding nth3" :sm="24" :md="12" :xl="6">
        <chart-card title="本月收入" total="￥ 189,345">
          <a-tooltip title="本月收入" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-histogram/>
            <!-- <mini-bar /> -->
          </div>
          <!-- <div slot="footer">转化率 <span>60%</span></div> -->
        </chart-card>
      </a-col>
      <a-col class="lpc-col-padding nth4" :sm="24" :md="12" :xl="6">
        <chart-card title="本年预算" total="73%">
          <a-tooltip title="本年预算" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <a-progress :percent="75" style="color: #f8f9fa!important"/>
          </div>
          <!-- <div slot="footer">
            <trend style="margin-right: 16px" term="同周比" :percent="12" :is-increase="true" :scale="0" />
            <trend term="日环比" :target="100" :value="89" :scale="0" />
          </div> -->
        </chart-card>
      </a-col>
    </a-row>

    <a-row style="margin: 0 -12px">
      <a-col class="lpc-row-col" :sm="24" :md="6" :xl="6" style="padding-left: 12px;">
        <div class="nth1">
          <div class="lpc-sides">
            <middle-pie :title="title1" />
          </div>
          <div class="lpc-sides">
            <middle-ring :title="title3" />
          </div>
        </div>
      </a-col>
      <a-col class="lpc-row-col" :sm="24" :md="12" :xl="12">
        <div class="nth2">
          <middle-china :title="title"/>
          <!-- <ve-map :data="chartMapData" height="100%"></ve-map> -->
        </div>
      </a-col>
      <a-col class="lpc-row-col" :sm="24" :md="6" :xl="6">
        <div class="nth3">
          <div class="lpc-sides">
            <middle-pie :title="title2"/>
          </div>
          <div class="lpc-sides">
            <middle-ring :title="title4" />
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row style="margin: 0 -12px">
      <a-col class="lpc-row-col" :sm="24" :md="6" :xl="6" style="padding-left: 12px;">
        <div class="lpc-bottom1" style="">
          
        </div>
      </a-col>
      <a-col class="lpc-row-col" :sm="24" :md="12" :xl="12">
        <div class="lpc-bottom2">
          <div class="textMessage">
            <h4 class="title">学校售卖中的产品量</h4>
            <a-row>
              <a-col :xs="12" :sm="12" :md="12" :xl="12">
                <p>总计售卖合同数： 6个</p>
                <p>签约产品20个</p>
                <p>咨询平均单笔 50000</p>
                <p>培训平均单笔 10000</p>
                <p>咨询平均单笔 50000</p>
              </a-col>
              <a-col :xs="12" :sm="12" :md="12" :xl="12" style="text-align: right;">
                <p class="bigNumber">20</p>
                <p>8.2% <a-icon type="rise" /></p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :sm="24" :md="24" :xl="24">
                <p>总计优惠金额 20000，优惠比例均值80%，低于最低95%</p>
                <p>您的销售顾问：2个</p>
                <p>人均产出3个合同 10个产品</p>
                <p>咨询人均单笔25000</p>
                <p>培训人均2000</p>
              </a-col>
            </a-row>
            <div class="gutter-example">
              <a-row type="flex" justify="space-around">
                <a-col :span="8">
                  <span></span>
                  <span>999</span>
                  <p>NEW</p>
                </a-col>
                <a-col :span="8">
                  <span></span>
                  <span>456</span>
                  <p>RETURUING</p>
                </a-col>
                <a-col :span="8">
                  <span></span>
                  <span>123</span>
                  <p>REFERRALS</p>
                </a-col>
              </a-row>
            </div>
          </div>
        </div>
      </a-col>
      <a-col class="lpc-row-col" :sm="24" :md="6" :xl="6">
        <div class="lpc-bottom3">
          <div class="salesCard">
            <a-tabs default-active-key="1" size="small" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
              <a-tab-pane tab="周" key="1">
                <ranking-list title="收入客户类型" :list="rankList"/>
              </a-tab-pane>
              <a-tab-pane tab="月" key="2">
                <ranking-list title="销售排行榜" :list="rankList"/>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import chartCard from '@/components/card/chartCard.vue'
  import Trend from '@/components/card/Trend.vue'
  import miniArea from '@/components/chart/miniArea.vue'
  import miniHistogram from '@/components/chart/miniHistogram.vue'
  import middlePie from '@/components/chart/middlePie.vue'
  import middleChina from '@/components/chart/middleChina.vue'
  import middleRing from '@/components/chart/middleRing.vue'
  import RankingList from '@/components/chart/RankingList.vue'

  @Component({
    components: { chartCard, Trend, miniArea, miniHistogram, middlePie, middleRing, RankingList, middleChina }
  })
  
  export default class reportScreen extends Vue {
    title:string = '北京 9月实际收入'
    title1:string = '月收入业务类型'
    title2:string = '培训收入占比'
    title3:string = '月收入客户类型'
    title4:string = '咨询收入占比'
    rankList:Array<any> = []

    chartMapData:any = {
          columns: ['位置', '税收', '人口', '面积'],
          rows: [
            { '位置': '吉林', '税收': 123, '人口': 123, '面积': 92134 },
            { '位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234 },
            { '位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234 },
            { '位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234 }
          ]
        }
    extend:any = {
        series: {
          label: {
            normal: {
              show: false // 节点上是否显示数值
            }
          },
          symbol: 'circle', // 设置节点上的标记图形类型
          showSymbol: false // 默认为true，设值为false时，hover有效
        },
        xAxis: {
          show: false,  
          boundaryGap: false
        },
        yAxis: { 
          show: false,
          boundaryGap: false
        },
        legend: { data:[] }, // 图例
        grid: {
          top: 0,
          bottom: -20,
          left: -55,
          right: 0
          /* x: -55,
          y: 0,
          x2: 0,
          y2: -20 */
        }
      }
    mounted () {
      for (let i = 0; i < 10; i++) {
        this.rankList.push({
          name: '桃源村' + i + '号店',
          total: (1234.56 - i * 100).toFixed(2)
        })
      }
    }
  }
</script>

<style lang='less' scoped>
.reportScreen {
  background: #1A2537;
  padding: 12px;
  .lpc-header-content {
    .lpc-col-padding {
      padding: 0 12px 12px 12px;
    }
    /* .nth2 {
      padding-left: 0;
      padding-right: 6px;
    }
    .nth3 {
      padding-right: 0;
      padding-left: 6px;
    }
    @media (min-width: 768px) {
      .nth2 {
        padding-left: 0;
        padding-right: 12px;
      }
      .nth3 {
        padding-right: 12px;
        padding-left: 12px;
      }
      .nth4 {
        padding-left: 0;
      }
    }
    @media (min-width: 576px) {
      .nth2,.nth3 {
        padding-left: 12px;
        padding-right: 12px;
      }
    } */
  }
  .ant-row {
   /*  @media (min-width: 768px) {
      .nth1,.nth3 {
        padding-right: 0!important;
      }
    } */
    .lpc-row-col {
      height: 600px;
      padding: 0 12px 12px 12px;
      .nth1,.nth2,.nth3 {
        height: 100%;
        .lpc-sides {
          height: 290px;
          border: 1px solid rgb(88, 192, 196);
          &:nth-child(2) {
            margin-top: 10px;
          }
        }
      }
      .lpc-bottom1,.lpc-bottom2,.lpc-bottom3 {
        height: 500px;
        border: 1px solid rgb(88, 192, 196);
        padding: 10px;
        .textMessage {
          color: white;
          .title {
            color: white;
            font-size: 22px;
            font-weight: 900;
          }
          .ant-row {
            padding: 10px;
            p {
              margin: 5px 0;
            }
            .bigNumber {
              font-size: 45px;
              line-height: 45px;
            }
            .anticon-rise {
              color: rgb(151, 226, 151);
            }
          }
          .gutter-example {
            .ant-col-8 {
              text-align: center;
              span {
                display: inline-block;
                &:first-child {
                  background: red;
                  width: 10px;
                  height: 10px;
                  margin-right: 10px;
                }
                &:nth-child(2) {
                  font-size: 30px;
                  font-weight: 900;
                  vertical-align: middle;
                }
              }
              p {
                font-size: 22px;
                font-weight: 500;
              }
            }
          }
        }
        .salesCard {
          /* .ant-tabs-nav-wrap {
            .ant-tabs-nav {
              .ant-tabs-tab-active {
                color: white!important;
              }
              .ant-tabs-ink-bar {
                background-color: white;
              }
            }
          } */
        }
      }
    }
  }
}

</style>
