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
      url: "/pages/classroom/index"
    });
  }
  render() {
    return (
      <View className="video-item" onClick={this.onClick.bind(this)}>
        <View className="item-content">
          <Image className="cover" src={this.props.data.url} />
          <Text className="item-title">{this.props.data.title}</Text>
          <View className="title-group">
            <Text className="playback">
              <AtIcon value="eye" className="eyeIcon" />
              {this.props.data.views}
            </Text>
            <Text className="price">{this.props.data.price} ¥</Text>
          </View>
        </View>
      </View>
    );
  }
}
