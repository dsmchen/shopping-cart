export default function Form({ handleSubmit, children }) {
  return (
    <form onSubmit={handleSubmit} noValidate>
      {children}
    </form>
  );
}
