export default function Form({ children = undefined }) {
  return <form method="post">{children}</form>;
}
