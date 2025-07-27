import ProductPage from "@/components/ProductPage";

export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const params = await searchParams;
  const lang = params?.lang || "en";
  return <ProductPage lang={lang} />;
}
