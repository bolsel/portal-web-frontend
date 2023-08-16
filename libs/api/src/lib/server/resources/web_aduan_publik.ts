import { apiBaseResource } from '../base-resource';

export const apiResourceWebAduanPublik = () => {
  return apiBaseResource({
    resourceKey: 'web_aduan_publik',
    baseFilter: {},
    defaultQuery: {
      fields: ['id', 'nama', 'email', 'hp', 'isi', 'date_created'],
    },
    postPaths: {
      async sendNew({ itemHandler, data, errorThrow }) {
        const { nama, email, hp, isi, website_id } = data;
        if (!nama) errorThrow('nama: Nama tidak boleh kosong.');
        else if (!email) errorThrow('email: Email tidak boleh kosong.');
        else if (!hp) errorThrow('hp: Nomor Hp tidak boleh kosong.');
        else if (!isi) errorThrow('isi: Isi Aduan tidak boleh kosong.');
        else if (!website_id)
          errorThrow('website_id: ID Website tidak boleh kosong.');
        else if (typeof website_id !== 'string')
          errorThrow('website_id: ID harus berupa string.');
        const t = await itemHandler.createOne({
          nama,
          email,
          hp,
          isi,
          website: website_id,
        });
        return t;
      },
    },
    paths: {
      byWebId({ query, errorThrow, pathQuery: [webId] }) {
        if (!webId) errorThrow('Web id dibutuhkan');
        return {
          query: {
            fields: query.fields,
            filter: { website: { id: webId } },
          },
          normalizer(data) {
            return data;
          },
        };
      },
      // async post_sendNew() {
      //   const { nama, email, hp, isi, website_id } = this.postData;
      //   if (!nama) this.errorThrow('nama: Nama tidak boleh kosong.');
      //   else if (!email) this.errorThrow('email: Email tidak boleh kosong.');
      //   else if (!hp) this.errorThrow('hp: Nomor Hp tidak boleh kosong.');
      //   else if (!isi) this.errorThrow('isi: Isi Aduan tidak boleh kosong.');
      //   else if (!website_id)
      //     this.errorThrow('website_id: ID Website tidak boleh kosong.');
      //   else if (typeof website_id !== 'string')
      //     this.errorThrow('website_id: ID harus berupa string.');
      //   const t = await this.itemsHandler().createOne({
      //     nama,
      //     email,
      //     hp,
      //     isi,
      //     website: website_id,
      //   });
      //   return () => t;
      // },
    },
  });
};
