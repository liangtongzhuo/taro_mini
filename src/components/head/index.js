import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import logo from "../../images/logo.png";
import "./index.scss";

export default class Head extends Component {
  onLogin() {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }
  onRegister() {
    Taro.navigateTo({
      url: "/pages/register/index"
    });
  }
  onHome() {
    Taro.navigateTo({
      url: "/pages/index/index"
    });
  }
  render() {
    return (
      <View className="head">
        <View className="left" onClick={this.onHome.bind(this)}>
          <Image className="logo" src={logo} />
        </View>
        <View className="right">
          <Button onClick={this.onLogin.bind(this)} size="mini" type="primary">
            登录
          </Button>
          <Button
            onClick={this.onRegister.bind(this)}
            size="mini"
            type="primary"
          >
            注册
          </Button>
        </View>
      </View>
    );
  }
}
