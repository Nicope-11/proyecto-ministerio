import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../app/store';
import { printersApiSlice } from '../../app/api/printersApiSlice';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      printersApiSlice.util.prefetch('getPrinters', 'printersList', {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
