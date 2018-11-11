import AV from "leancloud-storage";
import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image, Text } from "@tarojs/components";
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
      url: "/"
    });
  }
  onSignOut() {
    AV.User.logOut();
    window.location.href = "/";
  }
  render() {
    const currentUser = AV.User.current();

    const showRight = currentUser ? (
      <View className="right">
        <Text>
          你好：
          {currentUser.get("name")}
        </Text>

        <Button onClick={this.onSignOut.bind(this)} size="mini" type="primary">
          退出
        </Button>
      </View>
    ) : (
      <View className="right">
        <Button onClick={this.onLogin.bind(this)} size="mini" type="primary">
          登录
        </Button>
        <Button onClick={this.onRegister.bind(this)} size="mini" type="primary">
          注册
        </Button>
      </View>
    );

    return (
      <View className="head">
        <View className="left" onClick={this.onHome.bind(this)}>
          <Image className="logo" src="http://lc-8emscetg.cn-n1.lcfile.com/aaca1b144fd17a5e70f6.png" />
        </View>
        <View className="right">{showRight}</View>
      </View>
    );
  }
}
