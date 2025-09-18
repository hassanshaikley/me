export default function (eleventyConfig) {
  // Order matters, put this at the top of your configuration file.
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("docs");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/index.css");
  eleventyConfig.addPassthroughCopy("src/index.js");

  // >https://www.11ty.dev/docs/copy/
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
}
