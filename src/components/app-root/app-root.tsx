import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div class="app-root">
        <h1>Todo List</h1>
        <main>
         <todo-app></todo-app>
       </main>
      </div>
    );
  }
}
