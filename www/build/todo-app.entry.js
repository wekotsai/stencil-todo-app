import { r as registerInstance, h } from './index-c37bab2d.js';

const todoAppCss = ".todo-app{text-align:center}.list{list-style:none;width:30%;margin:0 auto;text-align:left;padding:0.5rem}.item{border-bottom:1px solid lightgray;padding:0.5rem}input{padding:0.5rem 1rem;width:30%;border:none;border-radius:10px;box-shadow:0 0.125rem 0.625rem 0 rgb(0 0 0 / 20%)}button{border:2px black solid;background-color:white;border-radius:50px;float:right}";

let TodoApp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.list = [];
  }
  inputHandler(event) {
    this.addItem(event);
  }
  addItem(event) {
    this.value = event.target.value;
    if (event.keyCode !== 8) {
      this.list.push(`${this.value}`);
    }
  }
  clickHandler(event) {
    this.removeItem(event);
  }
  removeItem(event) {
    var index = this.list.indexOf(this.value);
    this.value = event.target.value;
    this.list.splice(index, 1);
  }
  render() {
    return (h("div", { class: "todo-app" }, h("input", { value: this.value, type: "text", onInput: this.inputHandler.bind(this) }), h("div", null, (this.list).map(item => (h("ul", { class: "list" }, h("li", { class: "item" }, item, " ", h("button", { onClick: this.clickHandler.bind(this) }, "x"))))))));
  }
};
TodoApp.style = todoAppCss;

export { TodoApp as todo_app };
