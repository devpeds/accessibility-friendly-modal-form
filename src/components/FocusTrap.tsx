import { cloneElement, forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from '../utils';

type FocusTrapProps = {
  children: React.ReactElement<{ ref?: React.Ref<unknown> | null }>;
};

const getFocusableList = (element: HTMLElement) => {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  return Array.from(element.querySelectorAll<HTMLElement>(selectors)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
  );
};

const FocusTrap = ({ children }: FocusTrapProps, ref: React.Ref<never>) => {
  const nodeRef = useRef<HTMLElement>(null);

  const childRef = children.props?.ref || null;
  const combinedRef = mergeRefs(nodeRef, ref, childRef);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) {
      return;
    }

    getFocusableList(node)[0]?.focus();
  }, []);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableList = getFocusableList(node);
      if (focusableList.length === 0) {
        return;
      }

      const first = focusableList[0];
      const last = focusableList[focusableList.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    node.addEventListener('keydown', handleKeyDown);

    return () => node.removeEventListener('keydown', handleKeyDown);
  }, []);

  return cloneElement(children, { ref: combinedRef });
};

export default forwardRef(FocusTrap);
