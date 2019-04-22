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
              value: "电话:1871795086"
            },
            {
              image:
                "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
              value: "邮箱:kaizkx@163.com"
            },
            {
              image:
                "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
              value: "地址:上海虹口区"
            }
          ]}
        />

        <View className="tail">
          <Text className="tail-title">上海鹏祥医学科技有限公司</Text>
          <Text className="tail-title">© 沪ICP备18040972号-1</Text>
        </View>

        <View style="width:300px;margin:0 auto; padding:20px 0;font-size: 15px;">
          <a target="_blank" href=" " style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">< img src="http://lc-8emscetg.cn-n1.lcfile.com/69e10441d4e02e5f8fb5/gongan.png" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">沪公网安备 31011002003701号</p ></a >
        </View>
      </View>
      
    );
  }
}




