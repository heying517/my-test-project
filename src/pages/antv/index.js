/* eslint-disable no-return-assign */
import React from 'react';
import { Icon } from 'antd';
import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components'; // graphin内部组件添加toolbar

import 'antd/dist/antd.less';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS
import './style/index.less';
// import { elementType } from 'prop-types';
// import '@antv/graphin/dist/index.css';

// const options = [
//   {
//     key: 'copy',
//     title: '复制表名',
//     visible: true,
//     iconType: <Icon type="copy" />, // antd icon 类型
//     onClick: (e) => {
//       console.log('copy');
//       console.log(e);
//     },
//   },
// ];

// const renderToolbar = (renderProps, state) => {
//   const { toolbarCfg } = renderProps;

//   const items = [
//     {
//       id: 'custom1',
//       name: 'custom1',
//       icon: <Icon type="layout" />,
//       disabled: false,
//       action: () => { console.log('layout action1'); },
//       style: {},
//       // renderTooltip: () => <div>123</div>,
//     },
//     {
//       id: 'custom2',
//       name: 'custom2',
//       icon: <Icon type="copy" />,
//       disabled: false,
//       action: () => { console.log('layout action2'); },
//       style: {},
//       // renderTooltip: () => <div>123</div>,
//     },
//   ];

//   return [...items, ...toolbarCfg];
// };

// 可渲染自定义右键菜单组件
// const MyContextMenu = (props) => (
//   <div>test app</div>
// );

// const data = Utils.mock(10).random(0.6).graphin();

// console.log(data);

class Antv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { nodes: [], edges: [] },
      selected: [],
      layout: {
        name: 'force',
      },
    };
    this.options = [
      {
        key: 'copy',
        title: '复制表名',
        visible: true,
        iconType: <Icon type="copy" />, // antd icon 类型
        onClick: () => {
          console.log('copy');
          console.log(this.state.selected);
          this.copy(this.state.selected[0].id);
        },
      },
    ];
  }

  componentDidMount() {
    // console.log(this.graphRef);
    // const { graph } = this.graphRef;
    // graph.on('node:click', (e) => {
    //   console.log(e);
    //   console.log([e.item.get('model')]);
    // });
    // graph.on('node:contextmenu', (e) => {
    //   console.log('点击右键node', e);
    //   window.event.returnValue = false;
    // });
    this.fetchData();
    document.body.addEventListener('contextmenu', this.noBrowsercontextmenu);
    this.graphRef.graph.on('node:mousedown', this.onNodeSelectChange);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this.noBrowsercontextmenu);
    this.graphRef.graph.off('node:mousedown', this.onNodeSelectChange);
  }

  onNodeSelectChange = (e) => {
    console.log(e);
    console.log(e.item.get('model'));
    const nodes = [e.item.get('model')];
    this.setState({
      selected: nodes,
    });
  };

  noBrowsercontextmenu = () => {
    window.event.returnValue = false;
    return false;
  }

  copy = (text) => {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    const res = document.execCommand('copy');
    document.body.removeChild(input);
    return res;
  }

  fetchData = () => {
    const res = {
      msg: 'ok',
      code: '200',
      tableRelation: {
        data: [
          {
            excetution_schedule: null,
            excetution_status: 'not_executed',
            from_hql: 'hdfs://xxx',
            hql_name: 'hdfs://xxx',
            isSearch: 1,
            key: 'dv.abc',
            name: 'dv.abc',
            status: 'not_executed',
            table_name: 'dv.abc',
            to_hql: null,
            update_time: null,
          }, {
            excetution_schedule: null,
            excetution_status: 'not_executed',
            from_hql: null,
            hql_name: 'hdfs://yyy',
            isSearch: 0,
            key: 'std.sp_xxx',
            name: 'std.sp_xxx',
            status: 'not_executed',
            table_name: 'std.sp_xxx',
            to_hql: 'hdfs://yyy',
            update_time: null,
          },
        ],
        links: [{
          from: 'full/dv.abc',
          hql_name: 'hdfs://xxx',
          source: 'dv.abc',
          target: 'std.sp_xxx',
          to: 'full/std.sp_xxx',
        }],
      },
    };
    const graphinData = { nodes: [], edges: [] };
    const { data, links } = res.tableRelation;
    data.forEach((item) => {
      const nodes = {
        id: item.key,
        label: item.name,
        data: {
          id: item.key,
          label: item.name,
          type: 'database',
        },
        // style: {
        //   primaryColor: 'red',
        // },
      };
      graphinData.nodes.push(nodes);
    });
    links.forEach((item) => {
      const edges = {
        source: item.source,
        target: item.target,
        // label: '',
        // style: {
        //   line: {
        //     width: 2,
        //   }
        // },
        data: {
          source: item.source,
          target: item.target,
          // label: '',
        },
      };
      graphinData.edges.push(edges);
    });
    this.setState({
      data: graphinData,
    });
    console.log(Utils.mock(10).random(0.6).graphin());
  }

  render() {
    const { layout, data } = this.state;
    return (
      <div className="app">
        <Graphin data={data} ref={(el) => this.graphRef = el} layout={layout}>
          {/* <Toolbar direction="vertical" render={renderToolbar} /> */}
          <ContextMenu options={this.options} />
          {/* <ContextMenu options={options} onContextmenu={() => true} /> */}
        </Graphin>
      </div>
    );
  }
}

export default Antv;
