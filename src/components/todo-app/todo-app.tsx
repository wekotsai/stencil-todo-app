import {Component, Prop, State, h} from '@stencil/core';

@Component({
 tag: 'todo-app',
 styleUrl: 'todo-app.css'
})

export class TodoApp {
  @Prop() item: string;
  @State() value: string;
  @State() list: string[] = [];
  @State() checked: number[] = [];
  @State() show: 'all' | 'active' | 'completed' = 'all';
  @State() selected: boolean = false;

  get itemsLeft() {
    return this.list.length - this.checked.length;
  }

  get displayedList() {
    const {list, checked} = this;
    switch (this.show) {
      case 'all': return list;
      case 'active': return list.filter((_item, index) => !checked.includes(index));
      case 'completed': return list.filter((_item, index) => checked.includes(index));
    }
  }

  get isAllChecked() {
    if (this.list.length !== 0) {
      return this.list.length === this.checked.length;
    }
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

  removeItem(index) {
    const checkedMap = this.checked.map((oldIndex) => oldIndex === index ? null : this.list[oldIndex]);
    this.list = this.list.slice(0, index).concat(this.list.slice(index + 1));
    this.checked = checkedMap.filter(item => item !== null).map((item) => this.list.indexOf(item));
  }

  checkboxHandler(index:number) {
    if (this.isChecked(index)) {
      this.checked = this.checked.filter((item) => item !== index);
    } else {
      this.checked = this.checked.concat([index]);
    }
  }

  isChecked(index:number) {
    return this.checked.includes(index);
  }

  clearInput() {
    this.value = '';
  }

  toggleAll() {
    if (this.isAllChecked) {
      this.checked = [];
    } else {
      this.checked = this.list.map((_item, index) => index) ;
    }
  }

  clearCompleted() {
    this.list = this.list.filter((_value, index) => !this.checked.includes(index));
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
        {(this.displayedList).map((value, index) => (
          <li class={this.isChecked(index) ? 'item item--checked' : 'item'}>
            <input class="checkbox" type="checkbox" checked={this.isChecked(index)} value={value} onChange={() => this.checkboxHandler(index)}/>
              <span class={{strike:this.isChecked(index)}}>{value}</span>
            <button class="remove" onClick={()=>this.removeItem(index)}>x</button>
          </li>
        ))}
        </ul>
        <div class="filters">
          <span class="quantity">{this.itemsLeft} item{this.itemsLeft !== 1 ? 's' : ''} left</span>
          <button onClick={() => (this.show = 'all')} class={{filterButton: true, 'filterButton--active': this.show === 'all'}}>All</button>
          <button onClick={() => (this.show = 'active')} class={{filterButton: true, 'filterButton--active': this.show === 'active'}}>Actvie</button>
          <button onClick={() => (this.show = 'completed')} class={{filterButton: true, 'filterButton--active': this.show === 'completed'}}>Completed</button>
          <button onClick={() => this.clearCompleted()} class={this.checked.length > 0 ? 'clear--show' : 'clear--hidden'}>Clear completed</button>
        </div>
      </div>
    </div>
   );
  }
}
