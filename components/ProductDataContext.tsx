import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// --- API Response Types (copy from ProductPage.tsx) ---
export interface Medium {
  id: number;
  type: string;
  url: string;
  thumbnail_url?: string;
  title?: string;
  name?: string;
  resource_type?: string;
  resource_value?: string;
}

export interface Checklist {
  id: number;
  text: string;
  color?: string;
  icon?: string;
  list_page_visibility?: boolean;
}

export interface Seo {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

export interface CtaText {
  text: string;
  url: string;
  name?: string;
  value?: string;
}

export interface SectionValue {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  title?: string;
  subtitle?: string;
  icon?: string;
  text?: string;
  color?: string;
  [key: string]: unknown;
}

export interface Section {
  id: number;
  type: string;
  title?: string;
  description?: string;
  items?: (string | Checklist | Medium | Section)[];
  values?: SectionValue[];
  extra?: Record<string, unknown>;
}

export interface Data {
  slug: string;
  id: number;
  title: string;
  description: string;
  media: Medium[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: CtaText;
  sections: Section[];
}

interface ProductDataContextType {
  data: Data | null;
  loading: boolean;
  error: Error | null;
}

const ProductDataContext = createContext<ProductDataContextType | undefined>(undefined);

export const useProductData = () => {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error("useProductData must be used within a ProductDataProvider");
  }
  return context;
};

const API_URL =
  "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course";

export const ProductDataProvider = ({ lang, children }: { lang: string; children: ReactNode }) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}?lang=${lang}`, {
      headers: {
        "X-TENMS-SOURCE-PLATFORM": "web",
        accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product data");
        return res.json();
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [lang]);

  return (
    <ProductDataContext.Provider value={{ data, loading, error }}>
      {children}
    </ProductDataContext.Provider>
  );
}; 