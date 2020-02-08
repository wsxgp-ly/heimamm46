<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
      <!-- 顶部的标题 -->
      <div class="title_box">
        <img src="../../assets/矢量智能对象 拷贝 9.png" alt class="logo" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub_title">用户登录</span>
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="42px">
          <el-form-item >
            <el-input  v-model="form.user" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              show-password
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="15">
              <el-input v-model="form.yanzheng" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
              
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="form.checkout">
              <el-checkbox name="type">
                我已阅读并同意
                <el-link type="primary">用户协议</el-link>和
                <el-link type="primary">隐私条款</el-link>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button class="mybut" type="primary" @click="onSubmit">登录</el-button>
            <el-button class="mybut" type="primary">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        user: "",
        password: "",
        yanzheng: "",
        checkout: false,
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
      onSubmit() {
        window.console.log('submit!');
      }
    }
};
</script>

<style lang="less">
// 大盒子
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
// 左侧盒子
  .left-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    .title_box {
      display: flex;
      align-items: center;
      margin-top: 44px;
      margin-left: 48px;
      .logo {
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        margin-left: 16px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .sub_title {
        font-size: 21px;
        margin-left: 12px;
      }
    }
    .content {
      width: 100%;
      margin-top: 29px;
      .el-form-item__content {
          width: 394px;
          .imgs{
              width: 100px;
              height: 40px;
          }
        .mybut {
          margin-left: 0;
          width: 100%;
          margin-bottom: 25px;
        }
      }
    }
  }

}
</style>