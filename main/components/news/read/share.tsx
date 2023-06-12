import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share';

import {Icon} from '@iconify/react';
import createShareButton from 'react-share/lib/hocs/createShareButton';
import objectToGetParams from 'react-share/lib/utils/objectToGetParams';


function whatsappLink(
  url: string,
  {
    title,
    separator = '  ',
    quote = ' ',
  }: { title?: string; separator?: string; quote?: string }
) {
  return (
    'https://api.whatsapp.com/send' +
    objectToGetParams({
      text: (title ? title + separator + url : url) + separator + quote,
    })
  );
}

const WhatsappShareButton = createShareButton(
  'whatsapp',
  whatsappLink,
  (props) => ({}),
  {}
);
export default function NewsReadShare({id,apiSharedCount, url, title, quote = null}) {
  const networks: any = [
    {
      name: 'facebook',
      component: FacebookShareButton,
      icon: (
        <Icon icon="mdi:facebook" color="#2196F3" inline className="w-6 h-6"/>
      ),
      props: () => ({title, quote, hashtag: 'bolselkab'}),
    },
    {
      name: 'twitter',
      component: TwitterShareButton,
      icon: (
        <Icon icon="mdi:twitter" color="#2196F3" inline className="w-6 h-6"/>
      ),
      props: () => ({
        title,
        quote,
        hashtags: 'bolselkab, bolsel, portalbolsel',
      }),
    },
    {
      name: 'whatsapp',
      component: WhatsappShareButton,
      icon: (
        <Icon icon="mdi:whatsapp" color="#1FB767" inline className="w-6 h-6"/>
      ),
      props: () => ({title, quote}),
    },
    {
      name: 'telegram',
      component: TelegramShareButton,
      icon: (
        <Icon icon="mdi:telegram" color="#0088cc" inline className="w-6 h-6"/>
      ),
      props: () => ({title, quote}),
    },
    {
      name: 'email',
      component: EmailShareButton,
      icon: (
        <Icon
          icon="mdi:email-outline"
          color="#E53935"
          inline
          className="w-6 h-6"
        />
      ),
      props: () => ({subject: title, body: quote}),
    },
  ];

  return (
    <>
      <ul className="flex justify-between lg:justify-start gap-4 w-full overflow-auto">
        {networks.map((network, i) => (
          <li
            key={i}
            className="w-16 h-16 p-2 rounded-lg text-center text-xs text-gray-600 leading-[18px]
      hover:bg-gray-100 hover:text-gray-800 transition-colors ease-in-out duration-150"
          >
            <network.component
              beforeOnClick={() => {
                if(apiSharedCount) {
                  fetch(apiSharedCount);
                }
              }}
              className="flex flex-col gap-1 w-full h-full items-center justify-center capitalize"
              windowHeight={400}
              windowWidth={550}
              {...network.props()}
              {...{
                url,
              }}
            >
              {network.icon} {network.name}
            </network.component>
          </li>
        ))}
      </ul>
    </>
  );
}
