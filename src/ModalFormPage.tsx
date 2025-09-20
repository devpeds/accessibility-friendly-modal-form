import Button from './components/Button';
import { openFormModal } from './FormModal';

const ModalFormPage = () => {
  const handleClick = async () => {
    const result = await openFormModal();

    if (!result) {
      return;
    }

    console.log(result);
    alert('제출에 성공했습니다!');
  };

  return (
    <div className="flex h-screen w-screen">
      <Button className="m-auto" onClick={handleClick}>
        신청 폼 작성하기
      </Button>
    </div>
  );
};

export default ModalFormPage;
