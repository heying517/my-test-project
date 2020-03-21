import React from 'react';
import { inject, observer } from 'mobx-react';
import apiInfo from '@/utils/api-info';

@inject('homeStore')
@observer
class Home extends React.Component {
  handleReq = () => {
    apiInfo({
      path: '/test',
      params: {
        sex: 'man',
      },
    }).then((res) => { console.log('res', res); });
  };

  handleJump = () => {
    this.props.history.push('/about');
  };
  render() {
    return (
      <div>
        {this.props.homeStore.homeData}
        <button type="button" onClick={this.handleReq}>请求</button>
        <button type="button" onClick={this.handleJump}>跳转</button>
      </div>
    );
  }
}

export default Home;
