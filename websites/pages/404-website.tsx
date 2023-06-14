import Link from 'next/link';
import React from 'react';
import { directusInstance } from '@portal-web/shared-api/server';
export function getServerSideProps({req}){
  return {
    props:{
      host: req.headers.host
    }
  }
}
export default function Page404Website({host}) {
  return (
    <main className="overflow-hidden h-screen min-h-screen">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <img
          src="/images/404.svg"
          width="295"
          height="178"
          alt="halaman tidak ditemukan"
        />
        <div className="flex flex-col gap-1 justify-center">
          <h1 className="text-center text-primary-dark font-lora text-[21px] leading-[34px] font-bold">
            {host}
          </h1>
          <h1 className="text-center text-primary-dark font-lora text-[21px] leading-[34px] font-bold">
            Website tidak ditemukan
          </h1>
        </div>
      </div>
    </main>
  );
}
