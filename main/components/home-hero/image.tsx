import styles from './styles.module.css';
import { UICarousel } from '@portal-web/shared-ui';
// import Carousel from '../../carousel/carousel/carousel';

const HomeHeroImage = () => {
  return (
    <div className="h-[740px]">
      <div className={styles.imageBg} />
      <UICarousel
        duration={5000}
        filter={() => <div className={styles.imageBg} />}
        items={[
          { image: '/images/bg/1.jpeg' },
          { image: '/images/bg/2.jpeg' },
          { image: '/images/bg/3.jpeg' },
          { image: '/images/bg/4.jpeg' },
        ]}
      />
    </div>
  );
};

export default HomeHeroImage;
