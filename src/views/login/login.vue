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
        <!-- 表单 -->
        <el-form ref="loginform" :rules="rules" :model="loginForm" label-width="42px">
          <!-- 手机号 -->
          <el-form-item>
            <el-input v-model="loginForm.user" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              show-password
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="loginCode">
            <el-row>
              <el-col :span="17">
                <el-input
                  v-model="loginForm.loginCode"
                  placeholder="请输入验证码"
                  prefix-icon="el-icon-key"
                ></el-input>
              </el-col>
              <el-col :span="7" class="code-col">
                <img class="login-code" src="../../assets/login_captcha.png" alt />
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 用户协议 -->
          <el-form-item>
            <el-checkbox v-model="loginForm.ischeckout">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="mybut" type="primary" @click="submitForm('loginform')">登录</el-button>
            <el-button class="mybut" type="primary" @click="showRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
    <registerDialog ref="registerDialog"></registerDialog>
  </div>
</template>

<script>
// 导入 注册对话框组件
import registerDialog from './components/registerDialog.vue'
export default {
  name: "login",
  components:{
    registerDialog
  },
  data() {
    return {
      // /数据
      loginForm: {
        // 用户名
        user: "",
        // 密码
        password: "",
        // 验证码
        loginCode: "",
        // 勾选框
        ischeckout: false
      },
      // 效验规则
      rules:{
        password:[
          {required:true, message:'密码不能为空', trigger:'blur'},
          {min:6, max:12, message:'密码长度为6-12位', trigger:'blur'}
        ],
        loginCode:[
           {required:true, message:'验证码不能为空', trigger:'blur'},
          {min:4, max:4, message:'密码长度为4位', trigger:'blur'}
        ]
      }
    };
  },
  // 方法
  methods: {
    // 提交表单
    submitForm(formName) {
        // 上面传入的 formName是 loginform
        // $refs作用是 获取 页面中使用ref标记的元素
        // 等同于 this.$refs['loginform'] 相当于获取到了Element-ui的表单
        // this.$refs['loginform'] 等同于 this.$refs.loginform
        // validate这个方法是Element-ui的表单的方法
        this.$refs[formName].validate((valid) => {
            if (valid) {
               this.$message.success('验证成功')
                // 验证正确
            } else {
                this.$message.error('验证失败')
                // 验证错误
                return false;
            }
        });
    },
    // 显示注册对话框
    showRegister(){
      this.$refs.registerDialog.dialogFormVisible = true
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
    padding-right: 41px;
    box-sizing: border-box;
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

      .imgs {
        width: 100px;
        height: 40px;
      }
      // 按钮
      .mybut {
        margin-left: 0;
        width: 100%;
        margin-bottom: 25px;
      }
    }
    // 登录验证码
    .login-code {
      width: 100%;
      height: 41px;
    }
    // 验证码的栅格容器 调整高度
    .code-col{
      height: 41px;
    }
  }
  // 用户协议部分对齐
  .el-checkbox {
    display: flex;
    align-items: center;
    .el-checkbox__label {
      display: flex;
    }
  }
}
</style>