import Taro, { Component } from "@tarojs/taro";
import { View, Button, Image } from "@tarojs/components";
import logo from "../../images/logo.png";
import "./index.scss";

export default class Head extends Component {
  onClick() {}
  render() {
    return (
      <View className="head">
        <View className="left">
          <Image className="logo" src={logo} />
        </View>
        <View className="right">
          <Button onClick={this.onClick.bind(this)} size="mini" type="primary">
            登录
          </Button>
          <Button onClick={this.onClick.bind(this)} size="mini" type="primary">
            注册
          </Button>
        </View>
      </View>
    );
  }
}
