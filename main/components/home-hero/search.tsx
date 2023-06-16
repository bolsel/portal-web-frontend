import { UISearchInput } from '@portal-web/shared-ui';
import { useRouter } from 'next/router';

export default function HomeHeroSearch() {
  const router = useRouter();
  return (
    <div className="max-w-xl lg:max-w-2xl w-full">
      <div className="relative mb-8">
        <UISearchInput
          onSubmit={(value) => router.push(`/pencarian?q=${value}`)}
        />
      </div>
    </div>
  );
}
