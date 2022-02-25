import {Component, Prop, State, h} from '@stencil/core';

@Component({
 tag: 'todo-app',
 styleUrl: 'todo-app.css'
})

export class TodoApp {
  @Prop() item: string;
  @State() value: string;


  list = [];

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
   return (
    <div class="todo-app">
      <input value={this.value} type="text" onInput={this.inputHandler.bind(this)}/>
      {/* <button type="submit">Add</button> */}
      <div>
        {(this.list).map(item => (
          <ul class="list">
            <li class="item">{item} <button onClick={this.clickHandler.bind(this)}>x</button></li>
          </ul>
        ))}
      </div>
    </div>
   );
  }
}
