import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import es from 'yup-es';

yup.setLocale(es);
const schema = yup
  .object({
    name: yup.string().required(),
    type: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
    rating: yup.number().positive().required(),
    image: yup.string().required(),
  })
  .required();

export default function AddEditPodcastPage() {
  //forms
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  //states
  const [updated, setUpdated] = useState(false);
  //init
  const { restaurantID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (restaurantID) {
      //editar
      api
        .get('https://example-data.draftbit.com/restaurants/' + restaurantID)
        .then((response) => {
          reset({
            name: response.data.name,
            type: response.data.type,
            address: response.data.address,
            phone: response.data.phone,
            rating: response.data.rating,
            image: response.data.image,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [reset, restaurantID]);
  //handler
  const handleRestaurantSubmit = (data) => {
    if (restaurantID) {
      //editar
      api
        .put('https://example-data.draftbit.com/restaurants/' + restaurantID, data)
        .then((response) => {
          if (response.status === 200) {
            setUpdated(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      //adicionar
      api
        .post('https://example-data.draftbit.com/restaurants/', data)
        .then((response) => {
          if (response.status === 201) {
            navigate('/podcasts/edit/' + response.data.id);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  //render
  return (
    <div className="container">
      <div className="row">
        <div className="col my-3">
          <h2>{restaurantID ? 'Editar' : 'Adicionar'} Restaurant</h2>
          {updated ? (
            <div className="alert alert-success">Restaurante editado correctamente</div>
          ) : (
            ''
          )}
          <form onSubmit={handleSubmit(handleRestaurantSubmit)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" defaultValue="" {...register('name')} />
              <div className="es-invalid-field">{errors.name?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <input type="text" className="form-control" defaultValue="" {...register('type')} />
              <div className="es-invalid-field">{errors.type?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                defaultValue=""
                {...register('address')}
              />
              <div className="es-invalid-field">{errors.address?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" defaultValue="" {...register('phone')} />
              <div className="es-invalid-field">{errors.phone?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <input
                type="number"
                className="form-control"
                defaultValue=""
                {...register('rating')}
              />
              <div className="es-invalid-field">{errors.rating?.message}</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="text" className="form-control" defaultValue="" {...register('image')} />
              <div className="es-invalid-field">{errors.image?.message}</div>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary">Guardar</button>
              &nbsp;&nbsp;
              <Link to="/podcasts/">&laquo;Volver a listado</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
