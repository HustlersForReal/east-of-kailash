'use client';

import { useReferredByCode } from '@/lib/referral-storage';

export function WhatsAppLink({
  message,
  phone = '919100110024',
  className,
  children,
  onClick,
}: {
  message: string;
  phone?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const code = useReferredByCode();
  const short = code ? code.replace(/^#/, '') : null;
  const fullMessage = short ? `${message}\n\nReferral Code: ${short}` : message;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(fullMessage)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
      {children}
    </a>
  );
}
