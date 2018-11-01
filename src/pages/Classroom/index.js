import Taro, { Component } from "@tarojs/taro";
import { Swiper, SwiperItem, View, Image, Text } from "@tarojs/components";
import Head from "../../components/Head";
import Fool from "../../components/Fool";
import "./index.scss";

export default class Classroom extends Component {
  config = {
    navigationBarTitleText: "课程详情列表"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
   
    return (
      <View className="classroom">
        <Head />
     
        课程列表
        <Fool />
      </View>
    );
  }
}
