import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Head>
        <title>Sentinel Network</title>
      </Head>
      <div className="text-zinc-800 font-mono text-[10px] uppercase tracking-[0.5em] select-none">
        Uplink Established.
      </div>
    </div>
  );
}
