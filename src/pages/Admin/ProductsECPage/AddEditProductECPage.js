import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../../config/site.config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import es from 'yup-es';

yup.setLocale(es);
const schema = yup
  .object({
    product_name: yup.string().required(),
    product_description: yup.string().required(),
    product_price: yup.number().positive().required(),
    product_image: yup.string(),
    categories: yup.array(),
  })
  .required();

export default function AddEditProductECPage() {
  // router
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
  const [product, setProduct] = useState({
    product_name: '',
    product_description: '',
    product_price: 0,
    product_image: '',
    categories: [],
  });
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  // init
  let { productId } = useParams();
  useEffect(() => {
    if (productId) {
      api
        .get('products/' + productId)
        .then((response) => {
          setProduct(response.data.product);
          reset({
            product_name: response.data.product.product_name,
            product_description: response.data.product.product_description,
            product_price: response.data.product.product_price,
            product_image: response.data.product.product_image,
            categories: response.data.product.categories,
          });
          setCategoriesOptions(response.data.categories);
        })
        .catch((error) => console.log(error));
    } else {
      api
        .get('products/add')
        .then((response) => {
          setCategoriesOptions(response.data.categories);
        })
        .catch((error) => console.log(error));
    }
  }, [productId, reset]);
  // handlers
  const handleSubmitForm = (data) => {
    if (productId) {
      updateProduct(data, 'Editado exitosamente');
    } else {
      saveProduct(data, 'Producto creado exitosamente');
    }
  };

  const saveProduct = (apiParams, successMessage) => {
    const formData = new FormData();
    for (let key in apiParams) {
      formData.append(key, apiParams[key]);
    }
    //image
    if (apiParams.image[0]) {
      formData.append('image', apiParams.image[0]);
    }
    //categories
    formData.append('categories', JSON.stringify(apiParams.categories));
    api
      .post('products', formData)
      .then((response) => {
        if (response.data.success) {
          setSuccessMessage(successMessage);
          setTimeout(() => {
            navigate(`/products-ec`);
          }, '2000');
        }
      })
      .catch((error) => console.log(error));
  };

  const updateProduct = (apiParams, successMessage) => {
    apiParams.id = productId;
    apiParams._method = 'PUT';
    const formData = new FormData();
    for (let key in apiParams) {
      formData.append(key, apiParams[key]);
    }
    //image
    if (apiParams.image[0]) {
      formData.append('image', apiParams.image[0]);
    }
    //categories
    formData.append('categories', JSON.stringify(apiParams.categories));
    api
      .post('products/' + productId, formData)
      .then((response) => {
        if (response.data.success) {
          setSuccessMessage(successMessage);
        }
      })
      .catch((error) => console.log(error));
  };

  // render
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-10">
              <h2>{productId ? 'Editar' : 'Adicionar'} producto</h2>
            </div>
            <div className="col text-end">
              <Link to="/products-ec" className="btn btn-success">
                Volver &nbsp;
                <i className="bi bi-arrow-right-circle-fill" />
              </Link>
            </div>
          </div>
          {successMessage ? (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {successMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : (
            <></>
          )}
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                defaultValue={product.product_name}
                {...register('product_name')}
              />
              <div className="es-invalid-field badge text-bg-danger">{errors.product_name?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                defaultValue={product.product_description}
                {...register('product_description')}
              />
              <div className="es-invalid-field badge text-bg-danger">{errors.product_description?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="text"
                className="form-control"
                defaultValue={product.product_price}
                {...register('product_price')}
              />
              <div className="es-invalid-field badge text-bg-danger">{errors.product_price?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Categoría:</label>
              <fieldset>
                {categoriesOptions.map((option, index) => {
                  return (
                    <div className="form-check" key={index}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={option.value}
                        name="categories"
                        defaultChecked={product.categories.find(
                          (category) => category.value === option.value,
                        )}
                        {...register('categories')}
                      />
                      <label className="form-check-label">{option.label}</label>
                    </div>
                  );
                })}
              </fieldset>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-6">
                  <label className="form-label">Imagen</label>
                  <input className="form-control" type="file" {...register('image')} />
                </div>
                {productId ? (
                  <div className="col-2">
                    <label className="form-label">Imagen actual</label>
                    <img
                      className="img-fluid"
                      src={product.product_image}
                      alt={product.product_name}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mb-3">
              <button className="btn btn-success">{productId ? 'Editar' : 'Adicionar'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
