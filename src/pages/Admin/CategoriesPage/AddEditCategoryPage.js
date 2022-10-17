import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import es from 'yup-es';
import { useEffect, useState } from 'react';
import { api } from '../../../config/site.config';

yup.setLocale(es);
const schema = yup
  .object({
    category_name: yup.string().required(),
    category_description: yup.string().required(),
  })
  .required();

export default function AddEditCategoryPage() {
  let { categoryId } = useParams();
  const navigate = useNavigate();
  // forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // states
  const [updated, setUpdated] = useState(false);
  // handlers
  const handleCategorySubmit = (data) => {
    if (categoryId) {
      // editar
      console.log(data);
      api
        .put('categories/'+ categoryId, data)
        .then((response) => {
          if (response.data.success) {
            setUpdated(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      // crear
      api
        .post('categories', data)
        .then((response) => {
          if (response.data.success) {
            navigate('/categories');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // init
  useEffect(() => {
    if (categoryId) {
      //editar
      api
        .get('categories/' + categoryId)
        .then((response) => {
          reset({
            category_name: response.data.category.category_name,
            category_description: response.data.category.category_description,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [categoryId, reset]);
  // render
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <h2>{categoryId ? 'Editar Categoria' : 'Agregar Categoria'}</h2>
          {updated ? (
            <div className="alert alert-success">Restaurante editado correctamente</div>
          ) : (
            ''
          )}
        </div>
        <div className="col-2 align-self-center d-flex justify-content-around">
          <Link className="btn btn-success" to="/categories">
            volver &nbsp;
            <i className="bi bi-arrow-right-circle-fill" />
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(handleCategorySubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                defaultValue=""
                {...register('category_name')}
              />
              <div className="es-invalid-field badge text-bg-danger">
                {errors.category_name?.message}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="3"
                defaultValue=""
                {...register('category_description')}
              />
              <div className="es-invalid-field badge text-bg-danger">
                {errors.category_description?.message}
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-success">{categoryId ? 'Editar' : 'Agregar'}</button>
              &nbsp;
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
