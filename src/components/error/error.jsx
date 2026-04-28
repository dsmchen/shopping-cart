export default function Error({ wrapperClass, errorClass, error }) {
  return (
    <div className={wrapperClass}>
      <div className={errorClass}>
        <h2>Oops!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
