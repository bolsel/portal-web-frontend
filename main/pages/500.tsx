import Link from 'next/link';
import React from "react";
import Head from "next/head";
import PageHeadContainer from "../components/pages/head-container";

export default function Custom404() {
  return (
    <main className="overflow-hidden">
      <Head>
        <title>Terjadi Kesalahan</title>
      </Head>
      <PageHeadContainer>
          <img
            src="/images/500.svg"
            width="295"
            height="178"
            alt="Terjadi kesalahan"
          />
          <div className="flex flex-col gap-1 justify-center">
            <h1 className="text-center  text-primary-dark font-lora text-[21px] leading-[34px] font-bold">
              Terjadi kesalahan.
            </h1>
            <p className="text-center font-lato text-sm leading-6 ">
              Terjadi kesalahan pada server, mohon mencoba kembali beberapa
              saat.
            </p>
          </div>
          <Link href="/" tabIndex={-1}>
            <button className="btn btn-primary text-white">
              Kembali Ke Beranda
            </button>
          </Link>
      </PageHeadContainer>
    </main>
  );
}
