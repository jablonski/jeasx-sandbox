import Layout from "../../Layout";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";

export default function ({ todos, status, autofocus }) {
  return (
    <Layout title="Todo app with Jeasx" description="A simple todo app in Jeasx." css="./index.css">
      <section>
        <header>
          <h1>todos</h1>
          <form method="post">
            <input name="newTodo" placeholder="What needs to be done?" autofocus={autofocus} />
          </form>
        </header>
        <section>
          <TodoList todos={todos} status={status} />
        </section>
        <footer class="footer">
          <TodoFilters status={status} />
        </footer>
      </section>
    </Layout>
  );
}
