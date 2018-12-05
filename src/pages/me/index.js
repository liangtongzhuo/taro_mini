import AV from "leancloud-storage";
import Taro, { Component } from "@tarojs/taro";
import "@tarojs/async-await";
import {
  View,
  Text,
} from "@tarojs/components";
import Head from "../../components/Head";
import VideoItem from "../../components/VideoItem";
import Fool from "../../components/Fool";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };
  constructor() {
    super(...arguments);
    this.state = {
      courses: [],
      btnTitle: "全部课程"
    };
  }
  componentWillMount() {}

  componentDidMount() {
    this.query();
  }

  componentWillUnmount() {}

  componentDidShow() {
    
  }
  // 请求数据
  async query() {
    try {
      const Orders = new AV.Query("Orders");
      Orders.equalTo("user", AV.User.current());
      Orders.include("course");
      Orders.equalTo("pay", 1);
      const orders = await Orders.find();
      const courses = orders.map(order => order.get("course"))
      this.setState({ courses: courses });

    } catch (error) {
      console.log(error);
    }
  }
 

  componentDidHide() {}

  render() {
    const VideoItems = this.state.courses.map(course => (
      <VideoItem key={course.id} course={course} />
    ));
    return (
      <View className="me">
        <Head />
        
        <Text className="title">我购买的课程</Text>

        {/* 视频列表 */}
        <View className="list">{VideoItems}</View>
        <Fool />
      </View>
    );
  }
}
