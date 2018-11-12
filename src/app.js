import AV from "leancloud-storage";
import queryString from "query-string";
import axios from "axios";
import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";

import "./app.scss";

axios.defaults.baseURL = "http://www.pengxiangmed.com/";
const appId = "8emScetGhjUYBVhVr5Px2WPq-gzGzoHsz";
const appKey = "9FPFgVk7a18hC9FnYxQxfqs8";
AV.init({ appId, appKey });

class App extends Component {
  config = {
    pages: [
      "/pages/index/index",
      "/pages/classroom/index",
      "/pages/login/index",
      "/pages/register/index",
      "/pages/findPassword/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
  };

  componentDidMount() {}

  async componentDidShow() {
    // const res = await axios.post("/wechat/jsapipay/authcenter", {
    //   orderId: order.id
    // });
    console.log(queryString.parse(window.location.href))

  }

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));







