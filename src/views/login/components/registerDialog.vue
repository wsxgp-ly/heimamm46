<template>
  <el-dialog
    center
    class="register-dialog"
    width="603px"
    title="用户注册"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <!-- 验证码 -->
          <el-col :span="7" :offset="1" class="register-box">
            <img class="register-code" :src="codeURL" @click="changeCode" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <!-- 获取手机验证码按钮 -->
          <el-col :span="7" :offset="1">
            <el-button @click="getSMS" :disabled="delay != 0">{{delay == 0 ?'点击获取验证码' : `还有${delay}秒继续获取`}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
const checkPhone = (rule, value, callback) => {
  // 接收参数 value
  // 定义正则表达式
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 使用正则校验格式是否满足
  if (reg.test(value) == true) {
    // 对
    callback();
  } else {
    // 错
    callback(new Error("手机号格式不对哦，请检查"));
  }
};

// 验证邮箱的 函数
const checkEmail = (rule, value, callback) => {
  // 接收参数 value
  // 定义正则表达式
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 使用正则校验格式是否满足
  if (reg.test(value) == true) {
    // 对
    callback();
  } else {
    // 错
    callback(new Error("邮箱格式不对哦，请检查"));
  }
};

export default {
  data() {
    return {
      // 是否显示对话框
      dialogFormVisible: false,
      //   表单的数据
      form: {
        // 昵称
        username: "",
        // 密码
        password: "",
        // 手机
        phone: "",
        //邮箱
        email: "",
        // 手机验证码
        code:'',
      },
      // 效验规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "用户名长度为6到12位", trigger: "change" }
        ],
        password: [
          { required: true, message: "密码名不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码名长度为6到12位", trigger: "change" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // trigger 触发是执行 validator设置的函数
          { validator: checkPhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          // trigger 触发是执行 validator设置的函数
          { validator: checkEmail, trigger: "blur" }
        ]
      },
      //   左侧的文本宽度
      formLabelWidth: "62px",
      codeURL:process.env.VUE_APP_URL+"/captcha?type=sendsms",
      delay:0
    };
  },
  methods: {
    // 点击按钮获取手机验证码 
    getSMS(){
      // 如果为0开启倒计时
      if (this.delay==0) {
        this.delay = 60;
        const interID = setInterval(() => {
          // 时间递减
          this.delay--
          if (this.delay == 0) {
            // 清除定时器
            clearInterval(interID);
            
          }
        }, 100);
      }
      // 调用接口
      axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data: {
          code:this.form.code,
          phone:this.form.phone
        },
        // 是否跨域携带 cookie   默认是false
        withCredentials:true
      }).then(res=>{
        //成功回调
        // window.console.log(res)
        if (res.data.code === 200) {
          this.$message.success('验证码获取成功'+res.data.data.captcha)
        } else if(res.data.code === 0) {
          this.$message.error(res.data.messgae)
        }
      });
    },
    changeCode(){
      // 随机数
      // this.codeURL=process.env.VUE_APP_URL+"/captcha?type=sendsms&"+Math.random()
      // 时间戳
      this.codeURL=process.env.VUE_APP_URL+"/captcha?type=sendsms&"+Date.now()
    }
  },
};
</script>

<style lang='less'>
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #0dbfef, #1792f8);
  }
  .el-dialog__title {
    color: #fff;
  }
  .register-box {
    height: 41px;
  }
  .register-code {
    height: 41px;
    width: 100%;
  }
}
</style>