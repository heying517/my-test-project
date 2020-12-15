/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
const graphEvent = (graph, tooltipRef) => {
  const nodeInfo = {
    addingEdge: false,
    edge: null,
    source: null,
  };

  // 点击时选中，再点击时取消，出现锚点和连线
  graph.on("node:click", function (ev) {
    const node = ev.item;
    const {
      name
    } = ev.target.cfg;
    if (name && name.indexOf("circle-shape-") < 0) {
      graph.setItemState(node, "selected", !node.hasState("selected")); // 切换选中
      return;
    }
    if (!node._cfg.states.includes("selected")) {
      return;
    }
    // The position where the mouse clicks
    const model = node.getModel();
    const nameList = name.split("-");
    const originIndex = Number(nameList[nameList.length - 1]);
    let index = Number(nameList[nameList.length - 1]);
    const direction = nameList[nameList.length - 2];
    const allAnchor = node.getAnchorPoints();

    index = direction === "left" ? index : allAnchor.length / 2 + index;

    if (nodeInfo.addingEdge && nodeInfo.edge) {
      if (nodeInfo.source === ev.item._cfg.id) {
        return;
      }
      let haveEdge = false;
      const {
        edges
      } = graph.cfg;
      if (edges.length > 1) {
        for (let i = 0; i < edges.length - 1; i += 1) {
          const sourceAnchor =
            edges[i]._cfg.sourceAnchorIndex >= allAnchor.length / 2 ?
            edges[i]._cfg.sourceAnchorIndex % (allAnchor.length / 2) :
            edges[i]._cfg.sourceAnchorIndex;
          const targetAnchor =
            edges[i]._cfg.targetAnchorIndex >= allAnchor.length / 2 ?
            edges[i]._cfg.targetAnchorIndex % (allAnchor.length / 2) :
            edges[i]._cfg.targetAnchorIndex;
          if (
            ((edges[i]._cfg.model.source === nodeInfo.source &&
                edges[i]._cfg.model.target === node._cfg.id) ||
              (edges[i]._cfg.model.target === nodeInfo.source &&
                edges[i]._cfg.model.source === node._cfg.id)) &&
            (originIndex === sourceAnchor || originIndex === targetAnchor)
          ) {
            haveEdge = true;
            break;
          }
        }
      }
      if (haveEdge) {
        console.log("重复");
        return;
      }
      graph.updateItem(nodeInfo.edge, {
        target: model.id,
        targetAnchor: index, // 锚点索引
        label: "n:1",
      });
      graph.addBehaviors({
        type: "zoom-canvas",
        minZoom: 0.0001,
        maxZoom: 2.1,
      }, 'default');
      nodeInfo.edge = null;
      nodeInfo.addingEdge = false;
      nodeInfo.sourceAnchor = null;
      nodeInfo.source = null;
    } else {
      graph.removeBehaviors('zoom-canvas', 'default');
      // Add anew edge, the end node is the current node user clicks
      nodeInfo.edge = graph.addItem("edge", {
        source: model.id,
        target: model.id,
        sourceAnchor: index, // 锚点索引
        targetAnchor: index, // 锚点索引
      });
      nodeInfo.addingEdge = true;
      nodeInfo.sourceAnchor = index;
      nodeInfo.source = model.id;
    }
  });

  // 移动连线
  graph.on("canvas:mousemove", function (ev) {
    if (nodeInfo.addingEdge && nodeInfo.edge) {
      // Update the end node to the current node the mouse clicks
      // The current position the mouse clicks
      const point = {
        x: ev.x,
        y: ev.y
      };
      graph.updateItem(nodeInfo.edge, {
        target: point,
      });
    }
  });

  graph.on("edge:click", function (ev) {
    const currentEdge = ev.item;
    // 未连接成功
    if (nodeInfo.addingEdge && nodeInfo.edge === currentEdge) {
      graph.removeItem(nodeInfo.edge);
      graph.addBehaviors({
        type: "zoom-canvas",
        minZoom: 0.0001,
        maxZoom: 2.1,
      }, 'default');
      nodeInfo.edge = null;
      nodeInfo.addingEdge = false;
      nodeInfo.sourceAnchor = null;
      nodeInfo.source = null;
    }
  });

  graph.on("node:mouseover", function (ev) {
    const node = ev.item;
    if (
      nodeInfo.addingEdge &&
      nodeInfo.edge &&
      !node._cfg.states.includes("selected")
    ) {
      graph.setItemState(node, "selected", true); // 切换选中
    }
    if (!nodeInfo.addingEdge &&
      !nodeInfo.edge &&
      ev.target.cfg.name &&
      ev.target.cfg.name.indexOf("table-list-left-") > -1 &&
      ev.target.cfg.attrs.text &&
      ev.target.cfg.attrs.text.indexOf("...") > -1
    ) {
      tooltipRef.current.innerHTML = ev.target.cfg.name.split("==>")[1];
      tooltipRef.current.style.top = `${ev.target.cfg.canvasBBox.y - 30  }px`;
      tooltipRef.current.style.left = `${ev.target.cfg.canvasBBox.x }px`;
      tooltipRef.current.style.display = "block";
    }
  });

  graph.on("node:mouseleave", function (ev) {
    if (tooltipRef.current.style.display === "block") {
      tooltipRef.current.style.display = "none";
    }
  });

  // graph.on("node:mouseleave", function (ev) {
  //   const node = ev.item;
  //   if (
  //     // nodeInfo.addingEdge &&
  //     // nodeInfo.edge &&
  //     node._cfg.states.includes("active")
  //   ) {
  //     // graph.setItemState(node, "active", false); // 切换选中
  //   }
  // });

  // graph.on("afterupdateitem", (e) => {
  //   console.log(e);
  // });


}

export default graphEvent;
