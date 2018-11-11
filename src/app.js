import AV from "leancloud-storage";
import axios from "axios";
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

  componentDidShow() {}

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));

import queryString from "query-string";

const xxx = "http://user:pass@host.com:8080/p/a/t/h?query=string#hash";
console.log(queryString.parse(xxx));
