import {Component, Prop, State, h} from '@stencil/core';

@Component({
 tag: 'todo-app',
 styleUrl: 'todo-app.css'
})

export class TodoApp {
  @Prop() item: string;
  @State() value: string;
  @State() list = [];

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
    this.list = this.list.concat([this.value]);
    this.clearInput();
  }

  removeItem(value) {
    this.list = this.list.filter(item => item !== value);
  }

  clearInput() {
    this.value = '';
  }

 render() {
   return (
    <div class="todo-app">
      <input value={this.value} type="text" onInput={(event) => this.inputHandler(event)} onKeyUp={(event) => this.keyUpHandler(event)}/>
      <div>
        <ul class="list">
        {(this.list).map(value => (
          <li class="item">{value} <button onClick={()=>this.removeItem(value)}>x</button></li>
        ))}
        </ul>
      </div>
    </div>
   );
  }
}