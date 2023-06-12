import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import React from 'react';

export default function LayananPublikInfoUmum({ data }) {
  const ListData = ({ title, value, icon, className }) => (
    <div
      className={clsx(
        'grid grid-cols-[20px,1fr] gap-3 font-lato text-sm leading-6 text-blue-gray-400',
        className
      )}
    >
      <Icon icon={icon} className="w-5 h-5 my-[5px] mr-[5px]" />
      <div className="flex flex-col items-start justify-center gap-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-blue-gray-600 w-full">{value}</div>
      </div>
    </div>
  );
  const dataList:any = [];
  if (data.type && data.type.length) {
    dataList.push({
      title: 'Jenis Pelayanan',
      value: (
        <div className="flex gap-2">
          {data.type.map((t, i) => (
            <div
              key={i}
              className={clsx(
                'flex gap-2 items-center capitalize bg-primary-100 px-2 rounded-xl'
              )}
            >
              <Icon
                className={''}
                icon={
                  t === 'online'
                    ? 'mdi:weather-cloudy'
                    : 'mdi:cloud-remove-outline'
                }
              />{' '}
              {t}
            </div>
          ))}
        </div>
      ),
      icon: 'mdi:weather-cloudy',
    });
  }
  if (data.category) {
    dataList.push({
      title: 'Kategori',
      value: data.category,
      icon: 'bx:category-alt',
    });
  }
  if (data.organization && data.organization.name) {
    dataList.push({
      title: 'Organisasi',
      value: data.organization.name,
      icon: 'bx:category-alt',
    });
  }
  if (data.address) {
    dataList.push({
      title: 'Alamat',
      value: data.address,
      icon: 'mdi:map-marker',
    });
  }
  if (data.phones && data.phones.length) {
    dataList.push({
      title: 'Telepon',
      value: data.phones.map((p, i) => (
        <div key={i} className="line-clamp-1" title={p.description}>
          {p.number}{' '}
          {p.description ? (
            <span className="text-xs">({p.description})</span>
          ) : null}
        </div>
      )),
      icon: 'mdi:phone',
    });
  }
  if (data.operational_hours && data.operational_hours.length) {
    const hari = {
      1: 'Senin',
      2: 'Selasa',
      3: 'Rabu',
      4: 'Kamis',
      5: 'Jumat',
      6: 'Sabtu',
      7: 'Minggu',
    };
    dataList.push({
      title: 'Jam Operasional',
      value: (
        <div className="flex flex-col bg-gray-100 rounded-xl p-2 w-full">
          {data.operational_hours.map((p, i) => (
            <div
              key={i}
              className="grid grid-cols-[60px,auto] font-lato leading-6 text-sm"
            >
              <div>{hari[p.day]}</div>
              <div className="">
                {p.open && p.start && p.end
                  ? `${p.start.slice(0, -3)} - ${p.end.slice(0, -3)}`
                  : '-'}
              </div>
            </div>
          ))}
        </div>
      ),
      icon: 'mdi:clock-outline',
    });
  }
  if (data.links && data.links.length) {
    dataList.push({
      title: 'Link',
      value: (
        <div className="flex flex-col p-2 w-full">
          {data.links.map((p, i) => {
            let _icon = 'mdi:web';
            if (p.name === 'playstore') _icon = 'ion:logo-google-playstore';
            else if (p.name === 'appstore') _icon = 'ion:logo-apple-appstore';
            return (
              <Link key={i} href={p.link} target="_blank">
                <button
                  title={p.link}
                  className="group flex flex-row justify-between  items-center !px-3 !py-1 !rounded-xl w-full hover:bg-primary/20 border border-primary/50 mb-2"
                >
                  <div className="flex flex-col items-center">
                    <p className="capitalize font-segoeui font-semibold text-base text-blue-gray-800">
                      {p.name}
                    </p>
                  </div>
                  <Icon icon={_icon} className="w-6 h-6" />
                </button>
              </Link>
            );
          })}
        </div>
      ),
      icon: 'mdi:clock-outline',
    });
  }
  if (data.social_media && data.social_media.length) {
    dataList.push({
      title: 'Sosial Media',
      icon: 'material-symbols:share-outline',
      value: (
        <div className="flex gap-2">
          {data.social_media.map((sm, i) => (
            <Link
              key={i}
              target="_blank"
              title={sm.name}
              href={sm.link}
              className="flex flex-col p-2 items-center justify-center gap-1 rounded-lg hover:bg-primary-50"
            >
              <Icon icon={`custom-brand-logo:${sm.name}`} className="w-8 h-8" />
            </Link>
          ))}
        </div>
      ),
    });
  }
  return (
    <div
      className={clsx({
        ' flex flex-col rounded-xl p-4 border border-solid border-gray-300 xl:row-span-2 sm:max-h-[557px] lg:max-h-[597px] xl:max-h-[557px] overflow-auto':
          true,
        'xl:row-span-1 xl:max-h-[383px] sm:col-span-2 xl:col-span-1':
          !data.images.length,
      })}
    >
      <section>
        {dataList.map((d, i) => (
          <ListData
            key={i}
            title={d.title}
            value={d.value}
            icon={d.icon}
            className={i > 0 ? ' mt-4 sm:mt-8' : ''}
          />
        ))}
      </section>
    </div>
  );
}
