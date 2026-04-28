export default function Loading({ wrapperClass, loadingClass }) {
  return (
    <div className={wrapperClass}>
      <h2 className={loadingClass}>Loading...</h2>
    </div>
  );
}
