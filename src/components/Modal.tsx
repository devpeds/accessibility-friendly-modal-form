import { useEffect, useRef } from 'react';
import { cn } from '../utils';
import FocusTrap from './FocusTrap';

type ModalProps = {
  className?: string;
  open: boolean;
  titleId?: string;
  descriptionId?: string;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({
  className,
  open,
  titleId,
  descriptionId,
  children,
  onClose,
}: ModalProps) => {
  const prevActiveElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    prevActiveElementRef.current = document.activeElement as HTMLElement;
    return () => {
      prevActiveElementRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleEscape = (event: React.KeyboardEvent) => {
    if (event.key !== 'Escape') return;

    event.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      aria-hidden={!open}
      onKeyDown={handleEscape}
      onClick={handleBackdropClick}
    >
      <FocusTrap>
        <div
          className={cn(
            'relative max-h-[80vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-lg',
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          {children}
        </div>
      </FocusTrap>
    </div>
  );
};

export default Modal;
