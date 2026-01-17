import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default async function AppleIcon() {
  const logoUrl = 'https://storage.googleapis.com/msgsndr/b8spY0hvhFRzHHxsdJlZ/media/69165fb4890fad61b2da1dc3.png';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: '20%',
        }}
      >
        <img
          src={logoUrl}
          alt="Maia Construction"
          width={160}
          height={160}
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
