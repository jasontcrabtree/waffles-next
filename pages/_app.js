import '../styles/index.css';
import Head from 'next/head';
// import makeServer from '../mirage/server';

// makeServer();

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Recipes</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="sm:pt-8 h-screen w-screen overflow-y-hidden bg-cool-gray-900">
        <div
          className="bg-gray-700 px-8 pb-16 mx-auto overflow-hidden shadow-xl sm:rounded overflow-y-auto "
          style={{ maxWidth: '720px', height: '814px' }}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
