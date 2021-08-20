import './styling/categories.css';
function Categories({ categories }) {
  return (
    <div>
      <p className="section-heading mb-0">Categories</p>
      <div className="cards-holder">
        {categories?.items?.map((item, index) => (
          <div
            className="d-flex flex-column align-items-center me-3 p-2"
            key={item.id}
          >
            <div className="category-cards" id={item.id + index}>
              <img
                src={item?.icons[0]?.url}
                alt={item?.name}
                crossOrigin="anonymous"
                id={item.id}
                //onLoad={() => getColor({ id: item.id, index: index })}
              />
            </div>
            <span className="fw-name mt-2">{item?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Categories;
