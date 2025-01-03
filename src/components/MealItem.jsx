export default function MealItem({ meal, onAddMeal }) {
  const { image, name, price, description } = meal;
  return (
    <div className="meal-item">
      <article>
        <img src={`http://localhost:3001/${image}`} alt={name} />
        <h3>{name}</h3>
        <p className="meal-item-price">${price}</p>
        <p className="meal-item-description">{description}</p>
        <p className="meal-item-actions">
          <button onClick={() => onAddMeal(meal)} className="button">
            Add to cart
          </button>
        </p>
      </article>
    </div>
  );
}
