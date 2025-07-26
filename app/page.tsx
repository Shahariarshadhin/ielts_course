import ProductPage from "@/components/ProductPage";

export default function Home({ searchParams }: { searchParams: { lang?: string } }) {
  const lang = searchParams?.lang || "en";
  return <ProductPage lang={lang} />;
}
