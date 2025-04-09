import Layout from "../../Layout";
import TodoFilters from "./TodoFilters";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoApp({ todos, status, autofocus }) {
  return (
    <Layout
      title="Todos"
      description="A simple todo app"
      css="/todos/index.css"
    >
      <section class="todoapp">
        <header class="header">
          <h1>my todos</h1>
          <TodoInput autofocus={autofocus} />
        </header>
        <section class="main">
          <TodoList todos={todos} status={status} />
        </section>
        <footer class="footer">
          <TodoFilters status={status} />
        </footer>
      </section>
    </Layout>
  );
}
