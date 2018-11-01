import Taro, { Component } from "@tarojs/taro";
import { Swiper, SwiperItem, View, Image, Text } from "@tarojs/components";
import Head from "../../components/Head";
import VideoItem from "../../components/VideoItem";
import Fool from "../../components/Fool";

import banner1 from "../../images/banner1.jpg";
import banner2 from "../../images/banner2.jpg";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const arr = [
      {
        url:
          "https://i0.hdslb.com/bfs/archive/45f646677c5c269ec8682f075ba0d996edc4e667.jpg@320w_200h.webp",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      },
      {
        url:
          "https://i0.hdslb.com/bfs/archive/45f646677c5c269ec8682f075ba0d996edc4e667.jpg@320w_200h.webp",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      },
      {
        url:
          "https://i0.hdslb.com/bfs/archive/45f646677c5c269ec8682f075ba0d996edc4e667.jpg@320w_200h.webp",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      },
      {
        url:
          "https://i0.hdslb.com/bfs/archive/45f646677c5c269ec8682f075ba0d996edc4e667.jpg@320w_200h.webp",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      }
    ];

    const VideoItems = arr.map((data, index) => (
      <VideoItem key={index} data={data} />
    ));
    return (
      <View className="container">
        <Head />
        <Swiper
          className="swiper"
          indicatorColor="#fff"
          indicatorActiveColor="rgba(30, 176, 236, 1)"
          vertical={false}
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image className="banner" src={banner1} />
          </SwiperItem>
          <SwiperItem>
            <Image className="banner" src={banner2} />
          </SwiperItem>
          <SwiperItem>
            <Image className="banner" src={banner1} />
          </SwiperItem>
        </Swiper>

        <Text className="title">上海鹏翔医学科技有限公司</Text>
        <Text className="sub-title">在线学习</Text>
        {/* 视频列表 */}
        <View className="list">{VideoItems}</View>
        <Fool />
      </View>
    );
  }
}
