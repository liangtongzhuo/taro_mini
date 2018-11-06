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
      pwd: ""
    };
  }
  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  async onSendCode() {
    if (this.state.phone.length != 11)
      this.setState({ isOpened: true, text: "手机位数不对" });
    try {
      await AV.Cloud.requestSmsCode(this.state.phone);      
      this.setState({ isOpened: true, text: "已发送验证码" });
    } catch (error) {
      console.log(error);
      this.setState({ isOpened: true, text: "频率过多" });
    }

    setTimeout(() => {
      this.setState({ isOpened: false });
    }, 3000);
  }
  onSubmit() {
    if (this.state.name.length == 0)
      this.setState({ isOpened: true, text: "请输入名字" });
    else if (this.state.phone.length != 11)
      this.setState({ isOpened: true, text: "手机位数不对" });
    else if (this.state.code.length != 6)
      this.setState({ isOpened: true, text: "验证码不正确" });
    else if (this.state.pwd.length == 0)
      this.setState({ isOpened: true, text: "请输入密码" });

    setTimeout(() => {
      this.setState({ isOpened: false });
      console.log(11);
    }, 5000);
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
                发送验证码
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
            <AtButton onClick={this.onSubmit.bind(this)}>注册</AtButton>
          </AtForm>
        </View>
        <AtToast isOpened={this.state.isOpened} text={this.state.text} />
        <Fool />
      </View>
    );
  }
}
