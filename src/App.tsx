import "./index.css";
import { APITester } from "./APITester";

import logo from "./logo.svg";
import reactLogo from "./react.svg";
import { createContext, useContext, useEffect, useState } from "react";
import Router, { Route, Switch } from "crossroad";
import Markdown from "react-markdown";

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
        <div className="flex flex-row py-12">
          {/* <div className=" flex flex-row"> */}

          <nav class="flex flex-col">
            <LeftItem text="Home" />
            <LeftItem text="Essays" />

            {essays.map((essayTitle) => (
              <LeftItem text={essayTitle.title} href={essayTitle.url} />
            ))}
          </nav>
          <div className="max-w-5xl mx-auto px-8 relative z-10">
            <Route path="/" component={HomePage} />
            <Route
              path="/essays/:slug"
              component={EssayPage}
              children={essays}
            />
          </div>
        </div>
      </Router>
    </EssayContext>
  );
}
function EssayPage(props) {
  const essays = useContext(EssayContext);

  const essay = essays.find((essay) => {
    return essay.url.endsWith(props.slug);
  });

  //  <h1 className="text-4xl font-bold my-4 leading-tight">
  //     Hassan Shaikley
  //   </h1>

  return (
    <div className="flex flex-col gap-y-2">
      <Markdown>{essay && essay.body}</Markdown>
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
