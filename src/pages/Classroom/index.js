import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Video, RichText, Button } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtTextarea, AtAvatar } from "taro-ui";

import Head from "../../components/Head";
import Fool from "../../components/Fool";
import "./index.scss";
const ss = `《课程与教学理论前沿问题研究》<br />
课程简介 课程名称:
课程与教学理论前沿问题研究 
课程类别:公共专业选修课 
适用专业:课程与教学论专业(含学科课程与...`;
export default class Classroom extends Component {
  config = {
    navigationBarTitleText: "课程详情列表"
  };
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      value: ""
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  componentWillMount() {
    
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    // 设置不可下载
    document.getElementById("video").setAttribute("controlsList", "nodownload");
  }

  componentDidHide() {}

  render() {
    const tabList = [
      { title: "课程介绍" },
      { title: "课程目录" },
      { title: "全部评论" }
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
            <Video
              src="http://www.bestthinkers.cn/weike/joanna/anli/六顶思考帽课程介绍 - Joanna.mp4"
              autoplay={false}
              poster="http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
              controlsList="nodownload"
              initialTime="0"
              id="video"
              loop={false}
              muted={false}
            />
            <View className="right">
              <Text className="title">系列课程介绍案例</Text>
              <View className="sub-title">
                价格：
                <Text className="price">66666 ¥</Text>
              </View>
              <View className="sub-title" id="people">
                已经加入 999 人
              </View>
            </View>
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
                <View className="tab-base">
                  <RichText nodes={ss} />
                </View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={1}>
                <View className="tab-base schedule">
                  <Text className="class-title">
                    六顶思考帽学习导读 （17:49）
                  </Text>
                  <Text className="class-title">
                    第一讲：六顶思考帽之白帽：分析处理信息的技巧 （14:13）
                  </Text>
                  <Text className="class-title">
                    第二讲：六顶思考帽之红帽：感觉、直觉和本能反应（15:12）
                  </Text>
                  <Text className="class-title">
                    第三讲：六顶思考帽之黄帽与黑帽：发现机会与控制风险（14:57）
                  </Text>
                  <Text className="class-title">
                    第四讲：六顶思考帽之绿帽：获取创造性解决方案 （13:54）
                  </Text>
                  <Text className="class-title">
                    第五讲：六顶思考帽之蓝帽：思维组织与管理 （13:03）
                  </Text>
                </View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={2}>
                <View className="tab-base message-board">
                  <AtTextarea
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    maxlength="100"
                    placeholder="说说你的看法..."
                  />
                  <Button size="mini">按钮</Button>

                  <View className="message-list">
                    <View className="message-item">
                      <View>
                        <View className="message-left">
                          <AtAvatar
                            circle
                            image="http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
                          />
                        </View>
                        <View className="message-right">
                          <View className="message-name">
                            <Text>梁晓明</Text>
                            <Text>2018/9/30 20:8</Text>
                          </View>
                          <Text className="message -content">
                            哇塞真的学到了很多啊
                          </Text>
                        </View>
                      </View>

                      <View>
                        <View className="message-left">
                          <AtAvatar
                            circle
                            image="http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
                          />
                        </View>
                        <View className="message-right">
                          <View className="message-name">
                            <Text>梁晓明</Text>
                            <Text>2018/9/30 20:8</Text>
                          </View>
                          <Text className="message -content">
                            哇塞真的学到了很多啊
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
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
