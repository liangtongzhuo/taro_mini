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
    const code = queryString.parseUrl(window.location.href).query.code;
    alert("code:" + code);
    alert(window.location.href);
    if (this.isWeixn && AV.User.current() && code) {
      try {
        const res = await axios.post("/wechat/jsapipay/authcenter", {
          code: code,
          userId: AV.User.current().id
        });
      } catch (error) {}
    }
  }
  // 判断微信浏览器
  isWeixn() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf("micromessenger") != -1;
    if (isWeixin) {
      return true;
    } else {
      return false;
    }
  }
  componentDidHide() {}

  componentCatchError() {}

  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));

// alert(queryString.parse(window.location.href).toJSONString())

