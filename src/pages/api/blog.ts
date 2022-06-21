import { NextApiRequest, NextApiResponse } from 'next';

import { BgPattern } from '@/lib/BgPattern';
import { isDev } from '@/lib/constants';
import getOgImage from '@/lib/getOgImage';

export default async function BlogAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, theme, description, size } = req.query;

  const html = `
    <html lang="zh-TW">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style>
          *,
          *::before,
          *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Noto Sans TC',  sans-serif;
          }
          .container {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            background: ${
              theme === 'dark' ? '#151515' : '#fff'
            } url('${BgPattern}');
            color: ${theme === 'dark' ? 'white' : 'black'};
            text-align: center;
            padding: 4rem 3rem;
          }
          .top {
            width: 100%;
            height: 80px;
          }
          h1 {
            font-size: 1.5rem;
            font-size: 3.5rem;
          }
          .title {
            background-image: linear-gradient(to top right, #FF416C, #FF4B2B);
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            font-weight: 600;
            font-size: 3.5rem;
          }
          .description {
            color: ${theme === 'dark' ? '#F3F4F6' : '#000000'};
            font-weight: 600;
            font-size: 2rem;
          }
          .social {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          }
          .social_left {
            display: flex;
            flex-direction: row;
            gap: 1.5rem;
            align-items: center;
          }
          .social_img {
            width: ${size ?? '100'}px;
            height: ${size ?? '100'}px;
            border-radius: 100%;
          }
          .name, .instagram, .website {
            font-size: 1.8rem;
            font-weight: 600;
            color: ${theme === 'dark' ? '#F3F4F6' : '#000000'};
          }
        </style>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <title>API</title>
      </head>
      <body>
        <div class="container">
          <div class="top">
            <div class="social_left">
              <img
                class="social_img"
                src="https://honghong.me/static/images/logo/logo-black.png"
              />
              <span class="name">小康</span>
            </div>
          </div>
          <div>
            <h1 class="title">${title ?? 'Blog Title'}</h1>
            <p class="description">${description ?? 'description'}</p>
          </div>
          <div class="social">
            <div>
              <p class="website">honghong.me</p>
            </div>
            <div>
              <p class="instagram">@tszhong0411</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const result = await getOgImage(html);

  res.setHeader('Content-Type', isDev ? `text/html` : 'image/png');
  res.setHeader('Cache-Control', 'max-age 3600, must-revalidate');

  res.write(result);
  res.status(200).end();
}
