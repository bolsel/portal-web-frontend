import LightGallery, { LightGalleryProps } from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgRotate from 'lightgallery/plugins/rotate';

interface BaseLightGalleryProps extends LightGalleryProps {
  imageList: string[];
  children?: any;
  className?: string;
}

export default function BaseLightGallery({
  imageList,
  children,
  className,
  ...props
}: BaseLightGalleryProps) {
  return (
    <LightGallery
      // galleryId={'a'}

      licenseKey="0000-0000-000-0001"
      elementClassNames={className}
      speed={500}
      download={false}
      plugins={[lgThumbnail, lgZoom, lgRotate]}
      {...props}
    >
      {children
        ? children
        : imageList.map((image, i) => (
            <a key={i} href={image}>
              <img alt={image} src={image} />
            </a>
          ))}
    </LightGallery>
  );
}
