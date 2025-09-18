import "./index.css";
import { APITester } from "./APITester";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { createContext, useContext, useEffect, useState } from "react";
import Router, { Route, Switch } from "crossroad";

const EssayContext = createContext(null);

export function App() {
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    const essays = fetch("/essays.json")
      .then(async (response) => {
        return response.json();
      })
      .then((essays) => {
        const essayList = Object.keys(essays).map((slug) => ({
          title: kebabToTitleCase(slug),
          url: `/essays/${slug}`,
          body: essays[slug],
        }));

        setEssays(essayList);
      });
  }, [essays.length]);

  return (
    <EssayContext value={essays}>
      <Router>
        <nav class="flex flex-col">
          <LeftItem text="Home" />
          <LeftItem text="Essays" />

          {essays.map((essayTitle) => (
            <LeftItem text={essayTitle.title} href={essayTitle.url} />
          ))}
        </nav>

        <Route path="/" component={HomePage} />
        <Route path="/essays/:slug" component={EssayPage} children={essays} />
      </Router>
    </EssayContext>
  );
}
function EssayPage(props) {
  const essays = useContext(EssayContext);

  const essay = essays.find((essay) => {
    return essay.url.endsWith(props.slug);
  });

  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10 flex flex-row">
      <div className="w-48"></div>

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
function HomePage(props) {
  return (
    <div className="max-w-7xl mx-auto p-8 relative z-10 flex flex-row">
      <div className="w-48"></div>

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

function kebabToTitleCase(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
    .replace(".md", "");
}

const LeftItem = (props) => {
  return <a href={props.href}>{props.text}</a>;
};

export default App;
