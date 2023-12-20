import { ReactNode } from 'react';
import cns from 'classnames';

import S from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  leftSlot?: ReactNode;
  children: string;
  fullWidth?: boolean;
}

const Button = (props: ButtonProps) => {
  const {children, theme = 'primary', size = 'medium', fullWidth = false, leftSlot, ...restProps} = props;

  return (
    <button className={cns(S.button, theme && S[`theme_${theme}`], size && S[`size_${size}`], fullWidth && S.fullWidth)} {...restProps}>
      {leftSlot}
      <span>{children}</span>
    </button>
  )
}

export default Button;