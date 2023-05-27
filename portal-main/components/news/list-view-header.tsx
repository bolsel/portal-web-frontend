export default function NewsListViewHeader({ label, category = '' }) {
  return (
    <div className="flex w-full h-[38px] mb-6">
      <div className="border-b-[3px] border-primary">
        <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
          {label}{' '}
          {category && <span className="text-gray-500">di {category}</span>}
        </h1>
      </div>
      <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
    </div>
  );
}
