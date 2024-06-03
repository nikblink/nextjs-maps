import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <MapWithNoSSR />
    </div>
  );
}
