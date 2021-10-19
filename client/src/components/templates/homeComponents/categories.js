import { NavLink, useLocation } from 'react-router-dom';
import './styling/categories.css';
function Categories({ categories }) {
  const location = useLocation();
  const routeTo = location.pathname === '/' ? '' : location.pathname;

  return (
    <div>
      <p className="section-heading mb-0">Categories</p>
      <div className="cards-holder">
        {categories?.items?.map((item, index) => (
          <NavLink
            to={{
              pathname: `${routeTo}/category/${item?.id}`,
            }}
            className="d-flex flex-column align-items-center me-3 p-2 text-decoration-none"
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
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default Categories;
