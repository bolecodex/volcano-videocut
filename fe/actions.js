import TTUploader from 'tt-uploader';
import { post, get, getType } from './util';

const initUploader = async (file, space) => {
  let stsToken;
  let config;
  
  // 获取配置和上传token
  [stsToken, config] = await Promise.all([
    getUploadToken(),
    getConfig()
  ]);
  
  const extension = file?.type?.split('/')?.[1] ?? '';
  const fileType = getType(extension);
  const Category = file?.type?.split('/')?.[0] === 'audio' ? 'audio' : fileType.type;
  const uploadOption = {
    userId: String(config.accountId),
    appId: config.uploadConfig.appId,
    stsToken,
    videoConfig: {
      spaceName: space,
      processAction: [
        {
          name: 'GetMeta',
        },
        {
          name: 'AddOptionInfo',
          input: {
            Title: file.name,
            Category: file?.type?.split('/')?.[0] === 'audio' ? 'audio' : fileType.type,
            FileType: fileType.fileType,
            Format: Category === 'audio' && extension === 'mpeg' ? 'mp3' : extension,
            RecordType: Category === 'image' ? 2 : undefined,
          },
        },
      ],
    },
    accountId: config.accountId,
    region: config.uploadConfig.region,
    videoHost: config.uploadConfig.videoHost,
  };
  
  const bytedUploader = new TTUploader(uploadOption);
  return bytedUploader;
};


// 获取剪辑项目信息
export const describeProject = async ({ GroupId, ProjectId }) => {
  const projectInfo = await post('/api/describeProject', { GroupId, ProjectId });
  return projectInfo.Result;
}

// 获取剪辑素材
export const searchEditMaterial = async ({ ProjectId, Space, EditMids }) => {
  const materialInfo = await post('/api/searchEditMaterial', { ProjectId, Space, EditMids });
  return materialInfo.Result;
};

// 更新剪辑项目
export const updateProject = async (project) => {
  const res = await post('/api/updateProject', project);
  return res.Result;
};

// 获取资源包列表
export const getEffectList = async (params) => {
  const res = await post('/api/getEffectList', params);
  return res.Result;
};

// 提交剪辑任务
export const submitEditTaskAsync = async (params) => {
  const res = await post('/api/submitEditTaskAsync', params);
  return res.Result;
};

// 删除剪辑素材
export const deleteEditMaterial = async (params) => {
  const res = await post('/api/deleteEditMaterial', params);
  return res.Result;
};

export const createEditMaterial = async (params) => {
  const res = await post('/api/createEditMaterial', params);
  return res.Result;
};

// 更新素材发布状态
export const updateMediaPublishStatus = async (params) => {
  const res = await post('/api/updateMediaPublishStatus', params);
  return res.Result;
};

// 视频搜索
export const searchVideo = async (params) => {
  const res = await get('/api/searchVideo', params);
  return res.Result;
};

// 获取视频播放信息
export const getVideoPlayInfo = async (params) => {
  const res = await get('/api/getVideoPlayInfo', params);
  return {
    ...res.Result?.VideoDetail?.VideoDetailInfo ?? {},
    ...res.Result?.VideoDetail?.VideoDetailInfo?.PlayInfo ?? {},
    PlayUrl: res.Result?.VideoDetail?.VideoDetailInfo?.PlayInfo?.MainPlayUrl,
  };
};

// 获取素材信息
export const mGetMaterial = async (params) => {
  const res = await get('/api/mGetMaterial', params);
  return res.Result;
};

// 获取上传token
export const getUploadToken = async () => {
  const res = await get('/api/getUploadToken');
  return res.Result;
};

// 获取配置
export const getConfig = async () => {
  const res = await get('/api/getConfig');
  return res.Result;
};


// 上传素材
export const uploadMaterial = async (file, space, region, handler) => {
  const { onComplete, onError, onProgress } = handler;
  const extension = file?.type?.split('/')?.[1] ?? '';
  const uploader = await initUploader(file, space, region);
  uploader.on('complete', (info) => {
    onComplete && onComplete({ file, info, space });
  });
  uploader.on('error', (error) => {
    onError && onError({ file, error });
  });
  uploader.on('progress', (info) => {
    onProgress && onProgress({ file, info });
  });
  const fileKey = uploader.addFile({
    file,
    type: getType(extension)?.fileType, // 上传文件类型，三个可选值：video(视频或者音频，默认值，火山为media)，image(图片)，object（普通文件）
  });
  uploader.start(fileKey);
};
