import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof button>;

const button = cva(
  'flex min-w-[64px] cursor-pointer items-center justify-center',
  {
    variants: {
      size: {
        large: 'rounded-lg px-5 py-3 text-lg',
        medium: 'rounded-md px-3 py-2 text-base',
        small: 'rounded-sm px-2 py-1 text-sm',
      },
      color: {
        primary: 'bg-blue-500 text-white hover:bg-blue-400',
        secondary: 'bg-gray-300 text-black hover:bg-gray-400',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: null,
      },
    },
    compoundVariants: [
      {
        color: 'primary',
        disabled: true,
        className: 'bg-blue-500/30',
      },
      {
        color: 'primary',
        disabled: true,
        className: 'bg-gray-500/30',
      },
    ],
    defaultVariants: {
      color: 'primary',
      size: 'medium',
      disabled: false,
    },
  },
);

const Button = ({
  className,
  size,
  color,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        button({ size, color, disabled }),
        'min-w-[64px]',
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
};

export default Button;
