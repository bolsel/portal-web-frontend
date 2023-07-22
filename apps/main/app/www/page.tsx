import HomeNewsHeadline from '../../components/home-news-headline/home-news-headline';
import HomeHero from '../../components/home-hero/home-hero';

export default async function MainIndexPage() {
  return (
    <main className="w-full overflow-hidden">
      <HomeHero />
      <HomeNewsHeadline />
    </main>
  );
}
