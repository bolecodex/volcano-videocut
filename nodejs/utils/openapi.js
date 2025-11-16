const { Signer, vodOpenapi, iam } = require('@volcengine/openapi');
const fetch = require('node-fetch');
require('dotenv').config();

//使用默认的service实例。你也可以创建一个新实例。
// const vodOpenapiService = new vodOpenapi.VodService();
const vodOpenapiService = vodOpenapi.defaultService;

// 设置ak/sk
vodOpenapiService.setAccessKeyId(process.env.VOLC_ACCESS_KEY);
vodOpenapiService.setSecretKey(process.env.VOLC_SECRET_KEY);

async function request({ method = 'POST', action, version, region = 'cn-north-1', params = {}, body = null, headers = {} }) {
  const openApiRequestData = {
    method,
    region,
    params: {
      Action: action,
      Version: version,
      ...params,
    },
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(method === 'POST' ? {
      body: JSON.stringify(body || {})
    } : {})
  };
  const signer = new Signer(openApiRequestData, 'vod');
  signer.addAuthorization({
    accessKeyId: process.env.VOLC_ACCESS_KEY,
    secretKey: process.env.VOLC_SECRET_KEY,
  });
  const query = new URLSearchParams(openApiRequestData.params).toString();

  try {
    const res = await fetch(`https://vod.volcengineapi.com/?${query}`, {
      method,
      headers: openApiRequestData.headers,
      ...(method === 'POST' ? {
        body: openApiRequestData.body,
      } : {}),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return e;
  }
}

async function getUploadToken() {
  const res = await vodOpenapiService.GetUploadToken();
  return res;
}

module.exports = { request, getUploadToken };