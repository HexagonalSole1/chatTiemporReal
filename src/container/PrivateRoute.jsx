import { Route, Navigate} from 'react-router-dom';

const auth = () => {
    const UsuarioInfo = localStorage.getItem('UsuarioInfo'); // Reemplaza 'tu_clave_de_local_storage' con la clave que estás usando

  const isAuthenticated = UsuarioInfo !== null;
  return isAuthenticated;
};

const PrivateRoute = ({ element }) => {
  return auth() ? (
        <>
            {
                element
            }
        </>  
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;

