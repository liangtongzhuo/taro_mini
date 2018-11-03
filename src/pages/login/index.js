import Taro, { Component } from "@tarojs/taro";
import { View,  Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";

import Head from "../../components/Head";
import Fool from "../../components/Fool";

import "./index.scss";

export default class Login extends Component {
  config = {
    navigationBarTitleText: "登录"
  };

  constructor() {
    super(...arguments);
    this.state = {
      value: ""
    };
  }
  handleChange(value) {
    this.setState({
      value
    });
  }
  onSkipFindPassword() {
    Taro.navigateTo({
      url: "/pages/findPassword/index"
    });
  }
  onSubmit(event) {
    console.log(event);
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
          <AtForm className="form" onSubmit={this.onSubmit.bind(this)}>
            <Text className="form-title">登录</Text>
            <AtInput
              clear
              title="手机号"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name="value3"
              title="密码"
              type="password"
              placeholder="密码不少于10位数"
              maxlength="20"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
            <AtButton formType="submit">登录</AtButton>
            <Text
              className="findPassword"
              onClick={this.onSkipFindPassword.bind(this)}
            >
              忘记密码？
            </Text>
          </AtForm>
        </View>
        <Fool />
      </View>
    );
  }
}
