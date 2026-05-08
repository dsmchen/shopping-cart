import classes from './product-card.module.css';

export default function ProductCard({
  cardClass,
  imageSrc,
  imageAlt = '',
  heading,
  children,
}) {
  return (
    <div className={`${classes.productCard} ${cardClass}`}>
      <div className="imageTitleContainer">
        <div className={classes.imageWrapper}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <h2>{heading}</h2>
      </div>
      {children}
    </div>
  );
}
