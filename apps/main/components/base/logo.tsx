import Image from 'next/image';

export default function BaseLogo() {
  return (
    <>
      <Image
        width={50}
        height={50}
        src="/images/logo.png"
        className="w-auto h-full"
        alt="Beranda"
      />
      <Image
        src="/images/portal-bolselkabgoid.svg"
        width="32"
        height="32"
        alt="Beranda"
        className="w-full h-full"
      />
    </>
  );
}
