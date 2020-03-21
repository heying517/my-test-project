import React from 'react';

import './style/index.less';

export default function NotFound404(props) {
  return (
    <div id="not-found-404">
      <h1>404 Not Found</h1>
      <p>您访问页面不存在或没有访问权限</p>
      <a href="/">返回首页</a>
    </div>
  );
}
