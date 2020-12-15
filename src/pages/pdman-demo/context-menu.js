/* eslint-disable no-case-declarations */
import G6 from '@antv/g6';

function contextMenu(setVisible, setFrom, setTo, setCurrentItem, removeEdge) {
  // eslint-disable-next-line no-new
  const menu = new G6.Menu({
    getContent(evt) {
      console.log(evt);
      return `
      <ul class="right-context-menu">
        <li id="relation">对应关系</li>
        <li id="delete">删除连线</li>
      </ul>`;
    },
    handleMenuClick: (target, item) => {
      console.log(target, item);
      switch (target.id) {
        case "relation":
          const {
            label
          } = item._cfg.model;
          setCurrentItem(item);
          setVisible(true);
          setFrom(label.substring(0, 1));
          setTo(label.substring(2, 3));
          break;
        case "delete":
          removeEdge(item);
          break;
        default:
      }
    },
    // offsetX and offsetY include the padding of the parent container
    // 需要加上父级容器的 padding-left 16 与自身偏移量 10
    offsetX: 16 + 10,
    // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
    offsetY: 0,
    // the types of items that allow the menu show up
    // 在哪些类型的元素上响应
    itemTypes: ['edge'],
  });
  return menu;
}

export default contextMenu;
