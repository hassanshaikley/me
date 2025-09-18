import "./index.css";
import { APITester } from "./APITester";

import logo from "./logo.svg";
import reactLogo from "./react.svg";

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10 flex flex-row">
      <div className="w-48">
        <ul>
          <LeftItem text="Essays" />
        </ul>
      </div>

      <div>
        <h1 className="text-4xl font-bold my-4 leading-tight">
          Hassan Shaikley
        </h1>
        <div></div>
        <APITester />
      </div>
    </div>
  );
}

const LeftItem = (props) => {
  return <li>{props.text}</li>;
};

export default App;
