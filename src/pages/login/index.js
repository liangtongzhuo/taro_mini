import AV from "leancloud-storage";
import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton, AtToast } from "taro-ui";

import Head from "../../components/Head";
import Fool from "../../components/Fool";

import "./index.scss";
import "../../form.scss";

export default class Login extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  constructor() {
    super(...arguments);
    this.state = {
      phone: "",
      text: "",
      pwd: "",
      isOpened: false
    };
  }
  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  }
  onSkipFindPassword() {
    Taro.navigateTo({
      url: "/pages/findPassword/index"
    });
  }
  async onLogin() {
    if (this.state.phone.length != 11) {
      this.setState({ isOpened: true, text: "手机号" });
    } else if (this.state.pwd.length == 0) {
      this.setState({ isOpened: true, text: "密码没有输入" });
    } else {
      try {
        await AV.User.logIn(this.state.phone, this.state.pwd);
        Taro.navigateTo({
          url: "/"
        });
      } catch (error) {
        if (error.code === 219) {
          this.setState({ isOpened: true, text: "用户名和密码不匹配" });
        } else {
          this.setState({
            isOpened: true,
            text: "登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码"
          });
        }
        console.log(error.code);
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
      <View className="login">
        <Head />
        <View className="card">
          <AtForm className="form">
            <Text className="form-title">登录</Text>
            <AtInput
              clear
              title="手机号"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              value={this.state.phone}
              onChange={this.handleChange.bind(this, "phone")}
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
            <AtButton onClick={this.onLogin.bind(this)}>登录</AtButton>
            <Text
              className="findPassword"
              onClick={this.onSkipFindPassword.bind(this)}
            >
              忘记密码？
            </Text>
          </AtForm>
        </View>
        <AtToast isOpened={this.state.isOpened} text={this.state.text} />
        <Fool />
      </View>
    );
  }
}
