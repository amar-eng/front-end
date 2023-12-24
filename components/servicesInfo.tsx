import getServices from '@/actions/get-services';
import { StoreModal } from './modals/store-modal';
import getCategories from '@/actions/get-categories';

const ServicesInfo = async () => {
  const addedServices = await getServices({
    categoryId: 'd3050703-013f-41fc-801f-936d9a1b5d7f',
  });

  console.log(addedServices);

  return (
    <>
      <StoreModal />
    </>
  );
};

export default ServicesInfo;
