import AV from "leancloud-storage";
import Taro, { Component } from "@tarojs/taro";
import "@tarojs/async-await";
import {
  Swiper,
  SwiperItem,
  View,
  Image,
  Text,
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
  constructor() {
    super(...arguments);
    this.state = {
      courses: []
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  async componentDidShow() {
    const Courses = new AV.Query("Courses");
    try {
      const courses = await Courses.find();
      this.setState({ courses: courses });
    } catch (error) {}
  }

  componentDidHide() {}

  render() {
    const VideoItems = this.state.courses.map(course => (
      <VideoItem key={course.id} course={course} />
    ));
    return (
      <View className="container">
        <Head />
        <Swiper
          className="swiper"
          indicatorColor="#fff"
          indicatorActiveColor="rgba(30, 176, 236, 1);"
          vertical={false}
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem style=" height:200px">
            <Image className="banner" src={banner1} />
          </SwiperItem>
          <SwiperItem>
            <Image className="banner" src={banner2} />
          </SwiperItem>
          <SwiperItem>
            <Image className="banner" src={banner1} />
          </SwiperItem>
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
