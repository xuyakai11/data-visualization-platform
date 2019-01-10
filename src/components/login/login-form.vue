<template>
  <a-form ref="loginForm" :form="form" id="login-form" @submit="handleSubmit" class="login-form">
    <a-form-item>
      <a-input placeholder="用户名"
        v-decorator="['userName', {rules: [{required: true, message: '请输入用户名'}]}]"
      >
        <a-icon slot="prefix" type="user" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input placeholder="密码"
        type="password"
        v-decorator="['password', {rules: [{required: true, message: '请输入密码'}]}]"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" class="login-form-button" htmlType="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang='ts'>
 import { Component, Prop, Vue } from 'vue-property-decorator'

 @Component({})
 export default class loginForm extends Vue {
   /* interface form {
     user: string,
     password: string
   }  */
  /*   @Prop() private msg!: string; */

    beforeCreate () {
       this.form = this.$form.createForm(this)
       console.log(this.form)
    }
    created () {

    }
    // 方法
    handleSubmit (e: any): void {
      e.preventDefault()
      this.form.validateFields((err: any, values) => { // 校验
        console.log(values)
        if (!err) {
          alert('fuck')
        }
      })
    }
    // 计算属性get
    
 }
</script>

<style lang='scss' scoped>
  #login-form {
    i {
      color: rgba(0, 0, 0, .25)
    }
    .login-form-button {
      width: 100%
    }
  }
</style>
