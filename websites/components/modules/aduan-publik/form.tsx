import { resourceUrlKeyBuild } from '@portal-web/shared-api';
import { UIIcon } from '@portal-web/shared-ui';
import { FormEvent, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export default function ModulesAduanPublikForm({ website }) {
  const router = useRouter();
  async function updateUser(url, { arg }: { arg: any }) {
    arg.website_id = website.id;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(arg),
    });
  }

  const { trigger } = useSWRMutation(
    resourceUrlKeyBuild({
      key: 'web_aduan_publik',
      pathQuery: ['sendNew'],
    }),
    updateUser,
    {}
  );
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [isi, setIsi] = useState('');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await trigger({ nama, email, hp, isi });
    router.push('/aduan-publik?page=success');
    return false;
  };
  return (
    <form
      action=""
      onSubmit={submit}
      className="flex items-start flex-col gap-4"
    >
      <div className="bg-primary-200 rounded-lg flex items-start justify-start lg:items-center p-5 gap-4">
        <UIIcon icon="mdi:information-outline" className="w-8 h-8" />
        <span>
          Aduan akan dibalas ke Email atau Nomor HP. Pastikan Email dan Nomor HP
          yang dimasukan dapat dihubungi.
        </span>
      </div>
      <div className="form-control w-full max-w-xl">
        <label className="label" htmlFor="nama">
          <span className="label-text">Nama Lengkap*</span>
        </label>
        <input
          required
          value={nama}
          id="nama"
          name="nama"
          type="text"
          placeholder=""
          className="input input-md focus:input-primary focus:ring-none input-bordered w-full outline-none"
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <div className="form-control w-full max-w-xl">
        <label className="label" htmlFor="email">
          <span className="label-text">Email*</span>
        </label>
        <input
          required
          value={email}
          id="email"
          name="email"
          type="email"
          placeholder=""
          className="input input-md focus:input-primary focus:ring-none input-bordered w-full outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control w-full max-w-xl">
        <label className="label" htmlFor="hp">
          <span className="label-text">Nomor HP*</span>
        </label>
        <input
          required
          value={hp}
          id="hp"
          name="hp"
          type="text"
          placeholder=""
          className="input input-md focus:input-primary focus:ring-none input-bordered w-full outline-none"
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <div className="form-control w-full max-w-xl">
        <label className="label" htmlFor="isi">
          <span className="label-text">Isi Aduan*</span>
        </label>
        <textarea
          required
          id="isi"
          name="isi"
          className="textarea focus:textarea-primary textarea-bordered h-56"
          placeholder="Isi Aduan"
          onChange={(e) => setIsi(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className={clsx('btn btn-primary normal-case', { loading: loading })}
        >
          Kirim Aduan
        </button>
      </div>
    </form>
  );
}
