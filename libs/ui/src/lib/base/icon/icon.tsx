import { Icon, IconProps, addCollection } from '@iconify/react/dist/offline';
import collections from './collections';

export type UIBaseIconNamesType = keyof typeof collections.icons;

addCollection(collections);

export function UIBaseIcon({
  icon,
  fallback,
  ...props
}: IconProps & { icon: UIBaseIconNamesType; fallback?: UIBaseIconNamesType }) {
  if (!collections.icons[icon] && fallback) {
    icon = fallback;
  }
  return <Icon icon={`base:${icon}`} {...props} />;
}
