
文档中心
请输入关键字
搜索历史
视频剪辑
视频点播
剪辑
热门搜索
扣子
火山方舟
豆包大模型
语音合成
云服务器
文档
备案
控制台
z
zhaoweibo.0820 / eps_yxd_group
账号管理
账号ID : 2108323502
联邦登陆
企业认证
费用中心
可用余额¥ 0.00
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
用户指南
/
视频剪辑
/
视频剪辑 Web SDK
/
集成视频剪辑 Web SDK
转码
集成视频剪辑 Web SDK
最近更新时间：2025.10.24 21:04:49
首次发布时间：2025.10.24 21:01:43
复制全文
我的收藏
有用
无用
本文为您介绍如何将视频剪辑 Web SDK 集成到您的 Web 应用中，并结合视频点播的云端服务，构建一个功能强大的在线视频剪辑器。

前提条件
在开始前端集成之前，请确保您已完成以下准备工作：

账号与服务开通：
已注册火山引擎账号。如果您是首次登录火山引擎控制台，请先完成实名认证。
已开通视频点播服务。
已创建空间，用于存储剪辑素材和产物。
服务端准备：
搭建后端服务：您需要一个后端服务来调用视频点播的服务端 API，为前端 SDK 提供数据接口和鉴权。您可以参考体验 Demo 中的 Node.js 实现。
创建视频剪辑工程：在加载前端剪辑器之前，您必须通过后端服务调用 CreateProject 接口，预先创建一个云端的视频剪辑工程。这将返回后续初始化 SDK 所需的 projectId 和 groupId。
注意

调用 CreateProject 时：

必须同时设置 Space 和 EditParam.Upload.SpaceName 两个参数，且取值相同，确保剪辑工程、剪辑素材和最终产物都归属于同一个点播空间。
请确保 EditParam.Canvas 的尺寸为 1920x1080 (16:9) 或 1080x1920 (9:16)，SDK 当前仅支持这两种画布尺寸。
前端开发环境：
Node.js: v14.x 或更高版本（推荐使用 LTS 版本）。
npm: 通常会随 Node.js 一同安装。

集成步骤

步骤 1：引入 SDK 资源
在您的前端项目 HTML 文件中，通过 CDN 链接引入 SDK 的 CSS 和 JS 文件。

在 <head> 标签内引入 CSS 文件：

<head>
  <link rel="stylesheet" href="https://lf-unpkg.volccdn.com/obj/vcloudfe/sdk/@byted/veveditor/1.0.1/veveditor.css">
</head>
在 <body> 标签内添加一个用于挂载剪辑器的容器 <div>，并在 </body> 标签前引入 JS 文件：

<body>
  <div id="editor-container" style="height: 100vh; width: 100vw;"></div>
  <script src="https://lf-unpkg.volccdn.com/obj/vcloudfe/sdk/@byted/veveditor/1.0.1/veveditor.umd.js"></script>
  <script>
    // SDK 初始化代码将写在这里
  </script>
</body>

步骤 2：初始化 SDK 实例
在 <script> 标签中，通过 new window.VeVEditor(param) 来实例化剪辑器。您需要传入在前提条件中获取的 projectId 和 groupId。param 对象是初始化的核心，包含挂载点、基础配置、API 代理和事件回调等所有必需信息。详情请见参数说明。

// 从服务端获取或在 URL 参数中获取
const projectId = 'your-project-id'; 
const groupId = 'your-group-id';   

// 构造初始化参数对象
const param = {
  container: document.getElementById('editor-container'),
  config: {
    projectId: projectId,
    groupId: groupId,
    region: 'cn-north-1',
    // ... 其他基础配置
  },
  actions: {
    // 关键：在此实现所有与您后端服务通信的 API 调用
    describeProject: async (params) => { /* ... */ },
    updateProject: async (params) => { /* ... */ },
    // ...
  },
  handlers: {
    // 关键：在此实现事件回调处理
    onNavBack: () => { /* ... */ },
    onProjectSubmit: () => { /* ... */ },
    // ...
  }
};

const veveditor = new window.VeVEditor(param);

参数说明
VeVEditor 的初始化 param 对象由多个模块组成，用于控制剪辑器的行为、外观和数据通信。

param（顶层参数）
参数

类型

必填

描述

container

HTMLElement

是

用于挂载剪辑器 UI 的 DOM 容器节点。SDK 将在此节点内部渲染整个剪辑器界面。

config

object

是

基础配置，包含 projectId、groupId 以及控制剪辑器各功能模块 UI 和行为的参数。详见 Config（基础配置）。

actions

object

是

API 代理配置。SDK 内部所有对视频点播服务端 API 的请求，都会通过您在此处定义的函数发起。您需要在此实现对您后端服务的请求封装。详见 Actions（API 代理）。

handlers

object

是

事件回调配置。用于处理剪辑器内部触发的用户行为或状态变化，如点击返回按钮、提交导出任务等。详见 Handlers（事件回调）。


Config（基础配置）
配置剪辑器的基础信息和各功能模块。

参数

类型

必填

描述

projectId

string

是

剪辑工程 ID。通过服务端调用 CreateProject 接口获取，详见前提条件。

groupId

string

是

剪辑工程所属的组 ID。通过服务端调用 CreateProject 接口获取，详见前提条件。

region

string

是

服务地域。当前仅支持 cn-north-1。

autoPublish

boolean

否

本地上传媒资后，是否自动调用 UpdateMediaPublishStatus 接口将媒资状态设置为“已发布”。默认为 true。

header

object

否

配置剪辑器顶部导航栏 UI 的显示/隐藏。详见 Header（顶部导航栏配置）。

material

object

否

配置素材库页面的功能和行为。详见 Material（素材库页面）。

text

object

否

配置文字页面。详见 Text（文字页面）。

effect

object

否

配置特效页面。详见 Effect（特效）。

transition

object

否

配置转场页面。详见 Transition（转场）。

filter

object

否

配置滤镜页面。详见 Filter（滤镜）。


Actions（API 代理）
actions 对象中的每一个函数，都对应一个 SDK 需要调用的视频点播服务端 API。您必须实现所有标记为“是”的函数，在函数内部完成对您自己后端服务的网络请求，并返回服务端 API 响应中的 Result 部分。

函数名

对应服务端 API

必填

描述

describeProject

DescribeProject

是

SDK 初始化时调用，用于获取剪辑工程的初始数据结构。

updateProject

UpdateProject

是

在编辑过程中（如拖拽、删减素材）自动或手动调用，用于保存工程草稿。

submitEditTaskAsync

SubmitEditTaskAsync

是

用户点击“导出”按钮时调用，用于提交视频剪辑任务。

searchVideo

SearchVideo

是

用户在“从系统导入 > 视频库”中浏览或搜索视频时调用，用于拉取点播空间中的视频列表。

mGetMaterial

MGetMaterial

是

用户在“从系统导入 > 素材库”中浏览或选择素材时调用，用于拉取点播空间中的素材列表。

searchEditMaterial

SearchEditMaterial

是

SDK 初始化或切换工程时调用，用于获取当前工程已引用的所有素材列表。

deleteEditMaterial

DeleteEditMaterial

是

用户从工程中移除素材时调用。

createEditMaterial

CreateEditMaterial

是

用户向工程中添加素材时调用。

getEffectList

GetEffectList

是

加载特效、转场、滤镜、贴纸、花字等资源列表时调用。

updateMediaPublishStatus

UpdateMediaPublishStatus

是

当 autoPublish 为 true 时，在本地上传成功后自动调用，用于发布媒资。

getVideoInfo

(media:{Vid:string;Space:string})=> Promise<MediaInfo>

是

预览轨道上的视频素材时调用，用于获取视频播放分地址、视频时长等信息。SDK 会传入包含 Vid 和 Space 的对象，您的函数需要返回符合 MediaInfo 结构的对象。


MediaInfo
actions.getVideoInfo 函数必须返回一个包含以下字段的 MediaInfo 对象。您需要从服务端 GetVideoPlayInfo 接口的响应中提取并组装这些数据。

参数

类型

必填

描述

来源

PlayUrl

string

是

音视频资源的播放地址

从 GetVideoPlayInfo 响应中的 VideoDetail.VideoDetailInfo.PlayInfo.MainPlayUrl 字段获取。

PosterUrl

string

是

音视频资源的封面图地址

从 GetVideoPlayInfo 响应中的VideoDetail.VideoDetailInfo.PosterUrl字段获取

Duration

number

是

音视频资源的时长

从 GetVideoPlayInfo 响应中的VideoDetail.VideoDetailInfo.Duration字段获取

Width

number

是

视频宽度

从 GetVideoPlayInfo 响应中的 VideoDetail.VideoDetailInfo.Width 字段获取。

Height

number

是

视频高度

从 GetVideoPlayInfo 响应中的 VideoDetail.VideoDetailInfo.Height 字段获取。


Handlers（事件回调）
handlers 对象用于监听并响应剪辑器内部的特定事件。

函数名

类型

必填

描述

onUploadMaterial

(params: { type: 'video' | 'material'; Space: string }) => void

是

用户点击素材库页面中的“确定上传”按钮时触发。您可以在此回调中唤起您自定义的上传组件或页面。

onProjectSubmit

(Space: string) => void

是

用户点击剪辑器右上角的“导出”按钮、成功执行 submitEditTaskAsync 动作后触发。您可以在此提示用户“剪辑中，请稍候”或执行页面跳转。

uploadMaterial

-

否

当 material.enableLocalUpload 为 true 时，此函数必须实现，负责处理本地文件的上传逻辑。您需要在此函数中集成 Web 上传 SDK 完成上传，并返回上传成功后的媒资信息。

onNavBack

(Space: string) => void

否

用户点击剪辑器左上角的“返回”按钮时触发。您可以在此实现页面返回、弹窗确认等自定义逻辑。

onNodePreviewError

(type: 'video' | 'audio') => void

否

当轨道上的视频或音频素材因 URL 失效等原因预览失败时触发。您可以在此进行错误上报或给出自定义提示。


Header（顶部导航栏配置）
用于控制剪辑器顶部导航栏各元素的可见性。
Image

参数

类型

必填

默认值

描述

show

boolean

否

true

是否整体显示顶部导航栏。

isNavBackVisible

boolean

否

true

是否显示左上角的“返回”按钮。

isProjectSubmitVisible

boolean

否

true

是否显示右上角的“导出”按钮。

isProjectNameEditable

boolean

否

true

是否允许用户点击并编辑工程名称。


Material（素材库页面）
用于配置素材库页面的行为。
Image

参数

类型

必填

默认值

描述

show

boolean

否

true

是否整体显示素材库页面。

enableLocalUpload

boolean

否

true

是否在素材库页面中启用“从本地上传”功能。若为 true，则您必须实现 handlers.uploadMaterial 函数。

uploadAccept

string

否

'image/*,.mp3,.mp4,.webm'

用于限制从本地上传的文件类型。

图片支持 png、jpeg
音频支持 mp3
视频支持 mp4、webm、mov
videoAccept

string

否

'.mp4,.webm'

用于限制从系统导入的视频文件类型。支持 mp4、webm、mov。

emptyIcon

string

否

''

素材库为空状态时显示的自定义图标的 URL。


Text（文字页面）
用于配置文字页面的行为。
Image

参数

类型

必填

默认值

描述

show

boolean

否

true

是否整体显示文字页面入口。

enableAnimation

boolean

否

false

是否启用文字动画功能。


Effect（特效页面）
Image

参数

类型

必填

默认值

描述

show

boolean

否

true

是否整体显示特效页面。


Transition（转场页面）
Image

参数

类型

必填

默认值

描述

show

boolean

否

true

是否整体显示转场页面。


Filter（滤镜页面）
Image

参数

类型

必填

默认值

描述

show

boolean

否

true

是否整体显示滤镜页面。


完整示例代码
var projectId = 'your-project-id'; // 剪辑工程ID
var groupId = 'your-group-id'; // 分组 ID
var veveditor = new window.VeVEditor({
  container: document.getElementById('editor-container'),
  config: {
    projectId: projectId,
    groupId: groupId,
    region: 'cn-north-1',
    autoPublish: true,
    header: {
      show: true,
      isNavBackVisible: true,
      isProjectSubmitVisible: true,
      isProjectNameEditable: true,
    },
    material: {
      show: true,
      enableLocalUpload: true,
      uploadAccept: 'image/*,.mp3,.mp4,.webm',
      videoAccept: '.mp4,.webm',
    },
    filter: { show: true },
    transition: { show: true },
    effect: { show: true },
    text: {
      show: true,
      enableAnimation: true,
    },
  },
  actions: {
    searchVideo: async (params) => {
      // 搜索音视频素材
      var res = await request('api/SearchVideo', params);
      return res.Result;
    },
    mGetMaterial: async (params) => {
      // 查询图片素材
      var res = await request('api/MGetMaterial', params);
      return res.Result;
    },
    describeProject: async (params) => {
      // 查询剪辑工程信息
      var res = await request('api/DescribeProject', params);
      return res.Result;
    },
    updateProject: async (params) => {
      // 更新剪辑工程信息
      var res = await request('api/UpdateProject', params);
      return res.Result;
    },
    searchEditMaterial: async (params) => {
      // 查询剪辑工程已添加素材列表
      var res = await request('api/SearchEditMaterial', params);
      return res.Result;
    },
    getEffectList: async (params) => {
      // 查询花字、特效、转场、动效、滤镜资源包信息
      var res = await request('api/GetEffectList', params);
      return res.Result;
    },
    submitEditTaskAsync: async (params) => {
      // 导出剪辑任务
      var res = await request('api/SubmitEditTaskAsync', params);
      return res.Result;
    },
    deleteEditMaterial: async (params) => {
      // 删除剪辑素材
      var res = await request('api/DeleteEditMaterial', params);
      return res.Result;
    },
    createEditMaterial: async (params) => {
      // 添加剪辑素材
      var res = await request('api/CreateEditMaterial', params);
      return res.Result;
    },
    updateMediaPublishStatus: async (params) => {
      // 发布媒资
      var res = await request('api/UpdateMediaPublishStatus', params);
      return res.Result;
    },
    getVideoInfo: async (params) => {
      const res = await get('/api/GetVideoPlayInfo', params);
      return {
        ...res.Result?.VideoDetail?.VideoDetailInfo ?? {},
        ...res.Result?.VideoDetail?.VideoDetailInfo?.PlayInfo ?? {},
        PlayUrl: res.Result?.VideoDetail?.VideoDetailInfo?.PlayInfo?.MainPlayUrl,
      };
    },
  },
  handlers: {
    uploadMaterial: async (file, options) => {
      // 完整示例见体验Demo
    },
    onNavBack: () => {
      console.log('用户点击返回按钮');
      // 处理返回逻辑，如跳转到上一页
    },
    onUploadMaterial: (params) => {
      console.log('用户上传素材', params);
      // 处理素材上传逻辑
    },
    onProjectSubmit: () => {
      console.log('项目提交完成');
      // 处理项目提交后的逻辑
    }
  }
});

常见问题

轨道上的素材预览报错或显示黑屏？
预览失败通常与素材的播放地址或网络环境有关。可按以下步骤排查：

检查视频播放地址可用性：
播放域名配置：在视频点播控制台域名管理页面检查播放域名的配置情况。确保域名配置准确无误，DNS 解析正常，并且该域名已被启用。
域名 SSL 配置：在视频点播控制台域名管理页面确认域名已配置有效的 SSL证书。
域名回源存储配置：核实域名回源存储配置，保证素材在火山引擎存储的地址与域名回源存储的设置一致。
主分发协议设置：在视频点播控制台分发设置页面确认主分发协议设置为 https。
域名CORS配置：在视频点播控制台域名管理页面确认已正确配置 Header，允许跨域访问，使不同来源的请求能顺利获取视频资源。
检查视频文件完整性：检查视频文件是否因上传失误、存储故障等原因导致损坏。
确认网络连接稳定性：检查网络稳定性，避免因网络波动影响视频预览。
尝试调整视频参数：若上述检查均无问题，可尝试降低视频分辨率或码率。
上一篇
体验 Demo
下一篇
域名接入概述
前提条件
集成步骤
步骤 1：引入 SDK 资源
步骤 2：初始化 SDK 实例
参数说明
param（顶层参数）
Config（基础配置）
Actions（API 代理）
Handlers（事件回调）
Header（顶部导航栏配置）
Material（素材库页面）
Text（文字页面）
Effect（特效页面）
Transition（转场页面）
Filter（滤镜页面）
完整示例代码
常见问题
轨道上的素材预览报错或显示黑屏？

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