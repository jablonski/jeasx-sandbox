export default function ({ todos, status }) {
  return (
    <form method="post">
      <ul class="todo-list">
        {todos
          .filter((todo) => !status || status === todo.status)
          .map((todo) => (
            <li class={todo.status}>
              <div class="view">
                <button
                  class={{
                    toggle: true,
                    checked: todo.status === "completed",
                  }}
                  name="toogleTodo"
                  value={todos.indexOf(todo)}
                >
                  [{todo.status}]
                </button>
                <label>{this.escape(todo.label)}</label>
                <button
                  class="destroy"
                  name="removeTodo"
                  value={todos.indexOf(todo)}
                >
                  <img
                    src="/icons/trash.svg"
                    alt="Delete"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </form>
  );
}
