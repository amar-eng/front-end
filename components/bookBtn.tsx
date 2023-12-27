'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Button } from './ui/button';

const BookBtn = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  const handleButtonClick = () => {
    if (!isOpen) {
      onOpen();
    }
  };
  return (
    <Button className="mx-5 w-50 py-6" size="lg" onClick={handleButtonClick}>
      Get a Quote
    </Button>
  );
};

export default BookBtn;
