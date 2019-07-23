#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const program = require("commander");
const config = require("./package.json");
const Handlebars = require("handlebars");
const dateFormat = require("dateformat");
const { camal2line } = require("./utils");

program.version(config.version, "-v, --version")
.option("-s, --style [value]", "less文件")
.parse(process.argv);

let type = program.args.length > 0 ? program.args[0] : "comp";

let source = fs.readFileSync(__dirname + "/template/index.jsx", "utf-8");
let jsxTemplate = Handlebars.compile(source);

let componentName = path.basename(process.cwd()) // 获取执行当前命令的文件夹名称字符串
componentName = componentName.replace(/^\w/, function(all) {
  return all.toUpperCase();
});

let styleFileName = program.style 
  ? typeof program.style === "boolean"
      ? "index"
      : `${program.style}`
  : "";

let componentClassName = `"${type}${camal2line(componentName)}-wrapper"`;

let result = jsxTemplate({
  componentName,
  componentClassName,
  author: os.userInfo().username,
  date: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
  hasStyle: !!program.style,
  styleFileName: `${styleFileName}.less`,
  isComponent: type === "comp",
});

fs.writeFileSync("index.jsx", result);

if (!!program.style) {
  let styleContent = 
`.${type}${camal2line(componentName)}-wrapper {

}`;
  fs.writeFileSync(`${styleFileName}.less`, styleContent);
}

if (type === "comp") {
  let source = fs.readFileSync(__dirname + "/template/README.md", "utf-8");
  let readmeTemplate = Handlebars.compile(source);
  let result = readmeTemplate({
    componentName,
  });
  fs.writeFileSync("README.md", result);
}