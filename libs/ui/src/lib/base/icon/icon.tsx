import { Icon, IconProps, addCollection } from '@iconify/react/dist/offline';
import collections from './collections';

type IconNamesType = keyof typeof collections.icons;

addCollection(collections);

export function UIBaseIcon({
  icon,
  fallback,
  ...props
}: IconProps & { icon: IconNamesType; fallback?: IconNamesType }) {
  if (!collections.icons[icon] && fallback) {
    icon = fallback;
  }
  return <Icon icon={`base:${icon}`} {...props} />;
}
