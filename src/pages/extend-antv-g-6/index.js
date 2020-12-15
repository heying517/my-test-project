/* eslint-disable no-return-assign */
import React from 'react';
import { Icon } from 'antd';
import Graphin, { Utils } from '@antv/graphin';
// import { Toolbar, ContextMenu } from '@antv/graphin-components'; // graphin内部组件添加toolbar

import 'antd/dist/antd.less';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS
import './style/index.less';
// import { elementType } from 'prop-types';
// import '@antv/graphin/dist/index.css';

const defaultStyles = {
  /** container 容齐 */
  containerWidth: 40,
  containerStroke: '#0693E3',
  containerFill: '#fff',
  /** icon 图标 */
  iconSize: 10,
  iconFill: '#0693E3',
  /** badge 徽标 */
  badgeFill: 'red',
  badgeFontColor: '#fff',
  badgeSize: 10,
  /** text 文本 */
  fontColor: '#3b3b3b',
  fontSize: 12,
  /** state */
  dark: '#eee',
};

const dataSource = Utils.mock(10)
  .circle()
  .graphin();

const nodes = dataSource.nodes.map((n, index) => {
  if (index % 2 === 0) {
    return { ...n, shape: 'RectNode' };
  }
  return n;
});


const extendNodeShape = (graphin, props) => [
  {
    name: 'RectNode',
    render: (node) => {
      const style = {
        ...defaultStyles,
        ...node.style,
      };
      const badgeNumber = Math.round(Math.random() * 20); // node.data.properties.length;
      return {
        shape: 'RectNode',
        shapeComponents: [
          {
            shape: 'rect',
            attrs: {
              id: 'rect-container',
              x: 0,
              y: 0,
              width: style.containerWidth,
              height: style.containerWidth,
              fill: style.containerFill,
              stroke: style.containerStroke,
              cursor: 'pointer',
              lineWidth: 2,
              radius: 2,
            },
          },
          {
            shape: 'circle',
            attrs: {
              id: 'badge',
              x: style.containerWidth,
              y: 0,
              r: style.badgeSize,
              fill: style.badgeFill,
              cursor: 'pointer',
              lineWidth: 1,
            },
          },
          {
            shape: 'text',
            attrs: {
              id: 'badge-text',
              x: style.containerWidth,
              y: -4,
              text: badgeNumber,
              fontSize: 10,
              cursor: 'pointer',
              fill: '#fff',
              textAlign: 'center',
              textBaseline: 'top',
            },
          },
          {
            shape: 'circle',
            attrs: {
              id: 'node-icon',
              symbol: node.data.type,
              x: style.containerWidth / 2,
              y: style.containerWidth / 2,
              r: style.iconSize,
              fill: style.iconFill,
            },
          },
          {
            shape: 'text',
            attrs: {
              id: 'text-desc',
              text: node.data.label,
              x: 0,
              y: style.containerWidth * 1.3,
              cursor: 'pointer',
              fontSize: style.fontSize,
              fill: style.fontColor,
              fontWeight: 'lighter',
              fontFamily: 'Courier New',
              textAlign: 'center',
              textBaseline: 'top',
            },
          },
        ],
        state: {
          selected: {
            'rect-container': {
              stroke: style.containerStroke,
              fill: style.containerStroke,
              animate: {
                attrs: {
                  lineWidth: 6,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 2,
                  shadowColor: '#fff',
                  repeat: false, // 循环
                },
                duration: 200,
                easing: 'easeCubic',
                callback: null,
                delay: 0,
              },
            },
            'node-icon': {
              fill: '#fff',
            },
            badge: {
              lineWidth: 6,
            },
          },
        },
        'highlight.dark': {
          'rect-container': {
            fill: style.dark,
            stroke: style.dark,
            lineWidth: 0,
          },
          'node-icon': {
            fill: style.dark,
          },
          'text-desc': {
            fill: '#eee',
          },
          badge: {
            fill: style.dark,
          },
          'badge-text': {
            fill: style.dark,
          },
        },
      };
    },
  },
];

const extendLayout = (graphin, props) => [
  {
    name: 'custom',
    desc: '自定义随机布局',
    icon: <Icon type="home" />,
    layout: (data, options) => {
      const defaultOptions = { w: 500, h: 500 };
      const opts = { ...defaultOptions, ...options };
      const nodeList = data.nodes.map((n) => ({
        ...n,
        x: Math.round(Math.random() * opts.w),
        y: Math.round(Math.random() * opts.h),
      }));
      return {
        data: {
          nodes: nodeList,
          edges: props.data.edges,
        },
      };
    },
  },
];

const ExtendAntvG6 = (props) => (
  <div className="appcontainer">
    <div className="app1">
      <Graphin
        data={dataSource}
        layout={{
          name: 'custom',
          options: {
            w: 400,
            h: 400,
          },
        }}
        extend={{
          layout: extendLayout,
        }}
      />
    </div>
    <div className="app2">
      <Graphin
        data={{
          nodes,
          edges: dataSource.edges,
        }}
        layout={{
          name: 'concentric',
        }}
        extend={{
          nodeShape: extendNodeShape,
        }}
      />
    </div>
  </div>
);

export default ExtendAntvG6;
