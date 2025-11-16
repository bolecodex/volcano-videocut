
文档中心
请输入关键字
搜索历史
擦除
视频剪辑
视频点播
热门搜索
扣子
火山方舟
豆包大模型
语音合成
云服务器
文档
备案
控制台
w
weibo / sutui_aigc
账号管理
账号ID : 2110780953
IAM 用户
企业认证
费用中心
可用余额¥ 28,399.45
充值汇款
账户总览
账单详情
费用分析
发票管理
权限与安全
安全设置
访问控制
操作审计
API 访问密钥
工具与其他
公测申请
资源管理
配额中心
伙伴控制台
待办事项
待支付
0
待续费
0
待处理工单
0
未读消息
0
视频点播
文档首页
/
视频点播
/
服务端 API 参考
/
视频剪辑
/
剪辑工程管理
/
CreateProject - 创建剪辑工程
在本产品文档中搜索
CreateProject - 创建剪辑工程
最近更新时间：2025.10.24 19:49:14
首次发布时间：2025.10.24 19:49:14
复制全文
我的收藏
有用
无用
调用 CreateProject 接口创建剪辑工程。

注意事项
使用该接口前，请确保您已充分了解视频点播的收费方式和价格。视频剪辑为付费功能，具体请见按量计费。
本接口的单用户 QPS 限制为10 次/秒。超过限制，API 调用会被限流，这可能会影响您的业务，请合理调用。更多信息，请参见 API QPS 限制。
请求说明
请求方式：POST
请求地址：https://vod.volcengineapi.com?Action=CreateProject&Version=2018-01-01
调试
API Explorer
您可以通过 API Explorer 在线发起调用，无需关注签名生成过程，快速获取调用结果。
去调试
请求参数
下表仅列出该接口特有的请求参数和部分公共参数。更多信息请见公共请求参数。

Query
参数
类型
是否必选
示例值
描述
Action
String
是
CreateProject
接口名称。当前 API 的名称为 CreateProject。
Version
String
是
2018-01-01
接口版本。当前 API 的版本为 2018-01-01。
Body
参数
类型
是否必选
示例值
描述
ProjectName
String
是
新建项目-yh
剪辑工程的名称。长度建议控制在 1-128 个字符之间。支持以下字符类型：

汉字
大小写字母
数字
中划线（-）
下划线（_）
Space
String
是
test
点播空间名。您可通过以下方式获取空间名称：

在视频点播控制台空间管理页面查看当前账号下所有空间的名称。
调用 ListSpace 接口获取当前账号下所有空间的名称。
EditParam
JSONMap
是
-
剪辑工程的参数。详见视频剪辑参数。
ProjectType
String
是
track
剪辑工程的类型，当前仅支持 track类型。
返回参数
下表仅列出本接口特有的返回参数。更多信息请见公共返回参数。

参数
类型
示例值
描述
ProjectId
String
p03ef0xxxxxxxxxxxxx4bm0
剪辑工程 ID。
GroupId
String
g03cexxxxxxxxxxxxxxxxxqt2g
剪辑工程所属的组 ID。

请求示例
POST https://vod.volcengineapi.com?Action=CreateProject&Version=2018-01-01
{
  "ProjectName": "新建项目-test",
  "Space": "test",
  "EditParam": {
    "Project": {
      "Version": "1.0.0",
      "Name": "新建项目-test",
      "CreateTime": 1757142958344,
      "UpdateTime": 1757142958344,
      "Tag": "TrackEditor"
    },
    "Upload": {
      "SpaceName": "test",
      "VideoName": "新建项目-test"
    },
    "Output": {
      "Alpha": false,
      "Fps": 25,
      "Codec": {
        "VideoCodec": "h264",
        "Preset": "slow",
        "Crf": 23,
        "AudioCodec": "aac",
        "AudioBitrate": 128
      },
      "DisableVideo": false,
      "DisableAudio": false,
      "Cover": {
        "DisableCover": false,
        "CoverTime": [
          0
        ]
      }
    },
    "Canvas": {
      "Width": 1920,
      "Height": 1080,
      "BackgroundColor": "#000000FF"
    }
  },
  "ProjectType": "track"
}

返回示例
{
  "ResponseMetadata": {
    "RequestId": "20230604110420****100232280022D31",
    "Action": "CreateProject",
    "Version": "2018-01-01",
    "Service": "vod",
    "Region": "cn-north-1"
  },
  "Result": {
    "ProjectId": "p0ccxxxxxxxxxx",
    "GroupId": "g0c9xxxxxxxxxx"
  }
}
错误码
下表列举了本接口特有的错误码。如需了解更多错误码，详见视频点播公共错误码。

状态码	错误码	错误信息	说明
400	InvalidParameter.InvalidParam	paramater error	参数错误
上一篇
DeleteTask - 删除工程化剪辑任务记录
下一篇
SearchGlobalProject - 查询所有剪辑工程
注意事项
请求说明
调试
请求参数
Query
Body
返回参数
请求示例
返回示例
错误码

全天候售后服务
7x24小时专业工程师品质服务

极速服务应答
秒级应答为业务保驾护航

客户价值为先
从服务价值到创造客户价值

全方位安全保障
打造一朵“透明可信”的云
logo
关于我们
为什么选火山
文档中心
联系我们
人才招聘
云信任中心
友情链接
产品
云服务器
GPU云服务器
机器学习平台
客户数据平台 VeCDP
飞连
视频直播
全部产品
解决方案
汽车行业
金融行业
文娱行业
医疗健康行业
传媒行业
智慧文旅
大消费
服务与支持
备案服务
服务咨询
建议与反馈
廉洁舞弊举报
举报平台
联系我们
业务咨询：service@volcengine.com
市场合作：marketing@volcengine.com
电话：400-850-0030
地址：北京市海淀区北三环西路甲18号院大钟寺广场1号楼

微信公众号

抖音号

视频号
© 北京火山引擎科技有限公司 2025 版权所有
代理域名注册服务机构：新网数码 商中在线
服务条款
隐私政策
更多协议

京公网安备11010802032137号
京ICP备20018813号-3
营业执照
增值电信业务经营许可证京B2-20202418，A2.B1.B2-20202637
网络文化经营许可证：京网文（2023）4872-140号