<template>
  <div>
    <div class="lpc-step2-content">
      <!-- leftTree -->
      <left-menu @treeDblData="treeMsg"></left-menu>
      <!-- middletab -->
      <div class="lpc-centerTab">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab"><a-icon type="apple"/>报表设置</span>
            <div class="lpc-tab1-content">
              <div class="tab1-top">
                <div class="tab1-top-header">
                  <h4>分组</h4>
                  <a-tooltip placement="top">
                    <template slot="title">
                      <span>删除所有分组</span>
                    </template>
                    <a-icon type="delete" @click="deleteAllGroup"/>
                  </a-tooltip>
                </div>
                <div class="tab1-top-content">
                  <h4>组行</h4>
                  <a-select
                    showSearch
                    allowClear
                    placeholder="添加组行"
                    ref="handleChangeH"
                    style="width: 100%"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @change="handleChangeH"
                    :filterOption="filterOption">
                    <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                      <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                      <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                    </a-select-opt-group>
                   <!--  <a-select-opt-group label="Engineer">
                      <a-select-option value="Yiminghe1">yiminghe1</a-select-option>
                    </a-select-opt-group> -->
                  </a-select>
                  <div class="task-content">
                    <draggable :options="dragOptions" v-model="aTagDatasH" :move="onEnd">
                      <p class="task-item" type="inner" v-for="(item, i) in aTagDatasH" :key="i">
                        {{item.text}}
                        <a-tooltip placement="right">
                          <template slot="title">
                            <span>删除</span>
                          </template>
                          <a-icon type="close" @click="deleteGroup"/>
                        </a-tooltip>
                      </p>
                    </draggable>
                  </div>
                  <!-- <div class="tab1-top-content-bottom">
                    <h4>组列</h4>
                    <a-select
                      showSearch
                      placeholder="添加组列"
                      optionFilterProp="children"
                      style="width: 100%"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      @change="handleChange"
                      :filterOption="filterOption">
                      <a-select-opt-group>
                        <span slot="label"><a-icon type="user"/>Manager</span>
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                      </a-select-opt-group>
                      <a-select-opt-group label="Engineer">
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                      </a-select-opt-group>
                    </a-select>
                    <div class="task-content">
                      <draggable :options="dragOptions" :End="onEnd()" :Update="onUpdate()" v-model="aTagDatasL">
                        <p class="task-item" type="inner" v-for="(item, i) in aTagDatasL">
                          {{item.text}}
                          <a-tooltip placement="right">
                            <template slot="title">
                              <span>删除</span>
                            </template>
                            <a-icon type="close" @click="deleteGroup"/>
                          </a-tooltip>
                        </p>
                      </draggable>
                    </div>
                  </div> -->
                </div>
              </div>
              <a-divider />
              <div class="tab1-bottom">
                <div class="tab1-bottom-header">
                  <h4>列数</h4>
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link" href="#">
                      <a-icon type="down-square" />
                    </a>
                    <a-menu slot="overlay">
                      <!-- <a-menu-item key="0">
                        <a href="javascript:void(0)">添加存储器列</a>
                      </a-menu-item> -->
                      <a-menu-item key="1" :disabled="!aTagDatasH.length"> <!-- 当组行为空时不能选 -->
                        <a href="javascript:void(0)" @click="showFormulaModel">添加汇总公式</a>
                      </a-menu-item>
                      <a-menu-divider />
                      <a-menu-item key="3">删除所有列</a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </div>
                <a-select
                  showSearch
                  allowClear
                  placeholder="添加组列"
                  optionFilterProp="children"
                  style="width: 100%"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChangeS"
                  :filterOption="filterOption">
                  <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                    <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                    <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                  </a-select-opt-group>
                </a-select>
                <div class="task-content">
                  <draggable :options="dragOptions" v-model="aTagDatasS" :move="onEnd">
                    <p class="task-item" type="inner" v-for="(item, i) in aTagDatasS" :key="i">
                      {{item.text}}
                      <a-tooltip placement="right">
                        <template slot="title">
                          <span>删除</span>
                        </template>
                        <a-icon type="close" @click="deleteGroup"/>
                      </a-tooltip>
                    </p>
                  </draggable>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab"><a-icon type="android"/>筛选</span>
            <div class="lpc-tab2-content">
              <div class="tab2-top-header">
                <h4>固定筛选器</h4>
                <!-- <a-dropdown :trigger="['click']">
                  <a class="ant-dropdown-link" href="#">
                    <a-icon type="down-square" />
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item key="0">
                      <a href="javascript:void(0)">添加筛选逻辑</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                      <a href="javascript:void(0)">添加交叉筛选器</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown> -->
              </div>
              <a-select
                showSearch
                allowClear
                placeholder="添加固有筛选"
                optionFilterProp="children"
                style="width: 100%"
                @focus="handleFocus"
                @blur="handleBlurF"
                @change="handleChangeF"
                :filterOption="filterOption">
                <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                  <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                  <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                </a-select-opt-group>
              </a-select>
              <div class="screening-content">
                <a-popover arrowPointAtCenter placement="right" title="编辑筛选器" trigger="click" :visible="item.visible" @click="popoverVisibleFun($event, item)" v-model="item.popover" v-for="(item, i) in aTagDatasF" :key="i">
                  <div slot="content">
                    <div v-if="item.type == 'time'">
                      <a-form :form="timeForm">
                        <a-form-item label="时间范围">
                          <a-range-picker size="small" format="YYYY-MM-DD" @change="timeOnChange" v-decorator="['range-picker', rangeConfig]"/>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'number'">
                      <a-form :form="numberForm">
                        <a-form-item label="运算符">
                          <a-select v-decorator="['numberSelect', {initialValue: '0', rules: [{ required: false }]}]">
                            <a-select-option value="0">大于等于</a-select-option>
                            <a-select-option value="1">大于</a-select-option>
                            <a-select-option value="2">小于等于</a-select-option>
                            <a-select-option value="3">小于</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item >
                          <a-input name="numberInput" v-decorator="['numberInput', {rules: [{ required: true, message: '请输入数字！' }]}]"/>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'string'">
                      <a-form :form="stringForm">
                        <a-form-item label="运算符">
                          <a-select v-decorator="['stringSelect', {initialValue: '0', rules: [{ required: false }]}]">
                            <a-select-option value="0">等于</a-select-option>
                            <a-select-option value="1">不等于</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item >
                          <a-input name="stringInput" v-decorator="['numberInput', {rules: [{ required: true, message: '请输入字符串！' }]}]"/>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'select'">
                      <a-form :form="selectForm">
                        <a-form-item label="运算符">
                          <a-select style="width: 250px" v-decorator="['selectSelect', {initialValue: '0', rules: [{ required: false }]}]">
                            <a-select-option value="0">等于</a-select-option>
                            <a-select-option value="1">不等于</a-select-option>
                            <a-select-option value="2">小于</a-select-option>
                            <a-select-option value="3">大于</a-select-option>
                            <a-select-option value="4">小于或等于</a-select-option>
                            <a-select-option value="5">大于或等于</a-select-option>
                            <a-select-option value="6">包含</a-select-option>
                            <a-select-option value="7">不包含</a-select-option>
                            <a-select-option value="8">起始字符</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item label="值">
                          <a-select mode="multiple" v-decorator="['selectMultiple', { rules: [{ required: true, message: '请选择值！' }]}]"
                            showSearch
                            allowClear
                            style="width: 250px"
                            :filterOption="filterOption">
                            <a-select-option v-for="(item, index) in selectMultiple" :key="index" :value="item.value">
                              {{item.title}}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'list'">这是列表类型</div>
                    <div class="content-footer">
                      <a-button size="small" @click="hidePopover(item)">取消</a-button>
                      <a-button size="small" type="primary" @click="enterPopover(item)">应用</a-button>
                    </div>
                  </div>
                  <div class="screening-item">
                    <div class="lpc-fixed-text">
                      <p class="title">{{item.title}}</p>
                      <p class="text">{{item.text}}</p>
                    </div>
                    <a-tooltip placement="right" v-if="!item.type"> <!-- 判断固定项不显示删除按钮 -->
                      <template slot="title">
                        <span>删除</span>
                      </template>
                      <a-icon type="close" @click="deleteFixed"/>
                    </a-tooltip>
                  </div>
                </a-popover>
              </div>
              <a-divider />
              <div class="tab2-top-header">
                <h4>显示筛选器</h4>
              </div>
              <a-select
                showSearch
                allowClear
                placeholder="添加显示筛选"
                optionFilterProp="children"
                style="width: 100%"
                @focus="handleFocus"
                @blur="handleBlurX"
                @change="handleChangeX"
                :filterOption="filterOption">
                <a-select-opt-group v-for="(source, index) in dataSource" :key="index">
                  <span slot="label"><a-icon type="user"/>{{source.title}}</span>
                  <a-select-option v-for="(child) in source.children" :key="child.key" :value="child.title">{{child.title}}</a-select-option>
                </a-select-opt-group>
              </a-select>
              <div class="According-content">
                <a-popover arrowPointAtCenter placement="right" id="ant-popover" title="编辑筛选器" trigger="click" :visible="item.visible" @click="popoverVisibleFun($event, item)" v-model="item.popover" v-for="(item, i) in aTagDatasX" :key="i">
                  <div slot="content">
                    <div v-if="item.type == 'time'">
                      <a-form :form="timeForm">
                        <a-form-item label="时间范围">
                          <a-range-picker size="small" format="YYYY-MM-DD" @change="timeOnChange" v-decorator="['range-picker', rangeConfig]"/>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'number'">
                      <a-form :form="numberForm">
                        <a-form-item label="运算符">
                          <a-select v-decorator="['numberSelect', {initialValue: '0', rules: [{ required: false }]}]">
                            <a-select-option value="0">大于等于</a-select-option>
                            <a-select-option value="1">大于</a-select-option>
                            <a-select-option value="2">小于等于</a-select-option>
                            <a-select-option value="3">小于</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item >
                          <a-input name="numberInput" v-decorator="['numberInput', {rules: [{ required: true, message: '请输入数字！' }]}]"/>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'string'">
                      <a-form :form="stringForm">
                        <a-form-item label="运算符">
                          <a-select v-decorator="['stringSelect', {initialValue: '0', rules: [{ required: false }]}]">
                            <a-select-option value="0">等于</a-select-option>
                            <a-select-option value="1">不等于</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item >
                          <a-input name="stringInput" v-decorator="['numberInput', {rules: [{ required: true, message: '请输入字符串！' }]}]"/>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'select'">
                      <a-form :form="selectForm">
                        <a-form-item label="运算符">
                          <a-select v-decorator="['selectSelect', {initialValue: '0', rules: [{ required: false }]}]">
                            <a-select-option value="0">等于</a-select-option>
                            <a-select-option value="1">不等于</a-select-option>
                            <a-select-option value="2">小于</a-select-option>
                            <a-select-option value="3">大于</a-select-option>
                            <a-select-option value="4">小于或等于</a-select-option>
                            <a-select-option value="5">大于或等于</a-select-option>
                            <a-select-option value="6">包含</a-select-option>
                            <a-select-option value="7">不包含</a-select-option>
                            <a-select-option value="8">起始字符</a-select-option>
                          </a-select>
                        </a-form-item>
                        <a-form-item label="值">
                          <a-select mode="multiple" v-decorator="['selectMultiple', { rules: [{ required: true, message: '请选择值！' }]}]"
                            showSearch
                            allowClear
                            :filterOption="filterOption">
                            <a-select-option v-for="(item, index) in selectMultiple" :key="index" :value="item.value">
                              {{item.title}}
                            </a-select-option>
                          </a-select>
                        </a-form-item>
                      </a-form>
                    </div>
                    <div v-if="item.type == 'list'">这是列表类型</div>
                    <div class="content-footer">
                      <a-button size="small" @click="hidePopover(item)">取消</a-button>
                      <a-button size="small" type="primary" @click="enterPopover(item)">应用</a-button>
                    </div>
                  </div>
                  <div class="According-item">
                    <div class="lpc-fixed-text">
                      <p class="title">{{item.title}}</p>
                      <p class="text">{{item.text}}</p>
                    </div>
                    <a-tooltip placement="right" v-if="!item.type"> <!-- 判断固定项不显示删除按钮 -->
                      <template slot="title">
                        <span>删除</span>
                      </template>
                      <a-icon type="close" @click="deleteFixed"/>
                    </a-tooltip>
                  </div>
                </a-popover>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!-- rightTable -->
      <div class="lpc-rightTable">
        <div class="table-header">
          <div class="table-header-left">
            <a-input ref="titleName" v-if="titleNameEdit" :value="titleName" @change="e => titleNameEditFun(e.target.value)" style="width: 200px;"/>
            <template v-else>{{titleName}}</template>
            <div v-if="!titleNameEdit" class="header-icon">
              <a-icon type="edit" @click="editTitleName"></a-icon>
            </div>
            <div v-else class="header-icon">
              <a-icon type="check" @click="saveEditTitleName"></a-icon>
              <a-icon type="close" @click="cancelEditTitleName"></a-icon>
            </div>
          </div>
          <div class="table-header-right">
            <a-button type="primary" :loading="saveLoading" @click="saveFun">保存</a-button>
            <a-button type="primary" class="runBtn" :loading="runLoading" @click="runFun">运行</a-button>
          </div>
        </div>
        <div class="table-content" ref="tableContent">
          <a-table :columns="columns" :dataSource="data" bordered :scroll="screenWidth"></a-table>
          <!-- <div class="ant-table-body">
            <table>
              <thead>
                <tr>
                  <th v-for="(item, index) in columns" :key="index" :style="{width: item.title.length * 18 + 'px'}">{{item.title}}</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div> -->
        </div>
      </div>
    </div>
    <a-form class="lpc-form-footer">
      <a-form-item>
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
    <!-- 弹窗层 -->
    <a-modal
        :visible="showFormulaFlag"
        :title="showFormulaTitle"
        okText='确认'
        cancelText='取消'
        @cancel="formulaCancel"
        @ok="formulaCreate"
        class="formulaModal"
      >
        <div class="modalContent">
          <div class="modalLeftTab">
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="字段" key="1">
                <div class="leftMenu">
                  <div class="lpc-full">
                    <div class="header">
                      <a-input-search placeholder="搜索字段" @change="onChangeField" />
                    </div>
                    <div class="treeContent">
                      <a-tree
                        @expand="onExpandField"
                        :expandedKeys="expandedKeysField"
                        :autoExpandParent="autoExpandParentField"
                        :treeData="dataSource"
                        @select="onselectTreeField"
                        ><!-- @select="selectTreeFun($event)" -->
                        <template slot="title" slot-scope="{title}">
                          <span v-if="title.indexOf(searchValueField) > -1">
                            {{title.substr(0, title.indexOf(searchValueField))}}
                            <span style="color: #f50">{{searchValueField}}</span>
                            {{title.substr(title.indexOf(searchValueField) + searchValueField.length)}}
                          </span>
                          <span v-else>{{title}}</span>
                        </template>
                      </a-tree>
                    </div>
                    <div class="footer">
                      <div>
                        <a-select defaultValue="SUM" style="width: 170px" v-model="fieldCalculate">
                          <a-select-option value="SUM">总和</a-select-option>
                          <a-select-option value="AVG">平均</a-select-option>
                          <a-select-option value="MIN">最小值</a-select-option>
                          <a-select-option value="MAX">最大值</a-select-option>
                        </a-select>
                        <a-button type="primary" :disabled="insertField" @click="insertFieldFun">插入 > </a-button>
                      </div>
                    </div>
                  </div>
                </div>
              </a-tab-pane>
              <a-tab-pane tab="函数" key="2">
                <div class="leftMenu">
                  <div class="lpc-full">
                    <div class="header">
                      <a-input-search placeholder="搜索函数" @change="onChangeFun" />
                    </div>
                    <div class="treeContent">
                      <a-tree
                        @expand="onExpandFun"
                        :expandedKeys="expandedKeysFun"
                        :autoExpandParent="autoExpandParentFun"
                        :treeData="dataSource"
                        @select="onSelectTreeFun"
                        ><!-- @select="selectTreeFun($event)" -->
                        <template slot="title" slot-scope="{title}">
                          <span v-if="title.indexOf(searchValueFun) > -1">
                            {{title.substr(0, title.indexOf(searchValueFun))}}
                            <span style="color: #f50">{{searchValueFun}}</span>
                            {{title.substr(title.indexOf(searchValueFun) + searchValueFun.length)}}
                          </span>
                          <span v-else>{{title}}</span>
                        </template>
                      </a-tree>
                    </div>
                    <div class="footer">
                      <div>
                        <a-button type="primary" style="margin-left: 191px" :disabled="insertFun" @click="insertFunFun">插入 > </a-button>
                      </div>
                    </div>
                  </div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
          <div class="modalRightTab">
            <a-tabs defaultActiveKey="1">
              <a-tab-pane tab="一般信息" key="1">
                <div class="message">
                  <a-form layout="vertical" :form="messageForm">
                    <a-form-item class="twoCol" label="列名称" :wrapper-col="{ span: 24 }">
                      <a-input name="colName" v-decorator="['colName', {rules: [{ required: true, message: '请输入列名称！' }]}]"/>
                    </a-form-item>
                    <a-form-item class="twoCol" label="描述" :wrapper-col="{ span: 24 }" style="margin-left: 20px">
                      <a-input name="describe" v-decorator="['describe', {rules: [{ required: false }]}]"/>
                    </a-form-item>
                    <a-form-item label="公式">
                      <a-textarea ref="formulaTextarea" value="" placeholder="请在此键入公式。" :rows="10" name="formula" v-decorator="['formula', { rules: [{ required: true, message: '请键入公式' }]}]"/>
                    </a-form-item>
                    <a-form-item style="margin-bottom: 0">
                      <a-button @click="checkGrammar">检查语法</a-button>
                    </a-form-item>
                  </a-form>
                </div>
              </a-tab-pane>
              <a-tab-pane tab="格式" key="2">
                <div class="message">
                  <a-form layout="vertical" :form="formatForm">
                    <a-form-item class="twoCol" label="格式" :wrapper-col="{ span: 24 }">
                      <a-select name="format" v-decorator="['format', {initialValue: 'num', rules: [{ required: false }]}]">
                        <a-select-option value="num">数字</a-select-option>
                        <a-select-option value="percentage">百分比</a-select-option>
                        <a-select-option value="currency">币种</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item class="twoCol" label="小数点" :wrapper-col="{ span: 24 }" style="margin-left: 20px">
                      <a-select name="decimalPoint" v-decorator="['decimalPoint', {initialValue: '0', rules: [{ required: false }]}]">
                        <a-select-option :key="i" v-for="(list, i) in 19" :value="i">{{i}}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item class="twoCol" label="此公式将在哪里应用?">
                      <a-radio-group v-model="radioValue">
                        <a-radio :value="0">所有汇总级别</a-radio>
                        <a-radio :value="1">仅限总合计</a-radio>
                        <a-radio :value="2">特定组</a-radio>
                      </a-radio-group>
                      <span v-if="radioValue === 2" style="margin-left: 20px">
                            <a-select name="specific" v-decorator="['specific', {initialValue: '0', rules: [{ required: false }]}]">
                              <a-select-option value="0">客户所有人</a-select-option>
                            </a-select>
                          </span>
                    </a-form-item>
                  </a-form>
                </div>
              </a-tab-pane>
            </a-tabs>
            <!-- <a-form :form="modalForm">
          
            </a-form> -->
          </div>
        </div>
    </a-modal>
  </div>
</template>

<script lang='ts'>
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import leftMenu from '@/components/report/step2LeftMenu.vue'
  // import middenTab from '@/components/report/step2MiddenTab.vue'
  import Draggable from 'vuedraggable'
  import formulaModal from '@/components/report/formulaModal.vue';
  /* import leftMenu2 from '@/components/report/leftMenu.vue' */
  import { getTextareaCursor, setTextareaCursor, addTextareaCursor } from '@/libs/util'
  @Component({
    components: { leftMenu, Draggable }
  })
  export default class sterp2 extends Vue {
    @Prop() reportId: any // 从父组件接收reportId
    loading: boolean = false
    selectMultiple:Array<any> = [ // 筛选器中复选框
      { value: 0, title: '同步中' },
      { value: 1, title: '不同' },
      { value: 2, title: '已审核' },
      { value: 3, title: '未找到' },
      { value: 4, title: '未启用' },
      { value: 5, title: '未比较' },
      { value: '', title: '无选择' }
    ]
    selectMultipleData: Array<string> = [] // 筛选器中复选框 选中的选项数据 
    aTagDatasH:Array<any> = [] // 组行
    aTagDatasL:Array<any> = []
    aTagDatasS:Array<any> = [] // 列数
    // 状态type time时间，number数字，string字符串，list列表， select复选框
    aTagDatasF:Array<any> = [{title: '订单日期', text: '111', type: 'time', popover: false, visible: false}, {title: '数字类型', text: '222', type: 'number', popover: false, visible: false }, {title: '复选框类型', text: '333', popover: false, type: 'select', visible: false }] // 固定筛选
    aTagDatasX:Array<any> = [{title: '字符串', text: '333', popover: false, type: 'string', visible: false}, {title: '复选框类型', text: '333', popover: false, type: 'select', visible: false }] // 显示筛选
   
    dragOptions: object = { // 拖拽组件相关配置
      sort: true, // 定义是否拖拽
      group: 'task', // string or array分组用的，同一组的不同的list可以相互拖拽
      scroll: true, // 拖放可以引起区域滚动
      scrollSpeed: 2, // 滚动速度
      animation: 150, // 动画时间
      ghostClass: 'dragable-ghost', // 拖拽是产生的副本影子单元样式，用来模拟被拖拽元素的排序情况
      chosenClass: 'dragable-chose', // 选中拖拽目标时样式
      dragClass: 'dragable-drag' // 拖拽中样式
    }
    titleName:string = '报表名称'
    titleNameEdit:boolean = false // 配置报表名称修改
    cancelTitleNameFlag:string = '' // 用于取消还原修改
    saveLoading:boolean = false
    runLoading:boolean = false
    columns:Array<object> = [{
        title: '移动后的序号',
        dataIndex: 'name',
        key: 1,
        width: 150
      }, {
        title: 'Ag移动后的序号e',
        dataIndex: 'age',
        key: 2,
        width: 150
      }, {
        title: '移动后的序号',
        dataIndex: 'address',
        key: 3,
        width: 150
      }, {
        title: '移动后的序号',
        dataIndex: 'name',
        key: 4,
        width: 150
      }, {
        title: 'Ag移动后的序号e',
        dataIndex: 'age',
        key: 5,
        width: 150
      }]
    data:Array<object> = [
      { key: 0, name: '嗯哼', age: '123', address: '啥玩意儿'},
      { key: 1, name: '嗯哼', age: '123', address: 'hhhh'},
      { key: 2, name: '嗯哼', age: '123', address: '啥玩意儿'},
      { key: 3, name: '嗯哼', age: '123', address: '啥玩意儿'},
      { key: 4, name: '嗯哼', age: '123', address: '啥玩意儿'}
    ]
    screenWidth: object = {x: 1000, y: 400}
    // tableWidth:number = 10
    // screenWidth:any = document.body.clientWidth
    rangeConfig:object = { // 筛选器时间组件规则
      rules: [{ type: 'array', required: true, message: '请选择时间！' }]
    }
    showFormulaFlag:boolean = false // 控制添加公式列模态框
    showFormulaTitle:string = '编辑公式列'

    expandedKeysField:Array<any> = []
    searchValueField:string = ''
    autoExpandParentField:boolean = true
    dataListField:Array<object> = []
    dataSource:Array<object> = [
      {
        title: '话题',
        key: '122',
        scopedSlots: {title: 'title'},
        selectable: false, // 配置节点是否可选
        children: [{
          title: 'AntDesign',
          scopedSlots: {title: 'title'},
          key: '10000',
        }, {
          title: 'AntDesign UI',
          scopedSlots: {title: 'title'},
          key: '10600',
        }]
      }, {
        title: '问题',
        scopedSlots: {title: 'title'},
        key: '1',
        selectable: false, // 配置节点是否可选
        children: [{
          title: 'AntDesign UI 有多好',
          scopedSlots: {title: 'title'},
          key: '60100'
        }, {
          title: 'AntDesign 是啥',
          scopedSlots: {title: 'title'},
          key: '30010'
        }]
      }, {
        title: '文章',
        scopedSlots: {title: 'title'},
        key: '123',
        selectable: false, // 配置节点是否可选
        children: [{
          title: 'AntDesign 是一个设计语言',
          scopedSlots: {title: 'title'},
          key: '100000',
        }]
    }];
    expandedKeysFun:Array<any> = []
    searchValueFun:string = ''
    autoExpandParentFun:boolean = true
    dataListFun:Array<object> = []
    isActive:boolean = false
    insertFun:boolean = true // 函数插入按钮
    insertField:boolean = true // 字段插入按钮
    fieldData:any = '' // 存放字段选中
    funData:any = '' // 存放函数选中
    wrapperCol:any = { span: 4}
    fieldCalculate:string = 'SUM' // 存放字段求值字段
    radioValue:number = 0 // 编辑公式列弹框 格式单选model
    formulaTextarea:string = '' // 编辑列公式弹框 公式内容

    treeMsg (e:object):void { // 接收子组件的值 的方法
      console.log('父组件' + e)
      if (this.aTagDatasS.indexOf(e) === -1) {
        this.aTagDatasS.push(e); // 将接收到的子组件传过来的值push到列数中
      }
    }

    beforeCreate () { // 挂载前创建ant form
      (this as any).timeForm = (this as any).$form.createForm(this); // 定义timeForm
      (this as any).numberForm = (this as any).$form.createForm(this); // 定义numberForm
      (this as any).stringForm = (this as any).$form.createForm(this); // 定义stringForm
      (this as any).selectForm = (this as any).$form.createForm(this); // 定义selectForm
      (this as any).modalForm = (this as any).$form.createForm(this); // 定义添加公式 弹窗modalForm
      (this as any).messageForm = (this as any).$form.createForm(this); // 定义添加公式 messageForm
      (this as any).formatForm = (this as any).$form.createForm(this); // 定义添加公式 formatForm
    }
    mounted () {
      const that:any = this;
      window.onresize = () => {
        return (() => {
          const elHeightValue: any = that.$refs.tableContent.offsetHeight - 64
          // that.tableWidth = {x: 1000, y: elHeightValue}
          // console.log(elWidthValue)
          console.log(that.screenWidth)
        })()
      }
    }
    nextStep ():void {
      let _this = this
      _this.loading = true
      setTimeout(() => {
        _this.loading = false
        _this.$emit('nextStep')
      }, 1000)
    }
    prevStep ():void {
      this.$emit('prevStep')
    }
    deleteAllGroup ():void { // 删除所有组
      this.aTagDatasH = []; // 清空组行
      // console.log((this as any).$refs.handleChangeH)
    }
    handleChangeH (value:any):void { // 报表设置栏 组行 搜索框下拉选择方法
      if (value) {
        let obj:object = { text: value }
        if (this.aTagDatasH.indexOf(obj) === -1) {
          this.aTagDatasH.push(obj)
        }
      }
    }
    handleChangeS (value:any):void { // 报表设置栏 列数
      if (value) {
        let obj:object = { text: value }
        if (this.aTagDatasS.indexOf(obj) === -1) {
          this.aTagDatasS.push(obj)
          console.log(this.aTagDatasS)
        }
      }
    }
    handleChangeF (value:any):void { // 固定筛选
      if (value) {
        let obj:object = { title: value, text: '111', type: 'string', popover: true, visible: true }
        console.log(this.aTagDatasF)
        console.log(this.aTagDatasF.indexOf(obj))
        if (this.aTagDatasF.indexOf(obj) === -1) {
          this.aTagDatasF.push(obj)
        }
      }
    }
    handleChangeX (value:any):void { // 显示筛选
      if (value) {
        // this.aTagDatasX.push({ title: value, text: '111', type: 'time', popover: true, visible: true })
        let obj:object = { title: value, text: '111', type: 'time', popover: true, visible: true }
        if (this.aTagDatasX.indexOf(obj) === -1) {
          this.aTagDatasX.push(obj)
        }
      }
    }
    filterOption (input:any, option:any):boolean { // 搜索框输入搜索 过滤方法
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    handleBlur ():void {
    }
    handleFocus ():void {
    }
    handleBlurF ():void { // 固定筛选器失去焦点
      // this.aTagDatasF.pop()
    }
    handleBlurX ():void { // 显示筛选器失去焦点
      // this.aTagDatasX.pop()
    }
    // to:移动到的列表的容器, from:来源列表容器, item:被移动的单元, clone:副本的单元, oldIndex:移动前的序号, newIndex:移动后的序号
    onEnd (to:any, from:any, item:any, clone:any, oldIndex:any, newIndex:any):void { // 拖拽移动结束
      console.log('移动到的列表的容器' + to)
      console.log('来源列表容器' + from)
      console.log('被移动的单元' + item)
      console.log('副本的单元' + clone)
      console.log('移动前的序号' + oldIndex)
      console.log('移动后的序号' + newIndex)
    }
    onUpdate (to:any, from:any, item:any, clone:any, oldIndex:any, newIndex:any):void { // 拖拽移动排序发生变化时

    }
    deleteGroup ():void { // 删除组行，列数方法

    }
    deleteFixed ():void { // 删除固定筛选项方法

    }
    clickAccording (e:any):void { // 点击筛选器
      const value = e.target
      console.log(value)
    }

    popoverVisibleFun (e:any, item:any) { // 筛选器点击 是否显示气泡框事件
      console.log(item.type)
    }

    handleClickChange (v:any):void {
      console.log(v)
    }
    hidePopover (e:any):void { // 取消关闭气泡框
      console.log(e)
      e.popover = false
    }
    enterPopover (e:any):void { // 确认应用关闭气泡框
      console.log(e);
      const that = this;
      if (e.type === 'time') {
        (this as any).timeForm.validateFields((err: any, values: any) => {
          if (!err) {
            const rangeValue:any = values['range-picker']
            const subData:any = {
              ...values,
              'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]
            }
            // console.log(subData)
            e.text = rangeValue[0].format('YYYY-MM-DD') + ' - ' + rangeValue[1].format('YYYY-MM-DD')
            console.log(e);
            e.popover = false;
            (this as any).timeForm.resetFields(); // 重置输入控件的值
          }
        })
      } else if (e.type === 'number') {
        (this as any).numberForm.validateFields((err: any, values: any) => {
          if (!err) {
            console.log(values)
            e.text = values.numberSelect + '  ' + values.numberInput
            e.popover = false;
            (this as any).numberForm.resetFields(); // 重置输入控件
          }
        })
      } else if (e.type === 'string') {
        (this as any).stringForm.validateFields((err:any, values: any) => {
          if (!err) {
            console.log(values)
            e.text = values.stringSelect + '  ' + values.stringInput
            e.popover = false;
            (this as any).numberForm.resetFields(); // 重置输入控件
          }
        })
      } else if (e.type === 'select') {
        (this as any).selectForm.validateFields((err:any, values:any) => {
          if (!err) {
            that.selectMultiple.map((v:any, i:number) => { // 遍历所有
              values.selectMultiple.map((val:any, ind: number) => { // 遍历选中
                if (val === v.value) { // 比较
                  that.selectMultipleData.push(v.title)
                }
              })
            })
            console.log(that.selectMultipleData)
            e.text = values.selectSelect + '  ' + that.selectMultipleData.join(',')
          }
        })
      }
    }
    selectMultipleFun (v:any):void { // 筛选器弹框中 复选框change方法
      console.log(v)
    }
    titleNameEditFun (e:string) { // 报表名称修改方法
      this.titleName = e // 将输入的赋值给其名称
    }
    editTitleName ():void { // 点击修改按钮方法
      this.titleNameEdit = true
      this.cancelTitleNameFlag = this.titleName // 获取titleName作为flag用于取消还原
    }
    saveEditTitleName ():void { // 保存修改
      this.titleNameEdit = false
    }
    cancelEditTitleName ():void { // 取消还原修改
      this.titleNameEdit = false
      this.titleName = this.cancelTitleNameFlag // 取消时将之前的titleName还原
    }
    saveFun ():void { // 保存方法
      this.saveLoading = true
      let _this = this
      setTimeout(() => {
        _this.saveLoading = false
      }, 2000)
    }
    runFun ():void { // 运行方法
      this.runLoading = true
      let _this = this
      setTimeout(() => {
        _this.runLoading = false
      }, 2000)
    }

    timeOnChange (date:any, dateString:any):void { // 时间筛选器变化

    }
    showFormulaModel ():void { // 添加汇总公式弹窗方法
      this.generateList(this.dataSource) // 先处理数据
      this.showFormulaFlag = true
    }
    formulaCreate ():void { // 模态框确认方法

    }
    formulaCancel ():void { // 模态框取消关闭方法
      this.showFormulaFlag = !this.showFormulaFlag
    }

    /* 模态框搜索树处理方法 start */
    generateList (data:any):void { // 将数据处理成只有一个层级
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        this.dataListField.push({ count: node.count, title: node.title, key: node.key }) // 字段
        this.dataListFun.push({ count: node.count, title: node.title, key: node.key }) // 函数
        if (node.children) {
          (this as any).generateList(node.children, node.key)
        }
      }
    }
    getParentKey (key:string, tree:any):void {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some((item:any) => item.key === key)) {
            parentKey = node.key
          } else if ((this as any).getParentKey(key, node.children)) {
            parentKey = (this as any).getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    }
    onExpandField (expandedKeys:any):void {
      this.expandedKeysField = expandedKeys
      this.autoExpandParentField = false
    }
    onChangeField (e:any):void {
      const value = e.target.value
      const expandedKeysField = this.dataListField.map((item:any) => { // 遍历 查询所有的节点
        if (item.title.indexOf(value) > -1) {
          return (this as any).getParentKey(item.key, this.dataSource)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i) // 过滤出要打开的节点
      Object.assign(this, {
        expandedKeysField,
        searchValueField: value,
        autoExpandParentField: true
      })
    }

    onExpandFun (expandedKeys:any):void {
      this.expandedKeysFun = expandedKeys
      this.autoExpandParentFun = false
    }
    onChangeFun (e:any):void {
      const value = e.target.value
      const expandedKeysFun = this.dataListFun.map((item:any) => { // 遍历 查询所有的节点
        if (item.title.indexOf(value) > -1) {
          return (this as any).getParentKey(item.key, this.dataSource)
        }
        return null
      }).filter((item, i, self) => item && self.indexOf(item) === i) // 过滤出要打开的节点
      Object.assign(this, {
        expandedKeysFun,
        searchValueFun: value,
        autoExpandParentFun: true
      })
    }
    onselectTreeField (selectedKeys:any, info:any):void { // 字段选中
      console.log('selectedKeys' + selectedKeys)
      console.log(info)
      this.fieldData = info.node.dataRef // 将选中的字段保存到fieldData中
      this.insertField = false
    }
    onSelectTreeFun (selectedKeys:any, info:any):void { // 函数选中
      this.funData = info.node.dataRef // 将选中的函数保存到funData中
      this.insertFun = false
    }
    /* end */
    insertFieldFun ():void { // 字段插入方法
      debugger
      // console.log((this as any).$refs.fieldCalculate)
      // console.log(this.$refs.fieldCalculate as HTMLDivElement)
      // console.log(this.fieldCalculate)
      // console.log(this.fieldData)
      let textarea:any = (this as any).$refs.formulaTextarea.$el // 获取文本域元素
      let cursor:any = getTextareaCursor(textarea) // 先调用获取位置方法
      let text: string = this.fieldData.title + ': ' + this.fieldCalculate + ' '
      addTextareaCursor(textarea, cursor, text) // 调用插入文本方法
      // this.formulaTextarea += ' ' + this.fieldData.title + ': ' + this.fieldCalculate
      console.log(this.formulaTextarea)
    }
    insertFunFun ():void { // 函数插入方法
      let textarea:any = (this as any).$refs.formulaTextarea.$el // 获取文本域元素
      let cursor:any = getTextareaCursor(textarea) // 先调用获取位置方法
      let text: string = this.funData.title + ' '
      addTextareaCursor(textarea, cursor, text) // 调用插入文本方法
      // this.formulaTextarea += ' ' + this.fieldData.title + ': ' + this.fieldCalculate
      console.log(this.funData)
    }
    checkGrammar ():void { // 模态框 检查语法方法

    }
 }
</script>

<style lang='scss' rel='stylesheet/scss'>
.lpc-step2-content {
  display: flex;
  border: 1px solid #e8e8e8;
  .lpc-centerTab {
    width: 233px;
    border-right: 1px solid #e8e8e8;
    .ant-tabs .ant-tabs-bar {
      margin: 0;
    }
    .ant-tabs-nav-wrap {
      background-color: #f9f7f7;
      border-bottom: 1px solid #e8e8e8;
      height: 43px;
      line-height: 43px;
      margin-bottom: 0;
      .ant-tabs-tab {
        margin: 0;
        padding: 0 26px;
      }
    }
    .lpc-tab1-content {
      padding: .875rem 1rem;
      height: calc(80vh - 43px);
      overflow-y: scroll;
      .tab1-top {
        .tab1-top-header {
          margin-bottom: .5rem;
          line-height: 19px;
          display: flex;
          h4 {
            flex: 1;
            display: inline-block;
            color: #6b6d70;
            font-weight: 700;
            font-size: .8125rem;
          }
          i.anticon-delete {
            cursor: pointer;
            font-size: 14px;
            // margin-right: 10px;
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          i.anticon-delete:hover {
            color: #1890ff;
          }
        }
        .tab1-top-content {
          h4 {
            font-size: .6875rem;
            color: #6b6d70;
            text-transform: uppercase;
            display: -ms-flexbox;
            display: box;
            display: flex;
            -o-box-align: center;
            align-items: center;
            margin-bottom: .25rem;
            line-height: 2;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
        }
      }
      .tab1-bottom {
        .tab1-bottom-header {
          margin-bottom: .5rem;
          line-height: 19px;
          display: flex;
          h4 {
            flex: 1;
            color: #6b6d70;
            font-weight: 700;
            font-size: .8125rem;
            text-transform: uppercase;
            -o-box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-bottom: .25rem;
            line-height: 2;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          a.ant-dropdown-trigger {
            cursor: pointer;
            // margin-right: 10px;
            margin-top: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            :hover {
              color: #1890ff;
            }
            .anticon-down-square {
              font-size: 14px;
            }
          }
        }
      }
      .task-content{ // 公用拖拽模块样式
        .task-item {
          font-variant: tabular-nums;
          width: 100%;
          color: rgba(0, 0, 0, 0.65);
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin: 5px 0;
          line-height: 22px;
          height: 22px;
          padding: 0 7px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          background: #fafafa;
          font-size: 12px;
          -webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          opacity: 1;
          white-space: nowrap;
          :hover {
            cursor: move;
          }
          .anticon-close {
            display: inline-block;
            float: right;
            margin-top: 5px;
            color: rgb(176, 173, 171);
            :hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .lpc-tab2-content {
      padding: .875rem 1rem;
      height: calc(80vh - 43px);
      overflow-y: scroll;
      .tab2-top-header {
        margin-bottom: .5rem;
        line-height: 19px;
        display: flex;
        h4 {
          flex: 1;
          color: #6b6d70;
          font-weight: 700;
          font-size: .8125rem;
          text-transform: uppercase;
          -o-box-align: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-bottom: .25rem;
          line-height: 2;
          overflow-x: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        a.ant-dropdown-trigger {
          cursor: pointer;
          font-size: .75rem;
          // margin-right: 10px;
          margin-top: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          :hover {
            color: #1890ff;
          }
          .anticon-down-square {
            font-size: 14px;
          }
        }
      }
      .screening-content,.According-content {
        .screening-item,.According-item {
          background-color: #fbfbfb;
          padding: 0 7px;
          border-radius: 4px;
          border: 1px solid #d9d9d9;
          margin: 3px 0;
          cursor: pointer;
          display: flex;
          .lpc-fixed-text {
            flex: 1;
            display: inline-block;
            .title {
              font-size: .75rem;
              text-overflow: ellipsis;
              overflow-x: hidden;
              color: #6b6d70;
              font-weight: 400;
            }
            .text {
              font-size: .8125rem;
              font-weight: 400;
              color: #16325c;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .anticon-close {
            line-height: 35px;
            color: rgb(176, 173, 171);
            :hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .lpc-rightTable {
    width: 100%;
    overflow-x: scroll;
    .table-header {
      height: 43px;
      line-height: 43px;
      background-color: #f9f7f7;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      .table-header-left {
        display: inline-block;
        flex: 1;
        .header-icon {
          display: inline-block;
          margin-left: 10px;
          font-size: 15px;
          .anticon-edit {
            color: #1dd9e2c7;
            cursor: pointer;
          }
          .anticon-check {
            color: #3fb54b;
            cursor: pointer;
            margin-right: 5px;
          }
          .anticon-close {
            color: #e84545;
            cursor: pointer;
          }
        }
      }
      .table-header-right {
        display: inline-block;
        margin-right: 20px;
        .runBtn {
          margin-left: 10px;
          background-color: #1dd9e2c7;
          border: #1dd9e2c7
        }
      }
    }
    .table-content {
      height: calc(80vh - 43px);
      /* width: 100%;
      overflow-x: scroll;
      table tr th {
        padding: 12px 8px;
        border-right: 1px solid #e8e8e8;
        background: #fafafa;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        border-bottom: 1px solid #e8e8e8;
        white-space: nowrap;
      } */
      .ant-table-header {
        /* min-width: 1000px;
        thead tr th {
          white-space: nowrap;
        }  */
      }
      table tr {
        th {
          text-align: center;
        }
      }
    }
  }
}
.lpc-form-footer { // 底部按钮样式
  text-align: center;
  .ant-form-item {
    margin: 12px 0;
  }
}
.ant-popover { // 筛选器弹框样式
  .ant-popover-inner-content {
    .ant-form-item {
      margin-bottom: 12px;
      .ant-form-item-control {
        width: 250px;
      }
    }
    .content-footer {
      text-align: right;
      .ant-btn-primary {
        margin-left: 10px;
      }
    }
  }
}
.formulaModal { // 编辑公式列模态框样式
  width: 950px!important;
  .ant-modal-body {
    padding: 0!important;
    .modalContent {
      display: flex;
      .modalLeftTab {
        display: inline-block;
        width: 300px;
        flex: 0 0 300px;
        background-color: #f9f9fa;
        padding: 0 1rem;
        border-right: 1px solid #d9dbdd;
        .ant-tabs-nav-wrap {
          border-bottom: 1px solid #e8e8e8;
          height: 45px;
          margin-bottom: 0;
          .ant-tabs-tab-active {
            color: rgb(8, 7, 7);
          }
        }
        .ant-tabs-tabpane {
          padding: 0 5px;
        }
      }
      .modalRightTab {
        display: inline-block;
        flex: 1;
        padding: 0 1rem;
        .ant-tabs-nav-wrap {
          border-bottom: 1px solid #e8e8e8;
          height: 45px;
          margin-bottom: 0;
          .ant-tabs-tab-active {
            color: rgb(8, 7, 7);
          }
        }
        .ant-tabs-tabpane {
          padding: 0 5px;
        }
        .message {
          .ant-form-vertical {
            .twoCol {
              display: inline-block;
              width: 48%;
              .ant-radio-wrapper {
                height: 30px;
                line-height: 30px;
                display: block;
                textarea {
                  height: 265px;
                  resize: none;
                }
              }
            }
          }
        }
      }
      .leftMenu {
        .header {
          .ant-input-search {
            width: 265px;
          }
        }
        .treeContent { // 模态框中tree内容样式
          // height: calc(80vh - 22.6875rem);
          height: 360px;
          width: 265px;
          overflow: scroll;
          background-color: #fff;
          border: 1px solid #d9dbdd;
          border-radius: .25rem;
          margin: .625rem 0 .75rem;
          padding: 0 .5rem;
        }
        .footer {
          margin: 10px 0;
          button {
            margin-left: 21px;
          }
        }
      }
    }
  }
}
</style>
