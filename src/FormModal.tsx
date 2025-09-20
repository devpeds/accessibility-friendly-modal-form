import { useEffect, useId, useState } from 'react';
import { createRoot } from 'react-dom/client';
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
  onCancel: () => void;
};

const FormModal = ({ open, onSubmit, onCancel }: FormModalProps) => {
  const titleId = useId();
  const descriptionId = useId();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  return (
    <Modal
      className="flex flex-col"
      titleId={titleId}
      descriptionId={descriptionId}
      open={open}
      onClose={onCancel}
    >
      <H3 as="h1" id={titleId} className="mb-1">
        신청 폼
      </H3>
      <Body2 id={descriptionId} className="mb-3 text-gray-600">
        이메일과 FE 연차 등 간단한 정보를 입력해주세요.
      </Body2>
      <form
        className="space-y-3"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            placeholder="https://github.com/username"
          />
        </FormField>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button color="secondary" type="button" onClick={onCancel}>
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

export const openFormModal = async () => {
  return new Promise<FormData | null>((resolve, reject) => {
    const id = 'root-modal';

    if (document.getElementById(id)) {
      return reject('form modal is already open');
    }

    const container = document.createElement('div');
    container.setAttribute('id', id);
    document.body.appendChild(container);

    const root = createRoot(container);

    const clear = () => {
      root.unmount();
      container.remove();
    };

    const FormModalHandler = () => {
      const [open, setOpen] = useState(true);

      useEffect(() => {
        if (!open) {
          requestAnimationFrame(clear);
        }
      }, [open]);

      const handleSubmit = (data: FormData) => {
        resolve(data);
        setOpen(false);
      };

      const handleCancel = () => {
        setOpen(false);
      };

      return (
        <FormModal
          open={open}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );
    };

    root.render(<FormModalHandler />);
  });
};
