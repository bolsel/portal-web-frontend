import Link from 'next/link';
import React from 'react';
import { directusInstance } from '@portal-web/shared-api/server';
export default function Page500() {
  return (
    <main className="overflow-hidden h-screen min-h-screen">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img
          src="/images/500.svg"
          width="295"
          height="178"
          alt="halaman tidak ditemukan"
        />
        <div className="flex flex-col gap-1 justify-center">
          <h1 className="text-center  text-primary-dark font-lora text-[21px] leading-[34px] font-bold">
            Terjadi Kesalahan
          </h1>
          <p className="text-center font-lato text-sm leading-6 ">
            Terjadi kesalahan pada server, mohon mencoba kembali beberapa saat.
          </p>
        </div>
        <Link href="/" tabIndex={-1}>
          <button className="btn btn-primary text-white">
            Kembali Ke Beranda
          </button>
        </Link>
      </div>
    </main>
  );
}
