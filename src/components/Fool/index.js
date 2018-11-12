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
                "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
              value: "电话:188888888"
            },
            {
              image:
                "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
              value: "邮箱:xxxx@12.com"
            },
            {
              image:
                "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
              value: "地址:上海徐汇区XX"
            }
          ]}
        />

        <View className="tail">
          <Text className="tail-title">上海鹏祥医学科技有限公司</Text>
          <Text className="tail-title">© 沪ICP备18040972号-1</Text>
        </View>
      </View>
    );
  }
}
