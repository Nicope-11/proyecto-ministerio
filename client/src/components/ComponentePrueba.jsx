import { useEffect } from 'react';
import { SharingInfo } from './SharingInfo';

const ComponentePrueba = () => {
  const subscription$ = SharingInfo.getSubject();
  useEffect(() => {
    subscription$.subscribe((data) => {
      console.log(data);
    });
  });
};
export default ComponentePrueba;
