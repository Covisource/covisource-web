import Head from "next/head";

const MetaData = ({ title, description, url, keywords }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:image" content="https://github.com/Covisource/covisource/raw/master/assets/covisource.png?raw=true" />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content="CoviSource" />
    
    <meta name="twitter:card" content="website" />
    <meta name="twitter:image" content="https://github.com/Covisource/covisource/raw/master/assets/covisource.png?raw=true" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@covisourceindia" />

    <meta name="keywords" content={keywords} />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href={url} />
  </Head>
);

export default MetaData;
