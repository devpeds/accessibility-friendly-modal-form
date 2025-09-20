import 'modern-normalize';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ModalFormPage from './ModalFormPage';

// biome-ignore lint/style/noNonNullAssertion: #root always exists
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalFormPage />
  </StrictMode>,
);
