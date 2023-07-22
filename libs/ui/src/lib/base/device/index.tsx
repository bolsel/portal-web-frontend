import dynamic from 'next/dynamic';
import { UIBaseIcon } from '../icon';

export const UIBaseDevice = dynamic(() => import('./device'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center">
      <UIBaseIcon
        icon="loading"
        className="animate-spin text-primary-base stroke-2 fill-amber-200"
        width={50}
      />
    </div>
  ),
});
