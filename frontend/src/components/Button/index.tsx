import styles from './styles.module.css';

import { clsx } from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

export function Button({
  variant = 'primary',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.default, [
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
      ])}
      {...rest}
    />
  );
}