import React from 'react';
import { inject, observer } from 'mobx-react';


@inject('aboutStore')
@observer
class About extends React.Component {
  handleJump = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleJump}>home</button>
        {this.props.aboutStore.aboutData}
      </div>
    );
  }
}

export default About;
