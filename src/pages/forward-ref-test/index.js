import * as React from "react";
import { Button } from "antd";
import devWarning from "rc-util/lib/warning";

const Child = React.forwardRef((props, ref) => {
  return <input ref={ref} />;
});

const ForwardRefTest = (props) => {
  const [count, setCount] = React.useState(0);
  const ref = React.createRef();
  const uRef = React.useRef(null);
  // const
  const handleClick = () => {
    console.log(ref);
    console.log(ref.current);
    console.log(uRef);
    devWarning(false, `[antd: "Icon"] ${"aaaaaaa"}`);
    console.error("aaaaa");
  };
  const showAlert = () => {
    setTimeout(() => {
      alert(count);
    }, 3000);
  };
  return (
    <div>
      <p>father</p>
      <Button onClick={handleClick}>click</Button>
      <Child ref={ref} />
      <Child ref={uRef} />
      <p>
        you click count:
        {count}
      </p>
      <Button onClick={() => setCount(count + 1)}>click count</Button>
      <Button onClick={showAlert}>alert</Button>
    </div>
  );
};

export default ForwardRefTest;
