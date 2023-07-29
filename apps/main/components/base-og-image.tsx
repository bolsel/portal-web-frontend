/* eslint-disable */

import { ImageResponse, NextRequest } from 'next/server';

const truncate = (str: string, num: number) => {
  if (!str) return '';
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

export default async function BaseOgImage({
  title,
  description,
  images,
  req,
}: {
  title: string;
  description: string;
  images: string[];
  req: NextRequest;
}) {
  const host = req.headers.get('host')!;
  const baseUrl = `https://${host}`;

  const fontIntro = await fetch(
    new URL('../styles/Intro.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const font = await fetch(
    new URL('../styles/Lora-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full"
        style={{
          fontFamily: 'FontBody',
          backgroundColor: '#c6312a',
        }}
      >
        <div tw="flex justify-between h-full">
          <div
            tw="flex flex-col justify-between w-[60%] shadow-lg rounded-2xl m-5"
            style={{
              background: 'linear-gradient(#fff,#fef2f2,#fee2e2)',
            }}
          >
            <div tw="flex flex-1 flex-col items-center p-5 pb-1">
              <h1 tw="m-0 text-3xl text-gray-900 leading-none tracking-normal">
                {title}
              </h1>
              <h3 tw="text-xl text-gray-600 leading-none tracking-tight">
                {truncate(description, 120)}
              </h3>
              {images.length ? (
                <div tw="flex w-full flex-1 rounded-lg">
                  <img
                    tw={`h-full w-[${images.length <= 1 ? '100%' : '70%'
                      }] rounded-xl shadow-sm`}
                    style={{ objectFit: 'cover' }}
                    src={images.shift()}
                  />
                  <div tw="flex flex-col w-[30%] h-full ml-2">
                    {images.splice(0, 2).map((img, i) => (
                      <img
                        key={i}
                        tw="flex-1 w-full h-full rounded-xl mb-2 shadow-sm"
                        style={{
                          objectFit: 'cover',
                        }}
                        src={img}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div
            tw="flex flex-col justify-between w-[38%] items-center text-white"
            style={{ fontFamily: 'Intro' }}
          >
            <div tw="flex flex-col items-center flex-1 px-4">
              <img
                tw="w-[100px] rounded-md mr-4 bg-[#b91c1c] p-2 shadow-lg"
                src="https://www.bolselkab.go.id/images/logo.png"
              />
              <div tw="flex rounded-xl mt-2 bg-[#b91c1c] p-2 shadow-md">
                <img
                  tw="w-[150px] rounded-md mr-4"
                  style={{
                    filter: 'drop-shadow(0px 0px 2px #000)',
                  }}
                  src="http://localhost:4200/images/bupati.png"
                />
                <img
                  tw="w-[150px] rounded-md mr-4"
                  style={{
                    filter: 'drop-shadow(0px 0px 2px #000)',
                  }}
                  src="http://localhost:4200/images/wabup.png"
                />
              </div>
              <h2 tw="m-0 mt-3">Pemerintah Kabupaten</h2>
              <h2 tw="m-0 font-bold">Bolaang Mongondow Selatan</h2>
            </div>
            <div tw="flex p-2">www.bolselkab.go.id</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'FontBody',
          data: font,
          style: 'normal',
        },
        {
          name: 'Intro',
          data: fontIntro,
          style: 'normal',
        },
      ],
    }
  );
}
