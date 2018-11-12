import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";

export default class VideoItem extends Component {
  constructor(props) {
    super(props);
  }
  onClick() {
    Taro.navigateTo({
      url: "/pages/classroom/index?id=" + this.props.course.id
    });
  }
  onPrice() {
    return this.props.course.get("price") === 0
      ? "免费"
      : this.props.course.get("price") / 100 + "¥";
  }
  render() {
    return (
      <View className="video-item" onClick={this.onClick.bind(this)}>
        <View className="item-content">
          <Image className="cover" src={this.props.course.get("cover")} />
          <Text className="item-title">{this.props.course.get("title")}</Text>
          <View className="title-group">
            <Text className="playback">
              <AtIcon value="eye" className="eyeIcon" />
              {this.props.course.get("views")}
            </Text>
            <Text className="price">{this.onPrice()}</Text>
          </View>
        </View>
      </View>
    );
  }
}
