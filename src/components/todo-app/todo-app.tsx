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
  @State() show: 'all' | 'active' | 'completed' = 'all';

  get itemsLeft() {
    return this.list.length - this.checked.length;
  }

  get displayedList() {
    const {list, checked} = this;
    switch (this.show) {
      case 'all': return list;
      case 'active': return list.filter(item => !checked.includes(item));
      case 'completed': return checked;
    }
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
    if (this.value.length !== 0 && !this.list.includes(this.value)) {
      this.list = this.list.concat([this.value]);
    }
    this.clearInput();
  }

  removeItem(value) {
    this.list = this.list.filter(item => item !== value);
    this.checked = this.checked.filter(item => item !== value);
  }

  // pass value and type
  checkboxHandler(value:string) {
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

  selectAll() {
    this.checked = this.checked;
  }

 render() {
   return (
    <div class="todo-app">
      <input
        class="field" value={this.value} type="text" placeholder="What needs to be done?"
        onInput={(event) => this.inputHandler(event)} onKeyUp={(event) => this.keyUpHandler(event)}/>
      <label htmlFor="selectAll" class="selectAll" onClick={()=>this.selectAll()}></label>
      <div>
        <ul class="list">
        {(this.displayedList).map(value => (
          <li class={this.isChecked(value) ? 'item item-checked' : 'item'}>
            <input class="checkbox" type="checkbox" checked={this.isChecked(value)} value={value} onChange={() => this.checkboxHandler(value)}/>
              {/* class name strike: is only appended when an item is checked, otherwise it's empty */}
              <span class={{strike:this.isChecked(value)}}>{value}</span>
            <button class="remove" onClick={()=>this.removeItem(value)}>x</button>
          </li>
        ))}
        </ul>
        <div class="filters">
          <span class="quantity">{this.itemsLeft} item{this.itemsLeft !== 1 ? 's' : ''} left</span>
          <button onClick={() => (this.show = 'all')}>All</button>
          <button onClick={() => (this.show = 'active')}>Actvie</button>
          <button onClick={() => (this.show = 'completed')}>Completed</button>
          <button class="clear">Clear completed</button>
        </div>
      </div>
    </div>
   );
  }
}
