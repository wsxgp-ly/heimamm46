<template>
  <el-dialog
    center
    class="register-dialog"
    width="603px"
    title="用户注册"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
          <!-- 图形验证码 -->
          <el-col :span="7" :offset="1" class="register-box">
            <img class="register-code" :src="codeURL" @click="changeCode" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <!-- 手机验证码输入框 -->
          <el-col :span="16">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <!-- 获取手机验证码按钮 -->
          <el-col :span="7" :offset="1">
            <el-button
              @click="getSMS"
              :disabled="delay != 0"
            >{{delay == 0 ?'点击获取验证码' : `还有${delay}秒继续获取`}}</el-button>
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
// 导入 axios
// import axios from "axios";
// 导入注册接口
import {sendsms} from '@/api/register.js'
// 导入效验规则 函数
import { checkPhone, checkEmail } from "@/utils/validator.js";


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
        code: "",
        // 用户的头像地址
        avatar:""
      },
      // 效验规则
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "blur" },
         
        ],
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
      codeURL: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      delay: 0,
      // 本地的图片预览地址
      imageUrl:'',
      // 头像上传的接口地址
      uploadUrl:process.env.VUE_APP_URL  + "/uploads"
    };
  },
  methods: {
    // 点击按钮获取手机验证码
    getSMS() {
      // 手机号效验
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(this.form.phone) != true) {
        this.$message.error('手机号码的格式不对!请重新输入')
        return
      }
      // 图片验证码效验
      if (this.form.code.length != 4) {
        this.$message.error('验证码格式不对哦,请检查')
        return
      }
      // 如果为0开启倒计时
      if (this.delay == 0) {
        this.delay = 60;
        const interID = setInterval(() => {
          // 时间递减
          this.delay--;
          if (this.delay == 0) {
            // 清除定时器
            clearInterval(interID);
          }
        }, 100);
      }
      // 调用接口
      sendsms({
          code: this.form.code,
          phone: this.form.phone
        },).then(res => {
        //成功回调
        // window.console.log(res)
        if (res.data.code === 200) {
          this.$message.success("验证码获取成功" + res.data.data.captcha);
        } else if (res.data.code === 0) {
          this.$message.error(res.data.messgae);
        }
      });
    },
    // 点击图片刷新图形码
    changeCode() {
      // 随机数
      // this.codeURL=process.env.VUE_APP_URL+"/captcha?type=sendsms&"+Math.random()
      // 时间戳
      this.codeURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&" + Date.now();
    },
    // 图像文件上传成功
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // window.console.log(file);
        this.form.avatar = res.data.file_path

      },
      // 图像文件上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>