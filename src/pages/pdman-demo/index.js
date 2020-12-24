/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
import * as React from "react";
import G6 from "@antv/g6";
import { Modal, Select } from "antd";
// import { GraphLayoutPredict } from "@antv/vis-predict-engine";
import modelNode from "./model-node";
import graphEvent from "./graph-event";
import contextMenu from "./context-menu";
import data from "./data";

import "./index.less";

const { Option } = Select;

// console.log(data);

// const data = {
//   nodes: [
//     {
//       id: "2",
//       title: "Company2",
//       x: 500,
//       y: 20,
//       panels: {fields:[
//         {
//           type: "abc",
//           name: "string",
//         },
//       ]},
//     },
//   ],
// };

let graph = null;

modelNode(); // 自定义node
const PdmanDemo = () => {
  const [visible, setVisible] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState(null);
  const [from, setFrom] = React.useState("n");
  const [to, setTo] = React.useState("1");

  const graphRef = React.useRef(null);
  // const tooltipRef = React.useRef(null);

  React.useEffect(() => {
    if (!graph) {
      const width = document.getElementById("canvas").scrollWidth;
      const height = document.getElementById("canvas").scrollHeight || 500;
      graph = new G6.Graph({
        container: graphRef.current,
        width,
        height,
        // layout: {
        //   type: "dagre",
        //   rankdir: "LR",
        //   nodesep: 100,
        //   ranksep: 100,
        // },
        // layout: {
        //   type: "grid",
        //   begin: [0, 0], // 可选，
        //   preventOverlap: true, // 可选，必须配合 nodeSize
        //   preventOverlapPdding: 20, // 可选
        //   nodeSize: 200, // 可选
        //   condense: false, // 可选
        //   sortBy: "degree", // 可选
        //   workerEnabled: true, // 可选，开启 web-worker
        // },
        modes: {
          default: [
            "drag-canvas",
            {
              type: "zoom-canvas",
              minZoom: 0.5,
              maxZoom: 2,
            },
            {
              type: "drag-node",
              // enableDelegate: true,
            },
          ],
        },
        plugins: [
          contextMenu(setVisible, setFrom, setTo, setCurrentItem, removeEdge),
        ],
        defaultNode: {
          type: "round-rect",
          labelCfg: {
            style: {
              fill: "#000000A6",
              fontSize: 10,
            },
          },
          style: {
            stroke: "#72CC4A",
          },
        },
        defaultEdge: {
          type: "polyline",
          /* configure the bending radius and min distance to the end nodes */
          lineWidth: 2,
          style: {
            radius: 10,
            offset: 30,
            endArrow: true,
            /* and other styles */
            stroke: "#F6BD16",
          },
          labelCfg: {
            style: {
              fontSize: 16,
            },
          },
        },
      });

      graph.data(data);
      graph.render();
    }

    // graphEvent(graph, tooltipRef);
    graphEvent(graph);

    if (typeof window !== "undefined") {
      window.onresize = () => {
        const container = graphRef.current;
        if (!graph || graph.get("destroyed")) return;
        if (!container || !container.scrollWidth || !container.scrollHeight)
          return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
    }

    // 去掉浏览器自带右键菜单
    window.addEventListener("contextmenu", noBrowserContextMenu);
    return () => {
      window.removeEventListener("contextmenu", noBrowserContextMenu);
    };
  }, []);

  const handleOk = () => {
    graph.updateItem(currentItem, {
      label: `${from}:${to}`,
    });
    setVisible(false);
  };

  const removeEdge = (item) => {
    graph.removeItem(item);
  };

  return (
    <div className="container">
      <div id="canvas" ref={graphRef} className="padman-demo" />
      {/* <div className="custom-tooltip" ref={tooltipRef} /> */}
      <Modal
        visible={visible}
        title="编辑对应关系"
        wrapClassName="edit-relation-modal"
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <div className="edit-relation">
          <div className="from">
            <span>from</span>
            <Select
              defaultValue="lucy"
              style={{ width: 80 }}
              value={from}
              onChange={(v) => setFrom(v)}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="n">n</Option>
            </Select>
          </div>
          <div>
            <span>to</span>
            <Select
              defaultValue="lucy"
              style={{ width: 80 }}
              value={to}
              onChange={(v) => setTo(v)}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="n">n</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PdmanDemo;

function noBrowserContextMenu() {
  window.event.returnValue = false;
  return false;
}
