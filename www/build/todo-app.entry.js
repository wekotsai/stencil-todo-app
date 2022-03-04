import { r as registerInstance, h } from './index-c37bab2d.js';

const todoAppCss = ".todo-app{text-align:center;max-width:450px;margin:0 auto}.list{list-style:none;width:100%;margin:0 auto;text-align:left;padding:0.5rem}.item{border-bottom:1px solid lightgray;padding:0.5rem}.field{padding:0.5rem 1rem;width:100%;border:none;border-radius:10px;box-shadow:0 0.125rem 0.625rem 0 rgb(0 0 0 / 20%)}.checkbox{margin-right:1rem}button{border:2px black solid;background-color:white;border-radius:50px;float:right}";

let TodoApp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.list = [];
  }
  inputHandler(event) {
    this.value = event.target.value;
  }
  keyUpHandler(event) {
    console.log(event.key);
    if (event.key === 'Enter') {
      this.addItem();
    }
    if (event.key === 'Escape') {
      this.clearInput();
    }
  }
  addItem() {
    if (this.value.length !== 0) {
      this.list = this.list.concat([this.value]);
      this.clearInput();
    }
  }
  removeItem(value) {
    this.list = this.list.filter(item => item !== value);
  }
  checkboxHandler(event) {
    this.checkboxValue = event.target.value;
    if (this.checkboxValue === 'on') {
      console.log('checked');
    }
  }
  clearInput() {
    this.value = '';
  }
  render() {
    return (h("div", { class: "todo-app" }, h("input", { class: "field", value: this.value, type: "text", onInput: (event) => this.inputHandler(event), onKeyUp: (event) => this.keyUpHandler(event) }), h("div", null, h("ul", { class: "list" }, (this.list).map(value => (h("li", { class: "item" }, h("input", { class: "checkbox", type: "checkbox", value: this.checkboxValue, onChange: this.checkboxHandler.bind(this) }), value, " ", h("button", { onClick: () => this.removeItem(value) }, "x"))))))));
  }
};
TodoApp.style = todoAppCss;

export { TodoApp as todo_app };
