import clsx from 'clsx';

export default function SearchItemSkeleton({
  view = 'list',
}: {
  view: 'list' | 'grid';
}) {
  return (
    <div
      className={clsx(
        'rounded-xl w-full flex p-3 bg-gray-50',
        view === 'list' ? 'gap-6 min-h-[147px]' : 'flex-col min-h-[320px]'
      )}
    >
      <div
        className={clsx(
          'bg-gray-200 rounded-lg animate-pulse',
          view === 'list' ? 'w-[120px] h-[120px]' : 'w-full h-[120px] mb-6'
        )}
      />
      <div className="flex-auto flex flex-col justify-center">
        <span className="bg-gray-200 rounded-[4px] mb-6 w-24 h-7 animate-pulse" />
        <div className="w-4/6 h-5 mb-2 rounded-sm bg-gray-200 animate-pulse" />
        <div className="w-4/5 h-4 mb-2 rounded-sm bg-gray-200 animate-pulse" />
        <div className="w-1/3 h-4 rounded-sm bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
