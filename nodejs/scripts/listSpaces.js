#!/usr/bin/env node
/**
 * 查询点播空间列表的辅助脚本
 */

require('dotenv').config();
const { request } = require('../utils/openapi');

async function listSpaces() {
  try {
    console.log('正在查询点播空间列表...\n');
    
    const result = await request({
      action: 'ListSpace',
      version: '2018-01-01',
      method: 'GET',
      params: {},
    });

    if (result.Result && result.Result.SpaceInfoList) {
      console.log('✅ 找到以下空间:\n');
      console.log('==================================');
      result.Result.SpaceInfoList.forEach((space, index) => {
        console.log(`${index + 1}. 空间名称: ${space.SpaceName}`);
        console.log(`   状态: ${space.Status}`);
        console.log(`   创建时间: ${space.CreatedAt}`);
        console.log('----------------------------------');
      });
      console.log('\n使用以下命令创建剪辑工程:');
      console.log('node scripts/createProject.js <空间名称>');
      console.log('\n例如:');
      if (result.Result.SpaceInfoList.length > 0) {
        console.log(`node scripts/createProject.js ${result.Result.SpaceInfoList[0].SpaceName}`);
      }
    } else {
      console.log('未找到任何空间。请先在火山引擎控制台创建点播空间。');
    }
  } catch (error) {
    console.error('查询空间列表失败:', error.message);
    console.error('详细错误:', error);
    process.exit(1);
  }
}

listSpaces();

