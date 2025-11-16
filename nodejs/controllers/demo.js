const demoService = require('../services/demo')
exports.getDemoData = async (ctx) => {
  const data = await demoService.getDemoData();
  ctx.body = {
    code: 0,
    data,
  };
};

exports.createProject = async (ctx) => {
  try {
    const data = await demoService.createProject(ctx.request.body, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.describeProject = async (ctx) => {
  const { ProjectId, GroupId } = ctx.request.body;
  if (!ProjectId || !GroupId) {
    ctx.body = {
      code: 1,
      message: 'ProjectId or GroupId is empty',
    };
    return;
  }
  try {
    const data = await demoService.describeProject({ ProjectId, GroupId }, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.searchEditMaterial = async (ctx) => {
  const { ProjectId, Space, EditMids } = ctx.request.body;
  if (!ProjectId || !Space) {
    ctx.body = {
      code: 1,
      message: 'ProjectId or Space is empty',
    };
    return;
  }
  try {
    const data = await demoService.searchEditMaterial({ ProjectId, Space, EditMids }, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.updateProject = async (ctx) => {
  try {
    const data = await demoService.updateProject(ctx.request.body, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.getEffectList = async (ctx) => {
  try {
    const data = await demoService.getEffectList(ctx.request.body, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.submitEditTaskAsync = async (ctx) => {
  try {
    const data = await demoService.submitEditTaskAsync(ctx.request.body, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.deleteEditMaterial = async (ctx) => {
  try {
    const data = await demoService.deleteEditMaterial(ctx.request.body, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.createEditMaterial = async (ctx) => {
  try {
    const data = await demoService.createEditMaterial(ctx.request.body, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.updateMediaPublishStatus = async (ctx) => {
  try {
    const data = await demoService.updateMediaPublishStatus(ctx.request.body, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.getMediaList = async (ctx) => {
  try {
      console.log('getMediaList', ctx.query.SpaceName);
    const data = await demoService.getMediaList(ctx.query, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.searchVideo = async (ctx) => {
  try {
    const data = await demoService.searchVideo(ctx.query, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.getVideoPlayInfo = async (ctx) => {
  try {
    const data = await demoService.getVideoPlayInfo(ctx.query, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.mGetMaterial = async (ctx) => {
  try {
    const data = await demoService.mGetMaterial(ctx.query, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.getUploadToken = async (ctx) => {
  try {
    const data = await demoService.getUploadToken(ctx.query, ctx.state.customHeaders);
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};

exports.getConfig = async (ctx) => {
  try {
    const data = await demoService.getConfig();
    ctx.body = data;
  } catch (error) {
    ctx.body = {
      code: 1,
      message: error.message,
    };
  }
};
