import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  const logoUrl = 'https://storage.googleapis.com/msgsndr/b8spY0hvhFRzHHxsdJlZ/media/69165fb4890fad61b2da1dc3.png';

  const imageData = await fetch(logoUrl).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <img
          src={logoUrl}
          alt="Maia Construction"
          width={32}
          height={32}
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
