import './assets/scss/stylesheet.scss';
import Boot from './redux/boot';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utility/PrivateRoute';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import MyProfilePage from './pages/Admin/MyProfilePage/MyProfilePage';
import ListExamplePage from './pages/Admin/ListExamplePage/ListExamplePage';
import ProductsECPage from './pages/Admin/ProductsECPage/ProductsECPage';
import AddEditProductECPage from './pages/Admin/ProductsECPage/AddEditProductECPage';

// eslint-disable-next-line no-unused-vars
import axiosInterceptor from './utility/axios-token-interceptor';
import CategoriesPage from './pages/Admin/CategoriesPage/CategoriesPage';
import AddEditCategoryPage from './pages/Admin/CategoriesPage/AddEditCategoryPage';

/**
 * Main App component
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
  // options
  let navBarOptions = {
    main: [{ option: 'Home', to: '/' }],
    right: [
      { option: 'My Profile', to: '/my-profile', displayIfLoggedIn: true },
      { option: 'Products', to: '/products-ec', displayIfLoggedIn: true },
      { option: 'Categories', to: '/categories', displayIfLoggedIn: true },
      { option: 'Login', to: '/login', displayIfLoggedIn: false },
      { option: 'Logout', to: '/logout', displayIfLoggedIn: true },
    ],
  };
  return (
    <BrowserRouter>
      <NavBar navBarOptions={navBarOptions} />
      <div className="App">
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route
            path="my-profile"
            element={
              <PrivateRoute>
                <MyProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="admin/list">
            <Route
              path=":listId"
              element={
                <PrivateRoute>
                  <ListExamplePage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="products-ec"
            element={
              <PrivateRoute>
                <ProductsECPage />
              </PrivateRoute>
            }
          />
          <Route path="product-ec/edit">
            <Route
              path=":productId"
              element={
                <PrivateRoute>
                  <AddEditProductECPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="product-ec/add"
            element={
              <PrivateRoute>
                <AddEditProductECPage />
              </PrivateRoute>
            }
          />
          <Route
            path="categories"
            element={
              <PrivateRoute>
                <CategoriesPage />
              </PrivateRoute>
            }
          />
          <Route path="category/edit">
            <Route
              path=":categoryId"
              element={
                <PrivateRoute>
                  <AddEditCategoryPage />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="category/add"
            element={
              <PrivateRoute>
                <AddEditCategoryPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
