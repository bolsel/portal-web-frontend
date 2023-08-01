import { notFound } from "next/navigation";
import { getSiteData } from "../../../../lib/site";
import SiteLayout from "../../../../components/layout/site/layout";
import { apiResourceWebNews } from "@portalweb/api/server";
import { UIBaseIcon, UIBlurImage, UIContentBlocks, UIShareItem } from "@portalweb/ui";
import Latest from "./_Latest";

export default async function SiteBeritaSlugPage({params:{domain,slug}}) {
  const site = await getSiteData(domain);
  if (!site) notFound();
  const item = await apiResourceWebNews().fetch({
    pathQuery:['bySlugWebId', slug, site.id]
  }).catch(()=>null)
  if(!item) notFound();
  await apiResourceWebNews().itemHandler.updateOne(item.id, {
    view_count: item.view_count + 1,
  });
  const articleUrl = `https://${domain}/berita/${slug}`
  return <SiteLayout site={site} jumbotron={{
    title:item.title,
    subtitle: `Berita ${site.organization_name}`
  }}>
    <article className="px-5">
        <section className="h-full grid grid-cols-1 gap-8 lg:grid-cols-[60%,auto] xl:gap-[72px]">
          <div className="flex flex-col gap-7">
            <div className="w-full min-h-screen">
              <div className="flex flex-col gap-2 mt-3">
                <UIBlurImage
                  src={item.image_cover.url}
                  alt={item.title}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-full rounded-lg"
                />
                <div className="flex flex-col gap-1 text-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <UIBaseIcon icon="calendar" className="w-4 h-4" />
                      <p className="text-sm">
                      {item.publish_date.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <UIBaseIcon icon="eye" className="w-4 h-4" />
                      <p className="text-sm">{item.view_count}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <UIBaseIcon icon="share" className="w-4 h-4" />
                      <p className="text-sm">{item.shared_count}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UIBaseIcon icon="tags" className="w-4 h-4" />
                    <div className="flex gap-2">
                      {(item.tags ?? []).map((tag, i) => {
                        return (
                          <span
                            key={i}
                            className="text-xs inline-block px-2 py-1 rounded-lg bg-base-200"
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UIBaseIcon icon="pencil" className="w-4 h-4" />
                    <p className="text-sm">
                      Penulis:{' '}
                      <span className="capitalize italic">{item.writer}</span>
                    </p>
                    <div className="hidden lg:flex items-center gap-2">
                      |{' '}
                      <UIBaseIcon
                        icon="camera"
                        className="w-4 h-4"
                      />
                      <p className="text-sm">
                        Peliput:{' '}
                        <span className="capitalize italic">
                          {item.reporter}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="lg:hidden flex items-center gap-2">
                    <UIBaseIcon
                      icon="camera"
                      className="w-4 h-4"
                    />
                    <p className="text-sm">
                      Peliput:{' '}
                      <span className="capitalize italic">{item.reporter}</span>
                    </p>
                  </div>
                </div>
              </div>
              {item.content && item.content.blocks && (
                <div className="prose max-w-none">
                  <UIContentBlocks {...item.content} />
                </div>
              )}
            </div>
            <p className="font-lora text-gray-800"></p>
          </div>
          <section className="my-5">
            <div className="flex flex-col gap-2 lg:sticky lg:top-[88px]">
              <div className="flex flex-col gap-3 w-full mb-5">
                <p className="inline-flex gap-3 font-lato text-xs text-blue-gray-200 leading-5">
                  <UIBaseIcon
                    icon="share"
                    className="self-start text-primary w-5 h-5"
                  />
                  Bagikan Berita
                </p>
                <UIShareItem
                  url={articleUrl}
                  title={item.title}
                  quote={item.description}
                  // beforeOnClick={() => {
                  //   console.log('as');

                  //   fetch(apiSharedCount);
                  // }}
                />
              </div>
              <div className="flex w-full h-[38px] mb-6">
                <div className="border-b-[3px] border-primary">
                  <h1 className="whitespace-nowrap font-lato text-sm font-bold leading-6 uppercase text-blue-gray-800">
                    Berita Terbaru
                  </h1>
                </div>
                <div className="w-full h-full border-b-[3px] border-blue-gray-50" />
              </div>
              <Latest webId={site.id}/>
            </div>
          </section>
        </section>
      </article>
  </SiteLayout>
}
