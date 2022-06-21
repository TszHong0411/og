import * as React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

export default function Footer() {
  return (
    <footer className='flex items-center justify-center px-4 py-10'>
      <div>
        <p>
          &copy; {new Date().getFullYear()}{' '}
          <UnderlineLink href='https://honghong.me'>小康</UnderlineLink>
        </p>
      </div>
    </footer>
  );
}
