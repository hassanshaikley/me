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
        <div className="flex flex-row py-12 max-w-5xl mx-auto">
          {/* <div className=" flex flex-row"> */}

          <nav class="flex flex-col w-64">
            <h1 className="text-2xl font-bold my-4 leading-tight">
              Hassan Shaikley
            </h1>
            <LeftItem text="Home" href="/" />
            <LeftItem text="Essays" small={true} />

            {essays.map((essayTitle) => (
              <LeftItem text={essayTitle.title} href={essayTitle.url} />
            ))}
          </nav>
          <div className="mx-auto px-8  z-10 w-full my-16">
            <Route path="/" component={HomePage} />
            <Route path="/essays/:slug" component={EssayPage} />
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

  return (
    <div className="flex flex-col gap-y-2">
      <Markdown>{essay && essay.body}</Markdown>
    </div>
  );
}
function HomePage(props) {
  return <div className="flex flex-col">Something</div>;
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
