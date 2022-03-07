import {Component, Prop, State, h} from '@stencil/core';

@Component({
 tag: 'todo-app',
 styleUrl: 'todo-app.css'
})

export class TodoApp {
  @Prop() item: string;
  @State() value: string;
  // always deifne types
  @State() list: string[] = [];
  @State() checked: string[] = [];

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
    this.checked = this.checked.filter(item => item !== value);
  }

  // pass value and type
  checkboxHandler(value:string) {
    // if this checkbox value is checked, remove the tick
    if (this.isChecked(value)) {
      this.checked = this.checked.filter(item => item !== value);
    } else {
      this.checked = this.checked.concat([value]);
    }
  }

  // this function is moved outside checkboxHandler so it can be used by another function too (line 69)
  isChecked(value:string) {
    return this.checked.includes(value);
  }

  clearInput() {
    this.value = '';
  }

 render() {
   return (
    <div class="todo-app">
      <input class="field" value={this.value} type="text" onInput={(event) => this.inputHandler(event)} onKeyUp={(event) => this.keyUpHandler(event)}/>
      <div>
        <ul class="list">
        {(this.list).map(value => (
          <li class="item">
            <input class="checkbox" type="checkbox" checked={this.isChecked(value)} value={value} onChange={() => this.checkboxHandler(value)}/>
              {/* class name strike: is only appended when an item is checked, otherwise it's empty */}
              <span class={{strike:this.isChecked(value)}}>{value}</span>
            <button onClick={()=>this.removeItem(value)}>x</button>
          </li>
        ))}
        </ul>
      </div>
    </div>
   );
  }
}
