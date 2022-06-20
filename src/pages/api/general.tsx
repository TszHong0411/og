import { withOGImage } from 'next-api-og-image';

import { BgPattern } from '@/lib/BgPattern';

enum QueryParams {
  'title',
  'theme',
  'size',
  'description',
}

export default withOGImage<'query', keyof typeof QueryParams>({
  template: {
    html: async ({ title, theme, size, description }) => {
      return `
        <html lang="zh-TW">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${getStyle({ title, theme, size, description })}
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <title>API</title>
          </head>
          <body>
            <div class="container">
              <img class="social_img" src="https://honghong.me/static/images/logo/logo-black.png">
              <h1 class="title">${title ?? 'ProjectName'}</h1>
              <p class="description">${description ?? 'description'}</p>
            </div>
          </body>
      </html>
      `;
    },
  },
});

const getStyle = (
  query: Record<keyof typeof QueryParams, string | string[]>
) => `
    <style>
      *,
      *::before,
      *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Inter', sans-serif;
      }

      .container {
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background: ${
          query.theme === 'dark' ? '#151515' : '#fff'
        } url('${BgPattern}');
        color: ${query.theme === 'dark' ? 'white' : 'black'};

        text-align: center;
        padding: 4rem 3rem;
        gap: 20px;
      }

      h1 {
        font-size: 1.5rem;
        font-size: 3.5rem;
        line-height: 1.1;
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
        color: ${query.theme === 'dark' ? '#F3F4F6' : '#000000'};
        font-weight: 600;
        font-size: 2rem;
      }

      .social_img {
        border-radius: 100%;
        width: ${query.size ?? '100'}px;
        height: ${query.size ?? '100'}px;
      }
    </style>
  `;
