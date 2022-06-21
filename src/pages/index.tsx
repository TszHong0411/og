import Image from 'next/image';
import queryString from 'query-string';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { GeneralQueryEnum } from '@/lib/types';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

type Query = Record<keyof typeof GeneralQueryEnum | 'ogType', string>;

export default function IndexPage() {
  const [link, setLink] = React.useState(
    'https://og.honghong.me/api/general?theme=dark'
  );
  const [imgLink, setImgLink] = React.useState(
    'https://og.honghong.me/api/general?theme=dark'
  );

  const [select, setSelect] = React.useState<string>('general');

  //#region  //*=========== Forms ===========
  const methods = useForm<Query>({
    mode: 'onTouched',
    defaultValues: {
      theme: 'dark',
    },
  });
  const { handleSubmit, watch } = methods;
  //#endregion  //*======== Forms ===========

  //#region  //*=========== Show live change ===========
  const formData = watch();
  React.useEffect(() => {
    const { ogType, ...rest } = formData;
    const qurl = queryString.stringifyUrl(
      {
        url: `https://og.honghong.me/api/${ogType}`,
        query: { ...rest },
      },
      {
        skipEmptyString: true,
      }
    );

    setLink(qurl);
  }, [formData]);
  //#endregion  //*======== Show live change ===========

  //#region  //*=========== Submit ===========
  const onSubmit: SubmitHandler<Query> = () => {
    setImgLink(link);
  };
  //#endregion  //*======== Submit ===========

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
  };

  return (
    <Layout>
      <Seo />
      <main>
        <section>
          <div className='layout min-h-screen py-20'>
            <h1>OG Image generator</h1>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid items-center gap-8 md:grid-cols-[2fr,3fr]'>
                  <div className='mt-8 flex flex-col gap-3 md:max-w-sm'>
                    <SelectInput
                      id='ogType'
                      label='OG Image type'
                      helperText='API type routes'
                      onChange={selectHandler}
                    >
                      <option value='general'>general</option>
                      <option value='blog'>blog</option>
                    </SelectInput>
                    <Input id='title' label='Title' />
                    <Input id='description' label='Description' />
                    <Input id='logo' label='Logo Links' />
                    <div className='flex gap-2'>
                      <Input
                        id='size'
                        label='Logo size'
                        helperText='Default: 100px'
                      />
                    </div>
                    <SelectInput id='theme' label='Theme'>
                      <option value='dark'>dark</option>
                      <option value='light'>light</option>
                    </SelectInput>
                    {select === 'blog' && (
                      <>
                        <Input
                          id='name'
                          label='Name'
                          helperText='Default: 小康'
                        />
                        <Input
                          id='website'
                          label='Personal website url'
                          helperText='Default: honghong.me'
                        />
                        <Input
                          id='username'
                          label='Instagram username'
                          helperText='Default: tszhong0411'
                        />
                      </>
                    )}
                    <Button
                      variant='dark'
                      type='submit'
                      className='justify-center'
                    >
                      Generate
                    </Button>
                  </div>
                  <div>
                    <Image
                      key={imgLink}
                      src={imgLink}
                      className='w-full bg-gray-500'
                      alt=''
                      width='1200'
                      height='630'
                    />
                    <p className='mt-2 break-all text-sm text-gray-600'>
                      {link}
                    </p>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </section>
      </main>
    </Layout>
  );
}
