/* eslint-disable no-param-reassign */
import 'whatwg-fetch';
// import Cookie from 'js-cookie';
import { apiInfo, apiInfoPostHooks, apiInfoPreHooks } from './helper';
// import message from '@/utils/message';


apiInfoPreHooks.push(async (data) => {
  // data.csrfToken = localStorage.getItem('contras');
  // const search = new URLSearchParams({
  // ...data.params,
  // }).toString();
  // data.url = `${apiInfo.apiUrl}${data.path}?${search}`;
  data.url = `${apiInfo.apiUrl}${data.path}`;
  console.log(data.url);
});

apiInfoPostHooks.push(async (res, data, showError) => {
  console.log(res);
  // eslint-disable-next-line
  if (res.code == 0) {
    return res.data;
  }

  // eslint-disable-next-line
  showError !== false && apiInfo.Message.error(res.resultMsg);

  // if (res.code === -3) { // session失效，跳到登录页
  //   setTimeout(() => {
  //     if (process.env.NODE_ENV === 'development') {
  //       window.location.assign(`${G.root}/login`);
  //     } else {
  //       window.location.assign(G.path.login);
  //     }
  //   }, 1000);
  // }

  throw res;
});

// apiInfo.apiUrl = '/smb';

apiInfo.Message = {
  info(...args) {
    console.log(...args);
  },
  error(...args) {
    console.log(...args);
  },
};

export default apiInfo;
