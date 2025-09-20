import { useState } from 'react';
import Button from './components/Button';
import Modal from './components/Modal';

const ModalFormPage = () => {
  /* 여기에 구현해 주세요 */
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <Button className="m-auto" onClick={() => setOpen(true)}>
        신청 폼 작성하기
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        Test Modal
        <input />
        <Button>Test</Button>
      </Modal>
    </div>
  );
};

export default ModalFormPage;
