import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'amber' | 'success' | 'outline';
}

export default function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase',
        variant === 'default' && 'bg-slate-100 text-slate-700',
        variant === 'amber' && 'bg-amber-400/20 border border-amber-400/40 text-amber-400',
        variant === 'success' && 'bg-green-100 text-green-700',
        variant === 'outline' && 'border border-slate-300 text-slate-600',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
