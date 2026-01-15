import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300',
          // Variants
          variant === 'primary' && 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 hover:shadow-2xl hover:scale-105',
          variant === 'secondary' && 'bg-slate-900 text-white hover:bg-slate-800',
          variant === 'outline' && 'border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900',
          variant === 'ghost' && 'text-amber-400 hover:bg-amber-400/10',
          // Sizes
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-base',
          size === 'lg' && 'px-10 py-5 text-lg tracking-wide uppercase',
          // Disabled state
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
