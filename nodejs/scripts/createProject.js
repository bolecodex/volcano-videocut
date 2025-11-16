#!/usr/bin/env node
/**
 * 创建剪辑工程的辅助脚本
 * 使用方法: node scripts/createProject.js <spaceName>
 */

require('dotenv').config();
const { request } = require('../utils/openapi');

async function createProject(spaceName) {
  if (!spaceName) {
    console.error('错误: 请提供空间名称');
    console.log('使用方法: node scripts/createProject.js <spaceName>');
    process.exit(1);
  }

  const projectName = `VevDemo-${Date.now()}`;
  
  const body = {
    ProjectName: projectName,
    Space: spaceName,
    EditParam: {
      Project: {
        Version: '1.0.0',
        Name: projectName,
        CreateTime: Date.now(),
        UpdateTime: Date.now(),
        Tag: 'TrackEditor'
      },
      Upload: {
        SpaceName: spaceName,
        VideoName: projectName
      },
      Output: {
        Alpha: false,
        Fps: 25,
        Codec: {
          VideoCodec: 'h264',
          Preset: 'slow',
          Crf: 23,
          AudioCodec: 'aac',
          AudioBitrate: 128
        },
        DisableVideo: false,
        DisableAudio: false,
        Cover: {
          DisableCover: false,
          CoverTime: [0]
        }
      },
      Canvas: {
        Width: 1920,
        Height: 1080,
        BackgroundColor: '#000000FF'
      }
    },
    ProjectType: 'track'
  };

  try {
    console.log(`正在创建剪辑工程...`);
    console.log(`空间名称: ${spaceName}`);
    console.log(`工程名称: ${projectName}`);
    
    const result = await request({
      action: 'CreateProject',
      version: '2018-01-01',
      method: 'POST',
      body,
    });

    if (result.Result) {
      console.log('\n✅ 剪辑工程创建成功!');
      console.log('==================================');
      console.log(`ProjectId: ${result.Result.ProjectId}`);
      console.log(`GroupId: ${result.Result.GroupId}`);
      console.log(`空间名称: ${spaceName}`);
      console.log('==================================\n');
      console.log('请将以上信息配置到前端代码中:');
      console.log(`1. 编辑 fe/index.js，修改第6行的 projectId 为: '${result.Result.ProjectId}'`);
      console.log(`2. 编辑 fe/index.js，修改第7行的 groupId 为: '${result.Result.GroupId}'`);
      console.log(`3. 编辑 fe/actions.js，修改第7行的 accountId 为实际账号ID`);
      console.log(`4. 空间名称 '${spaceName}' 会自动从 SDK 配置中获取\n`);
      
      return result.Result;
    } else {
      console.error('创建失败:', result);
      process.exit(1);
    }
  } catch (error) {
    console.error('创建剪辑工程失败:', error.message);
    console.error('详细错误:', error);
    process.exit(1);
  }
}

// 从命令行参数获取空间名称
const spaceName = process.argv[2];
createProject(spaceName);

