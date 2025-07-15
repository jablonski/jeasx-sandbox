export default function ({ status }) {
  return (
    <ul class="filters">
      <li>
        <a href="" class={{ selected: !status }}>
          all
        </a>
      </li>
      {["active", "completed"].map((value) => (
        <li>
          <a href={`?status=${value}`} class={{ selected: status === value }}>
            {value}
          </a>
        </li>
      ))}
    </ul>
  );
}
