import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../config/site.config';
import ModalButton from '../../../components/Modal/ModalButton';
import Modal from '../../../components/Modal/Modal';

let categoryModal = null;
export default function CategoriesPage() {
  // states
  const [categories, setCategories] = useState([]);
  const [categoryDelete, setCategoryDelete] = useState(0);
  // init
  const loadCategory = () => {
    api
      .get('categories')
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    // loading category
    loadCategory();
    // loading modal
    if (!categoryModal) {
      categoryModal = new window.bootstrap.Modal('#productEcModal');
    }
    return () => {
      categoryModal = null;
    };
  }, []);
  // handlers
  const eliminarCategoryModal = () => {
    api.delete('categories/' + categoryDelete).then((response) => {
      console.log(response);
      categoryModal.hide();
      loadCategory();
    });
  };

  // modal footer
  const modalFooter = (
    <>
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
        Cerrar
      </button>
      <button type="button" className="btn btn-success" onClick={eliminarCategoryModal}>
        Eliminar Categoria
      </button>
    </>
  );
  // render
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <h2>Listado de Categorias</h2>
        </div>
        <div className="col-2 align-self-center d-flex justify-content-around">
          <Link className="btn btn-success" to="/category/add">
            Agregar &nbsp;
            <i className="bi bi-plus-circle-fill" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr key={index}>
                    <td>{category.category_name}</td>
                    <td>{category.category_description}</td>
                    <td>
                      <Link to={'/category/editar/' + category.id} className="btn btn-success">
                        Editar
                      </Link>
                      {/* <Link to={'/category/edit/' + category.id} className="btn btn-success">
                        Editar
                      </Link> */}
                    </td>
                    <td>
                      <ModalButton
                        targetId="productEcModal"
                        className="btn btn-outline-secondary"
                        onClick={() => setCategoryDelete(category.id)}
                      >
                        Eliminar
                      </ModalButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal targetId="productEcModal" modalFooter={modalFooter} modalTitle="Eliminar categoria">
            <p>¿Estás seguro de eliminar esta categoria?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}
