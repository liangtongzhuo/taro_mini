import AV from "leancloud-storage";
import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import "./app.scss";

const appId = "U4D6TL1HgHHauvmmmhR7qNYA-gzGzoHsz";
const appKey = "wbh3vxJVB72NUiX8sSkcOPzx";
AV.init({ appId, appKey });

class App extends Component {
  config = {
    pages: [
      "/pages/index/index",
      "/pages/classroom/index",
      "/pages/login/index",
      "/pages/register/index",
      "/pages/findPassword/index",
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
    const query = new AV.Query("Atricle");
    const data = await query.find();
    console.log(data);
  }

  componentDidHide() {}

  componentCatchError() {}

  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
