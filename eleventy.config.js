import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import markdownIt from "markdown-it";

export default function (eleventyConfig) {
  //   eleventyConfig.setInputDirectory("src");
  //   eleventyConfig.setOutputDirectory("docs");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  //   eleventyConfig.addPassthroughCopy("src/index.css");
  eleventyConfig.addPassthroughCopy("src/index.js");

  // >https://www.11ty.dev/docs/copy/
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  //   let markdownItOptions = {
  //     html: true,
  //     breaks: true,
  //     linkify: true,
  //   };

  //   eleventyConfig.setLibrary("md", markdownIt(markdownItOptions));

  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./src/index.css");
    const tailwindOutputPath = "./docs/index.css";
    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");
    const outputDir = path.dirname(tailwindOutputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await postcss([tailwindcss()]).process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  return {
    dir: { input: "src", output: "docs" },
  };
}
