import G6 from "@antv/g6";

const colorMap = {
  A: "#72CC4A",
  B: "#1A91FF",
  C: "#FFAA15",
};

function anchorPointsList(array, height, lineHeight, anchorR, padding) {
  const list = [];
  [0, 1].forEach((item) => {
    array.forEach((v, i) => {
      list.push([
        item,
        (lineHeight + padding[1] + anchorR / 2 + i * lineHeight) / height,
      ]);
    });
  });
  return list;
}

const modelNode = () => {
  const r = 2;
  const tHeight = 20;
  const lineHeight = 20;
  const padding = [5, 10];
  const anchorR = 4;
  G6.registerNode(
    "round-rect",
    {
      drawShape: function drawShape(cfg, group) {
        const { width, stroke } = cfg.style;
        const height = tHeight + lineHeight * cfg.panels.length + padding[0];
        const shap = group.addShape("rect", {
          attrs: {
            x: 0,
            y: 0,
            width,
            height,
            radius: r,
            stroke,
          },
          name: "main-box",
          draggable: true,
        });
        group.addShape("rect", {
          attrs: {
            x: 0,
            y: 0,
            width,
            height: tHeight,
            fill: stroke,
            radius: [r, r, 0, 0],
            cursor: "move",
          },
          name: "title-box",
          draggable: true,
        });
        // title text
        group.addShape("text", {
          attrs: {
            textBaseline: "top",
            y: 2,
            x: padding[1],
            lineHeight,
            text: cfg.title,
            fill: "#fff",
          },
          name: "title",
        });
        // The content list
        cfg.panels.forEach((item, index) => {
          // name text
          group.addShape("text", {
            attrs: {
              textBaseline: "top",
              y: lineHeight + padding[0] + index * lineHeight,
              x: padding[1],
              lineHeight,
              text:
                typeof item.title === "string" && item.title.length > 15
                  ? `${item.title.substring(0, 16)}...`
                  : item.title,
              fill: "rgba(0,0,0, 0.4)",
              draggable: true,
            },
            name: `table-list-left-${index}==>${item.title}`,
          });
          // value text
          group.addShape("text", {
            attrs: {
              textBaseline: "top",
              y: lineHeight + padding[0] + index * lineHeight,
              x: width - padding[1],
              lineHeight,
              text: item.value,
              fill: "#595959",
              textAlign: "right",
            },
            name: `table-list-right-${index}`,
          });
          // 锚点样式
          group.addShape("circle", {
            attrs: {
              y: lineHeight + padding[1] + anchorR / 2 + index * lineHeight,
              x: 0,
              r: anchorR,
              fill: "transparent",
            },
            name: `circle-shape-left-${index}`,
          });
          group.addShape("circle", {
            attrs: {
              y: lineHeight + padding[1] + anchorR / 2 + index * lineHeight,
              x: width,
              r: anchorR,
              fill: "transparent",
            },
            name: `circle-shape-right-${index}`,
          });
        });
        return shap;
      },
      getAnchorPoints: function getAnchorPoints(cfg) {
        console.log("getAnchorPoints");
        console.log(cfg);
        const height = tHeight + lineHeight * cfg.panels.length + padding[0];
        return anchorPointsList(
          cfg.panels,
          height,
          lineHeight,
          anchorR,
          padding
        );
      },
      update: function update(cfg, item) {
        const group = item.getContainer();
        const children = group.get("children");
        const node = children[0];
        console.log(node);
        console.log(children);
        // const circleLeft = children[1];
        // const circleRight = children[2];
        // const { stroke } = cfg.style;
        // if (stroke) {
        //   node.attr("stroke", stroke);
        //   circleLeft.attr("fill", stroke);
        //   circleRight.attr("fill", stroke);
        // }
      },
      // 设置状态
      setState(name, value, item) {
        const group = item.getContainer();
        const children = group.get("children");
        const shape = children[0]; // 顺序根据 draw 时确定
        const titleBox = children[1]; // 顺序根据 draw 时确定
        const anchor = children.filter(
          (v) => v.cfg.name.indexOf("circle-shape-") > -1
        );
        if (name === "selected") {
          if (value) {
            shape.attr("stroke", colorMap.B);
            titleBox.attr("fill", colorMap.B);
            anchor.forEach((v, i) => anchor[i].attr("fill", colorMap.B));
          } else {
            shape.attr("stroke", colorMap.A);
            titleBox.attr("fill", colorMap.A);
            anchor.forEach((v, i) => anchor[i].attr("fill", "transparent"));
          }
        }
        // if (name === "active") {
        //   if (value) {
        //
        //   } else {
        //
        //   }
        // }
      },
    },
    "single-node"
  );
};

export default modelNode;
