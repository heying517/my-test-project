/* eslint-disable no-return-assign */
import React from "react";
import "antd/dist/antd.css";
import { Carousel } from "antd";
import "./style/index.less";

class Test extends React.Component {
  render() {
    return (
      <Carousel dotPosition="right" ref={(el) => (this.ca = el)}>
        <div
          onWheel={() => {
            this.ca.goTo(1);
          }}
        >
          <h3>1</h3>
        </div>
        <div>
          <h3 className="two">2</h3>
        </div>
      </Carousel>
    );
  }
}

export default Test;
