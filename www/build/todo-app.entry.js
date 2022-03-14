import { r as registerInstance, h } from './index-c37bab2d.js';

const todoAppCss = "h1{font-size:100px;font-family:'Helvetica Neue', sans-serif;color:rgba(175, 47, 47, 0.15)}.todo-app{text-align:center;position:relative;max-width:450px;margin:0 auto;box-shadow:0 0.125rem 0.625rem 0 rgb(0 0 0 / 20%)}.list{list-style:none;width:100%;margin:0;text-align:left;padding:0}.item{padding:1rem;border-bottom:1px solid #e6e6e6}.item span,.field{color:#4d4d4d}.field{padding:0.5rem 0rem;width:-webkit-fill-available;padding-left:50px;font-size:18px;height:35px;border:none;border-bottom:1px solid #e6e6e6}label:before{content:'❯';font-size:22px;color:#e6e6e6;position:absolute;top:5px;left:-7px;padding:10px 27px 10px 27px;transform:rotate(90deg)}.checkbox{margin-right:1rem}.remove{background-color:white;border-radius:50px;border:none;float:right}.remove span{color:#cc9a9a;font-size:18px}.strike{text-decoration:line-through}.quantity{color:#a09fa6;font-size:13.333px;margin-right:20px}.filters{padding:0.5rem;background-color:white}.filters button{color:#a09fa6;border-style:none;border-color:transparent;background-color:transparent}.filters button:active,.filters button:focus{border:1px solid rgba(175, 47, 47, 0.2);border-radius:3px;margin:3px;padding:3px 7px}";

let TodoApp = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // always deifne types
    this.list = [];
    this.checked = [];
    this.quantity = 0;
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
      this.quantity++;
      this.clearInput();
    }
  }
  removeItem(value) {
    this.list = this.list.filter(item => item !== value);
    this.checked = this.checked.filter(item => item !== value);
    this.quantity--;
  }
  // pass value and type
  checkboxHandler(value) {
    if (this.isChecked(value)) {
      this.checked = this.checked.filter(item => item !== value);
    }
    else {
      this.checked = this.checked.concat([value]);
    }
  }
  // this function is moved outside checkboxHandler so it can be used by another function too (line 69)
  isChecked(value) {
    return this.checked.includes(value);
  }
  clearInput() {
    this.value = '';
  }
  completedItem(value) {
    this.list = this.checked.filter(item => item !== value);
  }
  // figure out how to show all / active items
  allItem(value) {
    this.list = this.list.filter(item => item !== value);
  }
  render() {
    return (h("div", { class: "todo-app" }, h("input", { class: "field", value: this.value, type: "text", onInput: (event) => this.inputHandler(event), onKeyUp: (event) => this.keyUpHandler(event) }), h("label", { htmlFor: "selectAll" }), h("div", null, h("ul", { class: "list" }, (this.list).map(value => (h("li", { class: "item" }, h("input", { class: "checkbox", type: "checkbox", checked: this.isChecked(value), value: value, onChange: () => this.checkboxHandler(value) }), h("span", { class: { strike: this.isChecked(value) } }, value), h("button", { class: "remove", onClick: () => this.removeItem(value) }, h("span", { class: "cross" }, "x")))))), h("div", { class: "filters" }, h("span", { class: "quantity" }, this.quantity, " items left"), h("button", { onClick: (value) => this.allItem(value) }, "All"), h("button", null, "Actvie"), h("button", { onClick: (value) => this.completedItem(value) }, "Completed")))));
  }
};
TodoApp.style = todoAppCss;

export { TodoApp as todo_app };
