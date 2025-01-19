import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Meta, Scripts } from '@tanstack/start';
import * as React from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { seo } from '@/utils/seo';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { useEffect, useRef, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  // errorComponent: (props) => {
  //   return (
  //     <RootDocument>
  //       <DefaultCatchBoundary {...props} />
  //     </RootDocument>
  //   );
  // },
  notFoundComponent: () => <div>Route Not Found</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    const checkReadyState = () => {
      if (document.readyState === 'complete') {
        setIsLoaded(true);
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    };

    checkReadyState();

    document.addEventListener('readystatechange', checkReadyState);

    return () => {
      document.removeEventListener('readystatechange', checkReadyState);
    };
  }, []);
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        <LoadingBar color="#1134a6" ref={loadingBarRef} />
        {!isLoaded ? <div>Loading...</div> : <main>{children}</main>}

        <Toaster />
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
}
