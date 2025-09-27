import { time } from "./signals";

export default function Clock({ locale }) {
  return (
    <div class="center">
      <time>{time.value.toLocaleTimeString(locale)}</time>
    </div>
  );
}
