import { cloneElement, useId } from 'react';
import { cn } from '../utils';
import { Caption, Subtitle2 } from './Typography';

type InputProps = React.ComponentPropsWithRef<'input'>;

type SelectProps = React.ComponentPropsWithRef<'select'> & {
  options: string[];
  placeholder?: string;
};

type FormFieldProps = {
  className?: string;
  label: string;
  error?: string;
  children: React.ReactElement<InputProps | SelectProps>;
};

const FormField = ({ label, className, error, children }: FormFieldProps) => {
  const inputId = useId();

  return (
    <div className={cn('flex flex-col', className)}>
      <Subtitle2 className="mb-1.5 cursor-pointer" as="label" htmlFor={inputId}>
        {label}
      </Subtitle2>
      {cloneElement(children, {
        id: inputId,
        className: cn(
          'rounded-md border px-4 py-3 text-md',
          children.props.className,
        ),
      })}
      <Caption className="mt-1.5 text-red-500">{error}</Caption>
    </div>
  );
};

FormField.Input = (props: InputProps) => <input {...props} />;

FormField.Select = ({
  options,
  defaultValue,
  placeholder,
  ...props
}: SelectProps) => {
  return (
    <select {...props} defaultValue={defaultValue ?? ''}>
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FormField;
