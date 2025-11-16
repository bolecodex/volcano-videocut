const { request, getUploadToken } = require('../utils/openapi');

exports.getDemoData = async () => ({ message: 'This is a demo API' })

exports.createProject = async (body, headers) => {
  return await request({
    action: 'CreateProject',
    version: '2018-01-01',
    method: 'POST',
    body,
    headers,
  });
};

exports.describeProject = async ({ GroupId, ProjectId }, headers) => {
  return await request({
    action: 'DescribeProject',
    version: '2018-01-01',
    method: 'POST',
    body: {
      GroupId: GroupId,
      ProjectId: Array.isArray(ProjectId) ? ProjectId : [ProjectId],
    },
    headers,
  });
};

exports.searchEditMaterial = async ({ ProjectId, Space, EditMids }, headers) => {
  return await request({
    action: 'SearchEditMaterial',
    version: '2018-01-01',
    method: 'POST',
    body: {
      ProjectId,
      Space,
      EditMids,
    },
    headers,
  });
};

exports.updateProject = async (body, headers) => {
  return await request({
    action: 'UpdateProject',
    version: '2018-01-01',
    method: 'POST',
    body,
    headers,
  });
};

exports.getEffectList = async (body, headers) => {
  return await request({
    action: 'GetEffectList',
    version: '2018-01-01',
    method: 'POST',
    body,
    headers,
  });
};

exports.submitEditTaskAsync = async (body, headers) => {
  return await request({
    action: 'SubmitEditTaskAsync',
    version: '2018-01-01',
    method: 'POST',
    body,
    headers,
  });
};

exports.deleteEditMaterial = async (body, headers) => {
  return await request({
    action: 'DeleteEditMaterial',
    version: '2018-01-01',
    method: 'POST',
    body,
    headers,
  });
};

exports.createEditMaterial = async (body, headers) => {
  return await request({
    action: 'CreateEditMaterial',
    version: '2018-01-01',
    method: 'POST',
    body,
    headers,
  });
};

exports.updateMediaPublishStatus = async (body, headers) => {
  return await request({
    action: 'UpdateMediaPublishStatus',
    version: '2020-08-01',
    method: 'POST',
    body,
    headers,
  });
};

exports.searchVideo = async (body, headers) => {
  return await request({
    action: 'SearchVideo',
    version: '2018-01-01',
    method: 'GET',
    params: body,
    headers,
  });
};

exports.getVideoPlayInfo = async (body, headers) => {
  return await request({
    action: 'GetVideoPlayInfo',
    version: '2018-01-01',
    method: 'GET',
    params: body,
    headers,
  });
};

exports.mGetMaterial = async (body, headers) => {
  return await request({
    action: 'MGetMaterial',
    version: '2018-01-01',
    method: 'GET',
    params: body,
    headers,
  });
};

exports.getUploadToken = async () => {
  return {
    Result: await getUploadToken(),
  };
};

exports.getConfig = async () => {
  return {
    Result: {
      accountId: process.env.ACCOUNT_ID,
      spaceName: process.env.SPACE_NAME,
      projectId: process.env.PROJECT_ID,
      groupId: process.env.GROUP_ID,
      region: process.env.REGION || 'cn-north-1',
      uploadConfig: {
        appId: parseInt(process.env.UPLOAD_APP_ID || '0'),
        region: process.env.REGION || 'cn-north-1',
        videoHost: process.env.VIDEO_HOST || 'https://vod.volcengineapi.com',
      }
    }
  };
};