import Taro, { Component } from "@tarojs/taro";
import {
  Swiper,
  SwiperItem,
  View,
  Image,
  Text,
  ScrollView,
  Button
} from "@tarojs/components";
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
          "http://file.liangtongzhuo.com/8147ce86b29d5ce98a29.jpeg",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      },
      {
        url:
          "http://file.liangtongzhuo.com/8147ce86b29d5ce98a29.jpeg",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      },
      {
        url:
          "http://file.liangtongzhuo.com/8147ce86b29d5ce98a29.jpeg",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      },
      {
        url:
          "http://file.liangtongzhuo.com/8147ce86b29d5ce98a29.jpeg",
        title: "系列课程介绍案例",
        views: 1111,
        price: 499.0
      },
      {
        url:
          "http://file.liangtongzhuo.com/8147ce86b29d5ce98a29.jpeg",
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
          {/* <SwiperItem>
            <Image className="banner" src={banner2} />
          </SwiperItem>
          <SwiperItem>
            <Image className="banner" src={banner1} />
          </SwiperItem> */}
        </Swiper>

        <Text className="title">鹏翔医学服务平台</Text>
        <Text className="sub-title">在线学习</Text>

        <View className="button-list">
          <Button id="click-button" size="mini" type="primary">
            全部课程
          </Button>
          <Button size="mini" type="primary">
            临床研究培训
          </Button>
          <Button size="mini" type="primary">
            基础研究培训
          </Button>
          <Button size="mini" type="primary">
            综合研究培训
          </Button>
        </View>

        {/* 视频列表 */}
        <View className="list">{VideoItems}</View>
        <Fool />
      </View>
    );
  }
}
