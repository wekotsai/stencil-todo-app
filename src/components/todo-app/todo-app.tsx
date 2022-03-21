import {Component, Prop, State, h} from '@stencil/core';

interface TodoTask {
  value: string;
  isCompleted: boolean;
}

@Component({
 tag: 'todo-app',
 styleUrl: 'todo-app.css'
})

export class TodoApp {
  @Prop() item: string;
  @State() value: string;
  @State() show: 'all' | 'active' | 'completed' = 'all';
  @State() selected: boolean = false;
  @State() tasks: TodoTask[] = [];

  get itemsLeft() {
    return this.tasks.length - this.completedTasks.length;
  }

  get completedTasks() {
    return this.tasks.filter(task => task.isCompleted);
  }

  get activeTasks() {
    return this.tasks.filter(task => !task.isCompleted);
  }

  get displayedList(): TodoTask[] {
    switch (this.show) {
      case 'all': return this.tasks;
      case 'active': return this.activeTasks;
      case 'completed': return this.completedTasks;
    }
  }

  get isAllChecked() {
    if (this.tasks.length !== 0) {
      return this.tasks.length === this.completedTasks.length;
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
      this.tasks = this.tasks.concat([{value: this.value, isCompleted: false}]);
    }
    this.clearInput();
  }

  removeItem(task: TodoTask) {
    this.tasks = this.tasks.filter((item) => item !== task);
  }

  checkboxHandler(task: TodoTask) {
    task.isCompleted = !task.isCompleted;
    this.tasks = [].concat(this.tasks);
  }

  clearInput() {
    this.value = '';
  }

  toggleAll() {
    const completeAllTasks = !this.isAllChecked;
    this.tasks = this.tasks.map(({value}) => ({value, isCompleted: completeAllTasks}));
  }

  clearCompleted() {
   this.tasks = this.activeTasks;
  }

 render() {
   return (
    <div class="todo-app">
      <input
        class="field" value={this.value} type="text" placeholder="What needs to be done?"
        onInput={(event) => this.inputHandler(event)} onKeyUp={(event) => this.keyUpHandler(event)}/>
      <label htmlFor="toggleAll" class={{toggleAll: true, 'toggleAll--faded': this.tasks.length > 0, 'toggleAll--active': this.isAllChecked}} onClick={()=>this.toggleAll()}></label>
      <div>
        <ul class="list">
        {(this.displayedList).map(task => (
          <li class={task.isCompleted ? 'item item--checked' : 'item'}>
            <input class="checkbox" type="checkbox" checked={task.isCompleted} value={task.value} onChange={() => this.checkboxHandler(task)}/>
              <span class={{strike:task.isCompleted}}>{task.value}</span>
            <button class="remove" onClick={()=>this.removeItem(task)}>x</button>
          </li>
        ))}
        </ul>
        <div class={this.tasks.length > 0 ? 'filters--show' : 'filters--hidden'}>
          <span class="quantity">{this.itemsLeft} item{this.itemsLeft !== 1 ? 's' : ''} left</span>
          <button onClick={() => (this.show = 'all')} class={{filterButton: true, 'filterButton--active': this.show === 'all'}}>All</button>
          <button onClick={() => (this.show = 'active')} class={{filterButton: true, 'filterButton--active': this.show === 'active'}}>Actvie</button>
          <button onClick={() => (this.show = 'completed')} class={{filterButton: true, 'filterButton--active': this.show === 'completed'}}>Completed</button>
          <button onClick={() => this.clearCompleted()} class={this.completedTasks.length > 0 ? 'clear--show' : 'clear--hidden'}>Clear completed</button>
        </div>
      </div>
    </div>
   );
  }
}
