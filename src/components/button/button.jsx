import classes from './button.module.css';

export default function Button({
  buttonClass = '',
  type = 'button',
  handleClick = '',
  disabled = false,
  ariaLabel = '',
  children,
}) {
  return (
    <button
      className={`${classes.button} ${buttonClass}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
