import React from 'react';
import LayananPublikImagesThumb from '../../components/layanan-publik/images-thumb';
import LayananPublikInfoUmum from '../../components/layanan-publik/info-umum';
import LayananPublikInformations from '../../components/layanan-publik/informations';
import BaseJumbotron from "../../components/base/jumbotron";
import BaseBreadcrumb from "../../components/base/breadcrumb";
import {UIContainer, UIIcon} from "@portal-web/shared-ui";
import {PublicServicesResource} from "@portal-web/shared-api/server";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const publicServiceResource = new PublicServicesResource();
  const data = await publicServiceResource.apiResourceFetch({
    pathQuery:['byId',id]
  })
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { id, data: (data)},

  };
}

export default function LayananPublikReadPage({ data }) {
  const LogoComponent = ({ item, className }) => (
    <div className={`${className}`}>
      {item.logo ? (
        <img src={item.logo.url} alt={`Logo ${item.slug}`} className="w-full" />
      ) : (
        <UIIcon
          icon="medical-icon:i-social-services"
          className="text-primary w-24 h-24"
        />
      )}
    </div>
  );
  return (
    <main className="overflow-hidden">
      <section>
        <BaseJumbotron
          title={data.title}
          subtitle={data.description}
          metaData
          breadcrumb={
            <BaseBreadcrumb
              items={[
                {
                  label: 'Beranda',
                  link: '/',
                },
                {
                  label: 'Layanan Publik',
                  link: '/layanan-publik',
                },
              ]}
            />
          }
        />
      </section>
      <section className="w-full bg-gray-200">
        <UIContainer className="relative -top-24 z-20">
          <div className="bg-white p-3 md:p-4 lg:p-6 xl:px-10 xl:py-8 rounded-xl shadow ">
            <section className="grid grid-cols-1 lg:grid-cols-[85px,1fr] gap-4">
              <LogoComponent item={data} className="" />
              <div className="flex flex-col items-start justify-center gap-1">
                <h1 className="font-bold text-blue-gray-800 text-2xl sm:text-[32px] leading-7 sm:leading-10">
                  {data.title}
                </h1>
                <div className="flex flex-row gap-2 items-center">
                  <UIIcon icon="mdi:history" className="w-4 h-4" />
                  <p className="font-lato text-xs text-blue-gray-800 leading-5">
                    Terakhir diupdate {data.date_updated_format}
                  </p>
                </div>
              </div>
            </section>
            <section className="mt-6 grid grid-flow-row sm:grid-cols-[auto,262px] lg:grid-cols-2 xl:grid-cols-[816px,auto] gap-4 xl:gap-6">
              <LayananPublikImagesThumb data={data} />
              <LayananPublikInfoUmum data={data} />
            </section>
            <LayananPublikInformations data={data} />
          </div>
        </UIContainer>
      </section>
    </main>
  );
}
