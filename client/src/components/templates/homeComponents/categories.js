import { NavLink, useLocation } from 'react-router-dom';
import '../../styling/homeComponents/categories.css';
import { useRef } from 'react';
import ScrollSection from '../../utils/scroll-button';

function Categories({ categories }) {
  const location = useLocation();
  const routeTo = location.pathname === '/' ? '' : location.pathname;
  const holderRef = useRef();

  return (
    <div>
      <p className="section-heading mb-0">Categories</p>
      <ScrollSection>
        <div className="cards-holder" ref={holderRef}>
          {categories?.items?.map((item, index) => (
            <NavLink
              to={{
                pathname: `${routeTo}/category/${item?.id}`,
              }}
              className="d-flex flex-column align-items-center me-3 p-2 text-decoration-none hover-effect-cc"
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
              <span className="bp-name mt-2">{item?.name}</span>
            </NavLink>
          ))}
        </div>
      </ScrollSection>
    </div>
  );
}
export default Categories;
