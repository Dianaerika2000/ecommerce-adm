import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authAction from '../../redux/auth/actions';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import bgLogin from '../../assets/images/bg-login.png';
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

/**
 * Login Page
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoginPage() {
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = authAction;
  let navigate = useNavigate();
  // redux
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch();
  // effects
  useEffect(() => {
    if (isLoggedIn) {
      return navigate('/');
    }
  }, [isLoggedIn, navigate]);
  // handlers
  const handleLogin = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    if (user) {
      dispatch(login(user));
    } else {
      dispatch(login());
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center centrar">
        <div className="col-5 my-3">
          <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="badge text-bg-danger">This field is required</span>
                )}
                <div className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register('password', { required: true })}
                />
                {errors.password && (
                  <span className="badge text-bg-danger">This field is required</span>
                )}
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className='col-4'>
          <img src={bgLogin} className="img-fluid" alt='slide del loggin'/>
        </div>
      </div>
    </div>
  );
}
