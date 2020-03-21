import 'whatwg-fetch';

export const preHooks = [];
export const postHooks = [];

async function apiInfo(data, showError, ...args) {
  let info;
  if (data.then) {
    info = data;
  } else {
    if (preHooks.length > 0) {
      // eslint-disable-next-line no-param-reassign
      data = await preHooks.reduce(async (dP, hook) => {
        const d = await Promise.resolve(dP);
        const hookRes = await hook(d, data, showError, ...args);
        return hookRes === undefined ? d : hookRes;
      }, data);
    }

    const {
      url = apiInfo.apiUrl, ...reqData
    } = data;

    const fetchOption = typeof apiInfo.fetchOption === 'function'
      ? apiInfo.fetchOption(reqData, url) : {
        ...apiInfo.fetchOption,
        body: JSON.stringify(reqData),
      };

    info = fetch(url, fetchOption);
  }

  let rawRes;
  try {
    rawRes = await info;
  } catch (err) {
    apiInfo.Message.error('网络异常，请重试！');
    throw err;
  }

  let res;
  try {
    res = await rawRes.json();
  } catch (err) {
    res = {
      errno: -1,
      errmsg: '服务器响应出错',
    };
  }

  res = res || {
    errno: -1,
    errmsg: '请求失败，请重试！',
  };

  if (postHooks.length > 0) {
    res = await postHooks.reduce(async (dP, hook) => {
      const d = await Promise.resolve(dP);
      const hookRes = await hook(d, data, showError, ...args);
      return hookRes === undefined ? d : hookRes;
    }, res);
  }

  return res;
}

apiInfo.apiUrl = '/api';

apiInfo.Message = {
  error(msg) {
    // eslint-disable-next-line
		alert(msg);
  },
};

apiInfo.fetchOption = {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

export default apiInfo;
