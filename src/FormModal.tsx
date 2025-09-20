import { useForm } from 'react-hook-form';
import Button from './components/Button';
import FormField from './components/FormField';
import Modal from './components/Modal';
import { Body2, H3 } from './components/Typography';

type FormData = {
  name: string;
  email: string;
  experience: string;
  github: string;
};

type FormModalProps = {
  open: boolean;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

const FormModal = ({ open, onSubmit, onClose }: FormModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      experience: '',
      github: '',
    },
  });

  return (
    <Modal className="flex flex-col" open={open} onClose={onClose}>
      <H3 as="h1" className="mb-1">
        신청 폼
      </H3>
      <Body2 className="mb-3 text-gray-600">
        이메일과 FE 연차 등 간단한 정보를 입력해주세요.
      </Body2>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField label="이름/닉네임" error={errors.name?.message}>
          <FormField.Input
            {...register('name', { required: '이름을 입력해주세요' })}
            autoComplete="name"
          />
        </FormField>
        <FormField label="이메일" error={errors.email?.message}>
          <FormField.Input
            {...register('email', { required: '이메일을 입력해주세요' })}
            autoComplete="email"
          />
        </FormField>
        <FormField label="FE 경력 연차" error={errors.experience?.message}>
          <FormField.Select
            placeholder="선택해주세요"
            options={['0 ~ 3년차', '4 ~ 7년차', '8년 이상']}
            {...register('experience', { required: '연차를 입력해주세요' })}
          />
        </FormField>
        <FormField label="Github 링크" error={errors.github?.message}>
          <FormField.Input
            {...register('github', { required: 'Github 링크를 입력해주세요' })}
            placeholder="github.com/username"
          />
        </FormField>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button color="secondary" type="button" onClick={onClose}>
            취소
          </Button>
          <Button color="primary" type="submit">
            제출
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;
