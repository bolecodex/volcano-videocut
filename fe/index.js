import { describeProject, searchEditMaterial, updateProject, getEffectList, submitEditTaskAsync, deleteEditMaterial, createEditMaterial, updateMediaPublishStatus, searchVideo, getVideoPlayInfo, mGetMaterial, uploadMaterial, getConfig } from './actions.js';

// 异步初始化编辑器
(async function initEditor() {
  // 从后端获取配置
  const config = await getConfig();
  
  window.veveditor = new window.VeVEditor({
    container: document.getElementById('editor'),
    config: {
      projectId: config.projectId,
      groupId: config.groupId,
      region: config.region,
    autoPublish: true,
    material: {
      show: true,
      enableLocalUpload: true,
      emptyIcon: './static/upload.svg',
      uploadAccept: 'image/*,.mp3,.mp4,.webm',
      videoAccept: '.mp4,.webm',
    },
    filter: {
      show: true,
    },
    transition: {
      show: true,
    },
    effect: {
      show: true,
    },
    text: {
      show: true,
      enableAnimation: true,
    },
    header: {
      show: true,
      isProjectNameEditable: true,
      isNavBackVisible: true,
      isProjectSubmitVisible: true,
    },
  },
  actions: {
    searchVideo,
    mGetMaterial,
    describeProject,
    updateProject,
    searchEditMaterial,
    getEffectList,
    submitEditTaskAsync,
    deleteEditMaterial,
    createEditMaterial,
    updateMediaPublishStatus,
    getVideoInfo: getVideoPlayInfo,
  },
  handlers: {
    uploadMaterial,
    onNavBack: () => {
      console.log('cus-> onNavBack');
    },
    onUploadMaterial: () => {
      console.log('cus-> onUploadMaterial');
    },
    onProjectSubmit: () => {
      console.log('cus-> afterProjectSubmit');
    },
  },
  });
})().catch(error => {
  console.error('初始化编辑器失败:', error);
  alert('初始化失败，请检查配置或刷新页面重试');
});
