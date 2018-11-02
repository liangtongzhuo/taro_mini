import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";

import Head from "../../components/Head";
import Fool from "../../components/Fool";
import "./index.scss";

export default class Classroom extends Component {
  config = {
    navigationBarTitleText: "课程详情列表"
  };
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const tabList = [
      { title: "标签页1" },
      { title: "标签页2" },
    ];

    return (
      <View className="classroom">
        <Head />
        <Image
          className="img"
          src="http://www.bestthinkers.cn/upload/201606/16/201606160933002627.jpg"
        />
        <View className="content">
          <View className="card">
            <Image
              className="cover"
              src="https://i0.hdslb.com/bfs/archive/45f646677c5c269ec8682f075ba0d996edc4e667.jpg@320w_200h.webp"
            />
            <Text className="title">系列课程介绍案例</Text>
            <Text className="sub-title">
              价格：
              <Text className="price">66666 ¥</Text>
            </Text>
            <Text className="sub-title">已经加入 999 人</Text>
          </View>
        </View>

        <View className="content">
          <View className="card">
            <AtTabs
              current={this.state.current}
              tabList={tabList}
              onClick={this.handleClick.bind(this)}
            >
              <AtTabsPane current={this.state.current} index={0}>
                <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                  标签页一的内容
                </View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={1}>
                <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
                  标签页二的内容
                </View>
              </AtTabsPane>
            </AtTabs>
          </View>
        </View>

        <Fool />
      </View>
    );
  }
}
