import AV from "leancloud-storage";
import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtToast } from "taro-ui";

import Head from "../../components/Head";
import Fool from "../../components/Fool";

import "./index.scss";

export default class FindPassword extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  constructor() {
    super(...arguments);
    this.state = {
      phone: "",
      code: "",
      pwd: "",
      time: 0,
      interval: null
    };
  }
  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }
  async sendCode() {
    if (this.state.time != 0) {
      this.setState({ isOpened: true, text: "等待 60 秒后再次尝试" });
    } else if (this.state.phone.length != 11) {
      this.setState({ isOpened: true, text: "手机位数不对" });
    } else {
      try {
        await AV.User.requestPasswordResetBySmsCode(this.state.phone);
        this.setTiem();
      } catch (error) {
        console.log(error);
        this.setState({ isOpened: true, text: "验证码发送失败" });
      }
    }

    setTimeout(() => {
      this.setState({ isOpened: false });
    }, 3000);
  }
  async onSubmit() {
    if (this.state.code.length != 6) {
      this.setState({ isOpened: true, text: "验证码不正确" });
    } else if (this.state.pwd.length == 0) {
      this.setState({ isOpened: true, text: "请输入密码" });
    } else {
      try {
        await AV.User.resetPasswordBySmsCode(this.state.code, this.state.pwd);
        Taro.navigateTo({
          url: "/pages/login/index"
        });
      } catch (error) {
        this.setState({ isOpened: true, text: "验证码不正确" });
      }
    }

    setTimeout(() => {
      this.setState({ isOpened: false });
    }, 3000);
  }

  setTiem() {
    this.setState({
      time: 60
    });
    this.interval = setInterval(() => {
      if (this.state.time == 0) {
        clearInterval(this.interval);
      } else {
        this.setState({
          time: this.state.time - 1
        });
      }
      console.log(this.state.time);
    }, 1000);
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="find-password">
        <Head />
        <View className="card">
          <AtForm className="form" onSubmit={this.onSubmit.bind(this)}>
            <Text className="form-title">找回密码</Text>
            <AtInput
              name="phone"
              title="手机号"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              value={this.state.phone}
              onChange={this.handleChange.bind(this, "phone")}
            >
              <Text className="qc-code" onClick={this.sendCode.bind(this)}>
                {this.state.time == 0
                  ? "发送验证码"
                  : `等待 ${this.state.time} 再次发送`}
              </Text>
            </AtInput>
            <AtInput
              name="code"
              title="验证码"
              type="text"
              placeholder="请查看手机验证码"
              maxlength="6"
              value={this.state.code}
              onChange={this.handleChange.bind(this, "code")}
            />
            <AtInput
              name="pwd"
              title="密码"
              type="password"
              placeholder="密码不少于10位数"
              maxlength="20"
              value={this.state.pwd}
              onChange={this.handleChange.bind(this, "pwd")}
            />
            <AtButton formType="submit" onClick={this.onSubmit.bind(this)}>
              找回密码
            </AtButton>
          </AtForm>
        </View>
        <AtToast isOpened={this.state.isOpened} text={this.state.text} />

        <Fool />
      </View>
    );
  }
}
