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
      index: 0,
      isOpened: false
    };
    console.log(this.$router.params);
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
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
        this.setState({ course, subVideos: sub_video });
      }
    } catch (error) {
      this.setState({ isOpened: true });
      setTimeout(() => {
        this.setState({ isOpened: false });
      }, 3000);
    }
  }

  componentWillUnmount() {}

  componentDidShow() {
    // 设置不可下载
    document.getElementById("video").setAttribute("controlsList", "nodownload");
  }

  componentDidHide() {}

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
  render() {
    const subVideosDOM = this.state.subVideos.map((item, index) => (
      <Text
        key={item.id}
        onClick={this.onClick.bind(this, index)}
        className="class-title"
      >
        {item.get("title")}
      </Text>
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
                本节课标题：
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
                  <Button size="mini">发送</Button>

                  <View className="message-list">
                    <View className="message-item">
                      <View>
                        <View className="message-left">
                          <AtAvatar
                            circle
                            image="http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
                          />
                        </View>
                        <View className="message-right">
                          <View className="message-name">
                            <Text>梁晓明</Text>
                            <Text>2018/9/30 20:8</Text>
                          </View>
                          <Text className="message -content">
                            哇塞真的学到了很多啊
                          </Text>
                        </View>
                      </View>

                      <View>
                        <View className="message-left">
                          <AtAvatar
                            circle
                            image="http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg"
                          />
                        </View>
                        <View className="message-right">
                          <View className="message-name">
                            <Text>梁晓明</Text>
                            <Text>2018/9/30 20:8</Text>
                          </View>
                          <Text className="message -content">
                            哇塞真的学到了很多啊
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </AtTabsPane>
            </AtTabs>
          </View>
        </View>
        <AtToast
          isOpened={this.state.isOpened}
          text="网络错误"
        />
        <Fool />
      </View>
    );
  }
}
