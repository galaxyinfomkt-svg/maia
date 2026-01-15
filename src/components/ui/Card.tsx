import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
}

export default function Card({
  className,
  variant = 'default',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white transition-all duration-300',
        variant === 'default' && 'shadow-lg hover:shadow-xl',
        variant === 'elevated' && 'shadow-xl hover:shadow-2xl hover:-translate-y-2',
        variant === 'bordered' && 'border border-slate-200 hover:border-amber-400',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
