import { r as registerInstance, h } from './index-c37bab2d.js';

const appRootCss = ".app-root h1{text-align:center}";

let AppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: "app-root" }, h("h1", null, "Todo List"), h("main", null, h("todo-app", null))));
  }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
