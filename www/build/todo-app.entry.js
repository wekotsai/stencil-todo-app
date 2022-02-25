import { r as registerInstance, h } from './index-c37bab2d.js';

const todoAppCss = ".todo-app{text-align:center}.items{list-style:none}";

let TodoApp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.list = [];
  }
  input(event) {
    this.addItem(event);
  }
  addItem(event) {
    this.value = event.target.value;
    this.list.push(`${this.value}`);
  }
  render() {
    return (h("div", { class: "todo-app" }, h("input", { value: this.value, type: "text", onInput: this.input.bind(this) }), h("button", null, "Add"), h("div", { class: "items" }, (this.list).map(item => (h("ul", { class: "items" }, h("li", null, item, h("button", null, "x"))))))));
  }
};
TodoApp.style = todoAppCss;

export { TodoApp as todo_app };
