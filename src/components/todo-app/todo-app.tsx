import {Component, Prop, State, h} from '@stencil/core';
import { Touchscreen } from 'puppeteer';

@Component({
 tag: 'todo-app',
 styleUrl: 'todo-app.css'
})
export class TodoApp {
  @Prop() item: string;
  @State() value: string;

  list = [];

  input(event) {
    this.addItem(event);
  }

  addItem(event) {
    this.value = event.target.value;
    this.list.push(`${this.value}`);
  }

 render() {
   return (
    <div class="todo-app">
      <input value={this.value} type="text" onInput={this.input.bind(this)}/>
      <button>Add</button>
      <div class="items">
        {(this.list).map(item => (
          <ul class="items">
            <li>{item}<button>x</button></li>
          </ul>
        ))}
      </div>
    </div>
   );
  }
}
