import { useSelector } from 'react-redux';
import {Navigate } from 'react-router-dom';
import authSelector from '../redux/authorization/selector';

export default function PrivateRoute({ element: Component}) {
  const isAuthenticated = useSelector(authSelector.isAuthenticated);

  if (isAuthenticated) {
    return <Component/>
  }

  return <Navigate to="/login"/>
}