import Taro, { Component } from "@tarojs/taro";
import { Swiper, SwiperItem, View , Image, Text} from "@tarojs/components";
import Head from "../../components/head";
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
    return (
      <View className="container">
        <Head />
        <Swiper
          className="test-h"
          indicatorColor="#fff"
          indicatorActiveColor="rgba(30, 176, 236, 1)"
          vertical={false}
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image className="logo" src={banner1} />
          </SwiperItem>
          <SwiperItem>
            <Image className="logo" src={banner2} />
          </SwiperItem>
          <SwiperItem>
            <Image className="logo" src={banner1} />
          </SwiperItem>
        </Swiper>

        <Text className="sub-title">
          上海鹏翔医学科技有限公司
        </Text>
      </View>
    );
  }
}
