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

  get isAllChecked() {
    return this.list.length === this.checked.length;
  }

  inputHandler(event) {
    this.value = event.target.value;
  }

  keyUpHandler(event) {
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

  isChecked(value:string) {
    return this.checked.includes(value);
  }

  clearInput() {
    this.value = '';
  }

  toggleAll() {
    if (this.isAllChecked) {
      this.checked = [];
    } else {
      this.checked = this.list;
    }
  }

  clearCompleted() {
    this.list = this.list.filter(value => !this.checked.includes(value));
    this.checked = [];
  }

 render() {
   return (
    <div class="todo-app">
      <input
        class="field" value={this.value} type="text" placeholder="What needs to be done?"
        onInput={(event) => this.inputHandler(event)} onKeyUp={(event) => this.keyUpHandler(event)}/>
      <label htmlFor="toggleAll" class={{toggleAll: true, 'toggleAll--active': this.isAllChecked}} onClick={()=>this.toggleAll()}></label>
      <div>
        <ul class="list">
        {(this.displayedList).map(value => (
          <li class={this.isChecked(value) ? 'item item-checked' : 'item'}>
            <input class="checkbox" type="checkbox" checked={this.isChecked(value)} value={value} onChange={() => this.checkboxHandler(value)}/>
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
          <button onClick={() => this.clearCompleted()} class={this.checked.length > 0 ? 'clear-show' : 'clear'}>Clear completed</button>
        </div>
      </div>
    </div>
   );
  }
}
