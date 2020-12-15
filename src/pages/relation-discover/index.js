/* eslint-disable no-mixed-operators */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { message } from 'antd';
import { chunk } from 'lodash';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

class RelationDiscover extends React.Component {
  state = {
    selected: [],
    data: Utils.mock(20)
      .random()
      .graphin(),
  }

  componentDidMount() {
    const { graph } = this.graphRef;
    graph.on('nodeselectchange', this.onNodeSelectChange);
  }

  componentWillUnmount() {
    graph.off('nodeselectchange', this.onNodeSelectChange);
  }

  onNodeSelectChange = (e) => {
    const nodes = e.selectedItems.nodes.map((node) => node.get('model'));
    this.setState({
      selected: nodes,
    });
  };

  onFindConnections = () => {
    const { selected, data } = this.state;
    if (selected.length === 0) {
      message.info('请先选中/圈选节点');
      return;
    }

    const findConnectionData = { nodes: [], edges: [] };
    // 1度扩散，中间经历一个节点
    const sortArray = chunk(selected, 2);
    console.log(sortArray);
    sortArray.forEach((arr) => {
      const [source, target = selected[0]] = arr;
      console.log(source);
      console.log(target);
      const relativeNode = {
        id: `find-node-${source.id}-${target.id}`,
        shape: 'CircleNode',
        label: 'discover node',
        style: {
          primaryColor: '#ff7617',
          icon: 'home',
          nodeSize: 20,
        },
        data: {
          id: `find-node-${source.id}-${target.id}`,
        },
      };
      findConnectionData.nodes.push(...arr, relativeNode);
      findConnectionData.edges.push(
        {
          source: source.id,
          target: relativeNode.id,
          shape: 'LineEdge',
          label: '一度发现',
          style: {
            line: {
              dash: [2, 2],
            },
          },
          data: {
            source: source.id,
            target: relativeNode.id,
          },
        },
        {
          source: relativeNode.id,
          target: target.id,
          shape: 'LineEdge',
          label: '一度发现',
          style: {
            line: {
              dash: [2, 2],
            },
          },
          data: {
            source: relativeNode.id,
            target: target.id,
          },
        },
      );
    });

    this.setState({
      data: {
        // 还需要对Node和Edge去重，这里暂不考虑
        nodes: [...data.nodes, ...findConnectionData.nodes],
        edges: [...data.edges, ...findConnectionData.edges],
      },
    });
  };


  render() {
    return (
      <div className="app">
        <h3>
          基于力导的关系发现：按住Shift圈选你需要发现关系的节点
          <button
            type="submit"
            onClick={this.onFindConnections}
            style={{ float: 'right', height: '28px', lineHeight: '28px' }}
          >
            点击发现关系
          </button>
        </h3>
        <Graphin
          ref={(el) => this.graphRef = el}
          data={this.state.data}
          layout={{
            name: 'force',
            options: {
              defSpringLen: (_edge, source, target) => {
                const nodeSize = 30;
                const Sdegree = source.data.layout && source.data.layout.degree || 0;
                const Tdegree = target.data.layout && target.data.layout.degree || 0;
                const minDegree = Math.min(Sdegree, Tdegree);
                return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize * 2;
              },
            },
          }}
        >
          <Toolbar style={{ position: 'absolute', bottom: 28, left: 28 }} />
        </Graphin>
      </div>
    );
  }
}

export default RelationDiscover;
