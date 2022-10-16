import { useEffect, useState } from 'react';
import { api } from '../../../config/site.config';
import perfil from '../../../assets/images/perfil.png';
/**
 * My Profile Page
 * @returns {JSX.Element}
 * @constructor
 */
export default function MyProfilePage() {
  // states
  const [user, setUser] = useState({});
  // handle
  const handleLogin = () => {
    const credentials = {
      email: 'dianaerika.montano16@gmail.com',
      password: 'didibu123',
    };
    api
      .post('auth/login', credentials)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    handleLogin();
  }, []);
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="my-3">My Profile</h1>
          <div className="card">
            <img
              src={perfil}
              className="card-img-top card-custom mx-auto d-block"
              alt={user.name}
            />
            <hr />
            <div className="card-body">
              <h5 className="card-title">Hola {user.name}</h5>
              <p className="card-text">
                ID: {user.id}
                <br />
                Nombre: {user.name}
                <br />
                Apellidos: {user.lastname}
                <br />
                Email: {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
