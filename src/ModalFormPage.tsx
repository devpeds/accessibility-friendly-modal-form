import Button from './components/Button';

const openFormModal = async (): Promise<object | null> => {
  // TODO: implementation
  return null;
};

const ModalFormPage = () => {
  /* 여기에 구현해 주세요 */
  const handleClickButton = async () => {
    const result = await openFormModal();
    if (!result) {
      return;
    }

    console.log(result);
  };

  return (
    <div className="flex h-screen w-screen">
      <Button className="m-auto" onClick={handleClickButton}>
        신청 폼 작성하기
      </Button>
    </div>
  );
};

export default ModalFormPage;
