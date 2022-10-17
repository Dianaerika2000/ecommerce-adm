import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../../config/site.config';

export default function EditCategoryPage() {
  const [category, setCategory] = useState({});
  // init
  let { categoryId } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    if (categoryId) {
      api
        .get('categories/' + categoryId)
        .then((response) => {
          setCategory(response.data.category);
        })
        .catch((error) => console.log(error));
    }
  }, [categoryId]);

  // handlers
  const handleSubmitForm = () => {
    api.put('categories/' + categoryId, category).then((response) => {
      if (response.data.success) {
        navigate('/categories');
      }
    });
  };
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <h2>{categoryId ? 'Editar' : 'Adicionar'} categoria</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={category.category_name}
                onChange={(e) => {
                  setCategory({ ...category, category_name: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={category.category_description}
                onChange={(e) => {
                  setCategory({ ...category, category_description: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-success" onClick={handleSubmitForm}>
                {categoryId ? 'Editar' : 'Adicionar'}
              </button>&nbsp;
              <Link className="btn btn-success" to="/categories">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
