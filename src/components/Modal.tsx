import { useRef } from 'react';
import { cn } from '../utils';
import FocusTrap from './FocusTrap';

type ModalProps = {
  className?: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ className, open, children, onClose }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

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
      ref={overlayRef}
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
          tabIndex={-1}
        >
          {children}
        </div>
      </FocusTrap>
    </div>
  );
};

export default Modal;
