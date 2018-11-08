import AV from "leancloud-storage";
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
      messages: []
    };
  }

  componentWillMount() {}

  async componentDidMount() {
    try {
      if (this.state.courseId) {
        const Courses = new AV.Query("Courses");
        const course = await Courses.get(this.state.courseId);

        // 查询课程下面的视频
        const Sub_video = new AV.Query("Sub_video");
        Sub_video.equalTo("course_id", course);
        const sub_video = await Sub_video.find(this.state.courseId);
        await this.setState({ course, subVideos: sub_video });
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
      if (name == "cover") {
        return this.state.course.get(name).url();
      }
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
              src={this.getSubVideo("video")}
              autoplay={false}
              poster={this.getCourse("cover")}
              controlsList="nodownload"
              initialTime="0"
              id="video"
              loop={false}
              muted={false}
            />
            <View className="right">
              <Text className="title">{this.getCourse("title")}</Text>
              <View className="sub-title">
                价格：
                <Text className="price">{this.getCourse("price")} ¥</Text>
              </View>
              <View className="sub-title" id="people">
                已经加入
                {this.getCourse("people")}人
              </View>
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
