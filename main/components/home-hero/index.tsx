import HomeHeroImage from './image';
import styles from './styles.module.css';
import clsx from 'clsx';
import { UIContainer } from '@portal-web/shared-ui';
import localFont from '@next/font/local';
import HomeHeroSearch from './search';

const _introFontClassName = localFont({
  src: '../../public/fonts/Intro.otf',
  variable: '--font-intro',
});

export default function HomeHero() {
  return (
    <div className={styles.main}>
      <HomeHeroImage />
      <section className="flex justify-center items-center w-full absolute top-0 h-[740px]">
        <UIContainer>
          <div className="flex flex-col items-center -mt-20 bg-no-repeat py-3">
            <h2
              className={clsx(
                _introFontClassName.className,
                'font-sans text-white font-intro u italic uppercase leading-normal text-center tracking-tight text-xl md:text-3xl lg:text-4xl mb-2'
              )}
            >
              Portal Resmi
            </h2>
            <h2
              className={clsx(
                _introFontClassName.className,
                'font-sans text-white uppercase leading-normal text-center tracking-tight text-2xl md:text-4xl lg:text-[42px] mb-2 md:mb-3 lg:mb-2'
              )}
            >
              Pemerintah Kabupaten
            </h2>
            <h1
              className={clsx(
                _introFontClassName.className,
                'font-sans text-white uppercase leading-normal text-center tracking-tight text-2xl md:text-4xl lg:text-[42px] mb-4 md:mb-6 lg:mb-12'
              )}
            >
              Bolaang Mongondow Selatan
            </h1>
            <HomeHeroSearch />
          </div>
        </UIContainer>
      </section>
      <div className={styles.curved} />
    </div>
  );
}
