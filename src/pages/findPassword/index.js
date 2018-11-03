import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtForm, AtInput, AtButton } from "taro-ui";

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
      value: ""
    };
  }
  handleChange(value) {
    this.setState({
      value
    });
  }
  onSkipFindPassword() {}
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
      <View className="find-password">
        <Head />
        <View className="card">
          <AtForm className="form" onSubmit={this.onSubmit.bind(this)}>
            <Text className="form-title">找回密码</Text>
            <AtInput
              name="value2"
              title="手机号"
              type="text"
              maxlength="11"
              placeholder="请输入手机号"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            >
              <Text className="qc-code">发送验证码</Text>
            </AtInput>
            <AtInput
              name="value3"
              title="验证码"
              type="text"
              placeholder="请查看手机验证码"
              maxlength="6"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
            <AtInput
              name="value4"
              title="密码"
              type="password"
              placeholder="密码不少于10位数"
              maxlength="20"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
            <AtButton formType="submit">找回密码</AtButton>
          </AtForm>
        </View>
        <Fool />
      </View>
    );
  }
}
