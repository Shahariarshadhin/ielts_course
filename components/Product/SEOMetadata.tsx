import Head from "next/head";
import { useProductData } from "../ProductDataContext";

const SEOMetadata = () => {
  const { data } = useProductData();
  const seo = data?.seo;
  if (!seo) return null;
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Head>
  );
};

export default SEOMetadata; 