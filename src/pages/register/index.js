import AV from "leancloud-storage";
import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtToast } from "taro-ui";

import Head from "../../components/Head";
import Fool from "../../components/Fool";

import "./index.scss";

export default class Register extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  constructor() {
    super(...arguments);
    this.state = {
      name: "",
      phone: "",
      code: "",
      pwd: "",
      invite: '',
      time: 0,
      interval: null
    };
  }
  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }
  /**
   * 发送验证码
   */
  async onSendCode() {
    if (this.state.time != 0) {
      this.setState({ isOpened: true, text: "等待 60 秒后再次尝试" });
    } else if (this.state.phone.length != 11) {
      this.setState({ isOpened: true, text: "手机位数不对" });
    } else {
      try {
        await AV.Cloud.requestSmsCode(this.state.phone);
        this.setState({ isOpened: true, text: "已发送验证码" });
        this.setTiem();
      } catch (error) {
        this.setState({ isOpened: true, text: "频率过多" });
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

  /**
   * 登录
   */

  async onSubmit() {
    if (this.state.name.length == 0)
      this.setState({ isOpened: true, text: "请输入名字" });
    else if (this.state.phone.length != 11)
      this.setState({ isOpened: true, text: "手机位数不对" });
    else if (this.state.code.length != 6)
      this.setState({ isOpened: true, text: "验证码不正确" });
    else if (this.state.pwd.length == 0)
      this.setState({ isOpened: true, text: "请输入密码" });
    else {
      console.log(111, this.state.name.length);
      try {
        await AV.User.signUpOrlogInWithMobilePhone(
          this.state.phone,
          this.state.code
        );
        // 设置账号密码
        const currentUser = AV.User.current();
        currentUser.setUsername(this.state.phone);
        currentUser.setPassword(this.state.pwd);
        currentUser.set("name", this.state.name);
        currentUser.set("invite", this.state.invite);
        const time = Date.now() + '';
        window.localStorage.setItem("time", time);
        currentUser.set('time',time);
        await currentUser.save();

        Taro.navigateTo({
          url: "/"
        });
      } catch (error) {
        this.setState({ isOpened: true, text: "验证码不正确" });
      }
    }

    setTimeout(() => {
      this.setState({ isOpened: false });
    }, 3000);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="register">
        <Head />
        <View className="card">
          <AtForm className="form">
            <Text className="form-title">注册</Text>
            <AtInput
              name="name"
              title="昵称"
              type="text"
              placeholder="请入您的名字"
              maxlength="15"
              value={this.state.name}
              onChange={this.handleChange.bind(this, "name")}
            />
            <AtInput
              name="phone"
              title="手机号"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              value={this.state.phone}
              onChange={this.handleChange.bind(this, "phone")}
            >
              <Text className="qc-code" onClick={this.onSendCode.bind(this)}>
                {this.state.time == 0
                  ? "发送验证码"
                  : `等待 ${this.state.time} 再次发送`}
              </Text>
            </AtInput>
            <AtInput
              name="code"
              title="验证码"
              type="text"
              placeholder="请输入验证码"
              maxlength="6"
              value={this.state.code}
              onChange={this.handleChange.bind(this, "code")}
            />
            <AtInput
              name="pwd"
              title="密码"
              type="password"
              placeholder="建议密码不少于6位数"
              maxlength="20"
              value={this.state.pwd}
              onChange={this.handleChange.bind(this, "pwd")}
            />
            <AtInput
              name="invite"
              title="邀请码"
              type="text"
              placeholder="非必填"
              value={this.state.invite}
              onChange={this.handleChange.bind(this, "invite")}
            />
            
            <AtButton onClick={this.onSubmit.bind(this)}>注册</AtButton>
          </AtForm>
        </View>
        <AtToast isOpened={this.state.isOpened} text={this.state.text} />
        <Fool />
      </View>
    );
  }
}

// import queryString from "query-string";
// const xxx = "http://user:pass@host.com:8080/p/a/t/h?query=string#hash";
// console.log(queryString.parse(xxx));
