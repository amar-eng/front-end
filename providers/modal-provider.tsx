// 'use client';

import { StoreModal } from '@/components/modals/store-modal';
import ServicesInfo from '@/components/servicesInfo';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  return (
    <>
      <StoreModal />
    </>
  );
};

// const addedServices = await getServices({
//   categoryId: 'd3050703-013f-41fc-801f-936d9a1b5d7f',
// });
