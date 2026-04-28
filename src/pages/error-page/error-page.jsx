import { useRouteError } from 'react-router-dom';
import Error from '../../components/error/error';
import classes from './error-page.module.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Error
      wrapperClass={classes.errorPage}
      errorClass={classes.error}
      error={error}
    />
  );
}
