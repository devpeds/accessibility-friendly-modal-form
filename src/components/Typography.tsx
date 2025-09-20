import { cva, type VariantProps } from 'class-variance-authority';
import { createElement } from 'react';
import { cn } from '../utils';

type AsProp<T extends React.ElementType> = {
  as?: T;
};

type PolyMorphicProps<T extends React.ElementType, Props = object> = AsProp<T> &
  React.ComponentPropsWithoutRef<T> &
  Props;

type NonNullableVariantProps<
  T extends ReturnType<typeof cva>,
  K extends keyof VariantProps<T> = never,
> = [K] extends [never]
  ? VariantProps<T>
  : Omit<VariantProps<T>, K> & { [P in K]: NonNullable<VariantProps<T>[K]> };

type TypographyProps<T extends React.ElementType> = PolyMorphicProps<
  T,
  NonNullableVariantProps<typeof typography>
>;

type TypographyVariant = TypographyProps<React.ElementType>['typography'];

const typography = cva('leading-normal', {
  variants: {
    typography: {
      h1: 'font-bold text-5xl leading-tight',
      h2: 'font-bold text-4xl leading-none',
      h3: 'font-bold text-3xl leading-snug',
      h4: 'font-bold text-2xl leading-snug',
      h5: 'font-bold text-2xl leading-snug',
      h6: 'font-normal text-2xl leading-snug',
      subtitle1: 'font-normal text-lg',
      subtitle2: 'font-bold text-base',
      body1: 'text-lg',
      body2: 'text-base',
      caption: 'text-xs leading-none',
    },
  },
});

function createTypography<T extends React.ElementType = 'p'>(
  typography: TypographyVariant,
  element?: T,
) {
  return <S extends React.ElementType = T>({
    as,
    ...props
  }: PolyMorphicProps<S>) => (
    <Typography typography={typography} as={as || element || 'p'} {...props} />
  );
}

export const H1 = createTypography('h1', 'h1');
export const H2 = createTypography('h2', 'h2');
export const H3 = createTypography('h3', 'h3');
export const H4 = createTypography('h4', 'h4');
export const H5 = createTypography('h5', 'h5');
export const H6 = createTypography('h6', 'h6');
export const Subtitle1 = createTypography('subtitle1');
export const Subtitle2 = createTypography('subtitle2');
export const Body1 = createTypography('body1');
export const Body2 = createTypography('body2');
export const Caption = createTypography('caption', 'span');

export function Typography<T extends React.ElementType = 'p'>({
  className,
  as,
  typography: t,
  ...props
}: TypographyProps<T>) {
  return createElement(as || 'p', {
    className: cn(typography({ typography: t }), className),
    ...props,
  });
}
