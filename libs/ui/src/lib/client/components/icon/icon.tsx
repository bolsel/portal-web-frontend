import { Icon as MainIcon, IconProps as MainIconProps } from '@iconify/react';
export type UIIconProps = MainIconProps;

export const UIIcon = ({ icon, ...props }: UIIconProps) => {
  return <MainIcon icon={icon} {...props} />;
};
