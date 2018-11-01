import Taro, { Component } from "@tarojs/taro";
import { View, Text} from "@tarojs/components";
import { AtGrid } from "taro-ui";
import "./index.scss";

export default class Fool extends Component {
  onClick(item, index) {
    console.log(item, index);
  }
  render() {
    return (
      <View className="fool">
        <AtGrid
          className="at-grid"
          onClick={this.onClick.bind(this)}
          mode='rect' hasBorder={false} 
          data={[
            {
              image:
                "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
              value: "电话"
            },
            {
              image:
                "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
              value: "邮箱"
            },
            {
              image:
                "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
              value: "地址"
            }
          ]}
        />

        <View className="tail">
          <Text className="tail-title">上海鹏翔医学科技有限公司</Text>
          <Text className="tail-title">©2019 | 京XX备XXXXX号</Text>
        </View>
      </View>
    );
  }
}
