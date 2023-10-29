import { AppRouter } from '$/server/trpcRouter';
import { createTRPCReact } from '@trpc/react-query';

export function getBaseUrl():string {
  if(typeof window !== 'undefined')
    return '';

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// export const trpc = createTRPCNext<AppRouter>({
//   config(opts) {
//     const { ctx } = opts;
//     if (typeof window !== 'undefined') {
//       // during client requests
//       return {
//         // transformer: superjson, // optional - adds superjson serialization
//         links: [
//           httpBatchLink({
//             url: '/api/trpc',
//           }),
//         ],
//       };
//     }

//     return {
//     //   transformer: superjson, // optional - adds superjson serialization
//       links: [
//         httpBatchLink({
//           // The server needs to know your app's full url
//           url: `${getBaseUrl()}/api/trpc`,
//           /**
//            * Set custom request headers on every request from tRPC
//            * @link https://trpc.io/docs/v10/header
//            */
//           headers() {
//             if (!ctx?.req?.headers) {
//               return {};
//             }
//             // To use SSR properly, you need to forward client headers to the server
//             // This is so you can pass through things like cookies when we're server-side rendering
//             return {
//               cookie: ctx.req.headers.cookie,
//             };
//           },
//         }),
//       ],
//     };
//   },
//   ssr: true,
// });


export const trpc = createTRPCReact<AppRouter>()