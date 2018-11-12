
import AV from "leancloud-storage";
import axios from "axios";
import Taro, { Component } from "@tarojs/taro";
import "@tarojs/async-await";
import { View, Text, Image, Video, RichText, Button } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtTextarea, AtAvatar, AtToast } from "taro-ui";
import "./index.scss";
import Fool from "../../components/Fool";
import Head from "../../components/Head";

export default class Classroom extends Component {
  config = {
    navigationBarTitleText: "课程详情列表"
  };
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      value: "",
      course: null,
      courseId: this.$router.params.id,
      subVideos: [],
      index: 0, //默认第几节课
      isOpened: false,
      text: "",
      messages: [],
      pay: 0,
      isDisplay: false //是否弹窗
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    try {
      if (this.state.courseId) {
        const Courses = new AV.Query("Courses");
        const course = await Courses.get(this.state.courseId);
        try {
          course.increment("views", 1);
          course.fetchWhenSave(true);
          course.save();
        } catch (error) {}

        // 查询课程下面的视频
        const Sub_video = new AV.Query("Sub_video");
        Sub_video.equalTo("course_id", course);
        const sub_video = await Sub_video.find(this.state.courseId);
        await this.setState({ course, subVideos: sub_video });
        // 查询是否支付
        await this.queryIsPay();
      }
    } catch (error) {
      this.setState({ isOpened: true, text: "网络错误" });
      setTimeout(() => {
        this.setState({ isOpened: false });
      }, 3000);
    }
    // 获取留言信息
    this.getMessages();
  }
  // 查询是否支付了
  async queryIsPay() {
    // 查询是否已经购买
    if (AV.User.current()) {
      const Orders = new AV.Query("Orders");
      Orders.equalTo("course", this.state.course);
      Orders.equalTo("user", AV.User.current());
      Orders.equalTo("pay", 1);
      const order = await Orders.find();
      if (order.length != 0) {
        this.setState({ pay: 1 });
      }
    }
  }

  componentWillUnmount() {}

  componentDidShow() {
    // 设置不可下载
    document.getElementById("video").setAttribute("controlsList", "nodownload");
  }

  componentDidHide() {}

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  onClick(index) {
    console.log(index);
    this.setState({ index });
  }

  getCourse(name) {
    if (this.state.course) {
      return this.state.course.get(name);
    }
  }
  getSubVideo(name) {
    const subVideo = this.state.subVideos[this.state.index];
    if (this.state.index != -1 && subVideo) {
      if (name == "video") {
        return subVideo.get(name).url();
      }
      return subVideo.get(name);
    }
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  // 发送留言
  async onSendMessage() {
    if (this.state.value.length == 0) {
      this.setState({ isOpened: true, text: "请输入留言" });
    } else if (!AV.User.current()) {
      this.setState({ isOpened: true, text: "请登录后留言" });
    } else {
      const subVideo = this.state.subVideos[this.state.index];
      const Message = AV.Object.extend("Message");
      const message = new Message();
      message.set("content", this.state.value);
      message.set("user", AV.User.current());
      message.set("sub_video", subVideo);
      try {
        await message.save();
        this.setState({
          value: ""
        });
        // 获取最新留言
        this.getMessages();
      } catch (error) {
        this.setState({ isOpened: true, text: "网络错误" });
      }
    }

    setTimeout(() => {
      this.setState({ isOpened: false });
    }, 3000);
  }
  async getMessages() {
    const subVideo = this.state.subVideos[this.state.index];
    var query = new AV.Query("Message");
    query.equalTo("sub_video", subVideo);
    query.include("user");
    query.descending("createdAt");
    try {
      const messages = await query.find();
      this.setState({ messages });
    } catch (error) {
      this.setState({ isOpened: true, text: "网络错误" });
    }
    setTimeout(() => {
      this.setState({ isOpened: false });
    }, 3000);
  }
  /**
   * 生成订单
   */
  async onPay() {
    if (!AV.User.current()) {
      this.setState({ isOpened: true, text: "请登录" });
    } else {
      try {
        try {
          // 购买人数+1
          const course = AV.Object.createWithoutData(
            "Courses",
            this.state.course.id
          );
          course.increment("people", 1);
          course.save();
        } catch (error) {
          console.log(error);
        }

        const Orders = AV.Object.extend("Orders");
        let order = new Orders();
        order.set("title", this.state.course.get("title"));
        order.set("price", this.state.course.get("price"));
        order.set("course", this.state.course);
        order.set("user", AV.User.current());
        order.set("pay", 0);
        order = await order.save();

        console.log("需要向后台发送", order.id);
        const isWx = this.isWeixn();
        if (isWx) {
          // 1.请求
          const res = await axios.post("jsapipay/unifiedpay", {
            orderId: order.id
          });
          // 2.拉起

          // 3.成功后刷新页面
        } else {
          const codeStr = await axios.post("/wechat/qrcodepay/getqrcode", {
            orderId: order.id
          });
          console.log(1111, codeStr);
          // 展示二维码
          this.setState({ codeStr: codeStr.data, isDisplay: true });
        }
      } catch (error) {
        this.setState({ isOpened: true, text: "网络错误" });
      }
    }

    setTimeout(() => {
      this.setState({ isOpened: false });
    }, 3000);
  }
  // 用于判断是否可以播放
  isPlay() {
    if (this.state.subVideos.length == 0) return;
    const subVideo = this.state.subVideos[this.state.index];
    if (subVideo.get("pay") == 1) {
      return subVideo.get("video").url();
    } else if (this.state.pay === 1) {
      return subVideo.get("video").url();
    }

    return false;
  }
  // scan
  onScanCode() {
    window.location.reload();
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
  // 拉取微信支付
  weixinPlay() {
    function onBridgeReady() {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: "wx2421b1c4370ec43b", //公众号名称，由商户传入
          timeStamp: "1395712654", //时间戳，自1970年以来的秒数
          nonceStr: "e61463f8efa94090b1f366cccfbbb444", //随机串
          package: "prepay_id=u802345jgfjsdfgsdg888",
          signType: "MD5", //微信签名方式：
          paySign: "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          }
        }
      );
    }
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  }
  onPrice() {
    return this.getCourse("price") === 0
      ? "免费"
      : this.getCourse("price") / 100 + "¥";
  }
  render() {
    // 视频课程
    const subVideosDOM = this.state.subVideos.map((item, index) => (
      <Text
        key={item.id}
        onClick={this.onClick.bind(this, index)}
        className="class-title"
      >
        {item.get("title")}
      </Text>
    ));
    // 留言
    const messagesDOM = this.state.messages.map(message => (
      <View key={message.id}>
        <View className="message-left">
          <AtAvatar
            circle
            image="http://lc-8emscetg.cn-n1.lcfile.com/2a5cb3bac7d2d578235a.png"
          />
        </View>
        <View className="message-right">
          <View className="message-name">
            <Text>{message.get("user").get("name")}</Text>
            <Text>{formatDate(message.createdAt)}</Text>
          </View>
          <Text className="message -content">{message.get("content")}</Text>
        </View>
      </View>
    ));

    const tabList = [
      { title: "课程介绍" },
      { title: "课程目录" },
      { title: "全部评论" }
    ];
    return (
      <View className="classroom">
        <Head />
        <Image
          className="img"
          src="http://www.bestthinkers.cn/upload/201606/16/201606160933002627.jpg"
        />
        <View className="content">
          <View className="card">
            <Video
              src={this.isPlay()}
              autoplay={false}
              poster={this.getCourse("cover")}
              controlsList="nodownload"
              initialTime="0"
              id="video"
              loop={false}
              muted={false}
            />
            <View className="right">
              <View className="title">
                <Text>{this.getCourse("title")}</Text>
                {this.state.pay == 0 ? (
                  <Button
                    onClick={this.onPay.bind(this)}
                    size="mini"
                    type="primary"
                  >
                    购买课程
                  </Button>
                ) : (
                  <Text> 「已购买」</Text>
                )}
              </View>

              <View className="sub-title">
                价格：
                <Text className="price">{this.onPrice()}，</Text>
                <Text>{`已经加入 ${this.getCourse("people")} 人`}</Text>
              </View>
              {/* <View className="sub-title" id="people" /> */}
              <View className="sub-title">
                本节课：
                {this.getSubVideo("title")}
              </View>
              <Text className="sub-title content" id="people">
                本节课主要内容：
                {this.getSubVideo("content")}
              </Text>
            </View>
          </View>
        </View>

        <View className="content">
          <View className="card">
            <AtTabs
              current={this.state.current}
              tabList={tabList}
              onClick={this.handleClick.bind(this)}
            >
              <AtTabsPane current={this.state.current} index={0}>
                <View className="tab-base">
                  <RichText
                    nodes={
                      this.state.course && this.state.course.get("outline")
                    }
                  />
                </View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={1}>
                <View className="tab-base schedule">{subVideosDOM}</View>
              </AtTabsPane>
              <AtTabsPane current={this.state.current} index={2}>
                <View className="tab-base message-board">
                  <AtTextarea
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    maxlength="100"
                    placeholder="说说你的看法..."
                  />
                  <Button size="mini" onClick={this.onSendMessage.bind(this)}>
                    发送
                  </Button>

                  <View className="message-list">
                    <View className="message-item">{messagesDOM}</View>
                  </View>
                </View>
              </AtTabsPane>
            </AtTabs>
          </View>
        </View>
        <AtToast isOpened={this.state.isOpened} text={this.state.text} />
        <View id="modal">
          <View
            className="show"
            style={{ display: this.state.isDisplay ? "" : "none" }}
          >
            请用微信扫码二维码，完成支付
            <Image
              className="img"
              src={"data:image/jpg;base64," + this.state.codeStr}
            />
            <Button size="mini" onClick={this.onScanCode.bind(this)}>
              关闭支付
            </Button>
            <Button size="mini" onClick={this.onScanCode.bind(this)}>
              完成支付
            </Button>
          </View>
        </View>
        <Fool />
      </View>
    );
  }
}

function formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  // 遍历这个对象
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}
