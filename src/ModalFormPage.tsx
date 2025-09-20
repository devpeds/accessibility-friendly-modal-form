import { useState } from 'react';
import Button from './components/Button';
import FormModal from './FormModal';

const ModalFormPage = () => {
  /* 여기에 구현해 주세요 */
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <Button className="m-auto" onClick={() => setOpen(true)}>
        신청 폼 작성하기
      </Button>
      <FormModal
        open={open}
        onSubmit={console.log}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default ModalFormPage;
