import { ProductDataProvider } from "../ProductDataContext";
import ProductPageContent from "./ProductPageContent";

const ProductPageContainer = ({ lang }: { lang: string }) => (
  <ProductDataProvider lang={lang}>
    <ProductPageContent lang={lang} />
  </ProductDataProvider>
);

export default ProductPageContainer;
