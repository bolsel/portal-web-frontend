import { ComponentProps } from 'react';
import Image from 'next/image';
import { UIBaseIcon } from '../../icon';

export type UIBaseViewApplicationItemLogoProps = {
  item: Record<string, any>;
} & Omit<ComponentProps<'div'>, 'children'>;
export function UIBaseViewApplicationItemLogo({
  item,
  ...props
}: UIBaseViewApplicationItemLogoProps) {
  return (
    <div {...props}>
      {item.logo && item.logo.url ? (
        <Image
          src={item.logo.url}
          width={50}
          height={50}
          alt={`Logo ${item.slug}`}
          className="w-full"
        />
      ) : (
        <UIBaseIcon
          icon="apps"
          className="text-primary"
          width={48}
          height={48}
        />
      )}
    </div>
  );
}
