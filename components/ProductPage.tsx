import React from "react";
import Head from "next/head";
import LanguageSwitcher from "./LanguageSwitcher";
import { IoMdCheckmark } from "react-icons/io";

// --- API Response Types ---
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

interface ProductPageProps {
  lang: string;
}

const API_URL =
  "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course";

async function fetchProductData(lang: string) {
  const res = await fetch(`${API_URL}?lang=${lang}`, {
    headers: {
      "X-TENMS-SOURCE-PLATFORM": "web",
      accept: "application/json",
    },
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });
  if (!res.ok) throw new Error("Failed to fetch product data");
  const response = await res.json();
  return response.data; // Extract data from the response
}

interface Instructor {
  id: number;
  name: string;
  bio?: string;
  image?: string;
  [key: string]: unknown;
}

const InstructorSection = ({ instructors }: { instructors: Instructor[] }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-black">
      Course Instructors
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {instructors.map((inst) => (
        <div
          key={inst.id}
          className="flex items-center gap-4 p-5 border border-gray-300 rounded-lg bg-white/60"
        >
          {inst.image && (
            <img
              src={inst.image}
              alt={inst.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <div className="font-bold text-lg">{inst.name}</div>
            {inst.bio && (
              <div className="text-sm text-gray-600">{inst.bio}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ProductTrailerSection = ({ media }: { media: Medium[] }) => {
  const youtube = media.find(
    (m) => m.resource_type === "video" && m.resource_value
  );
  if (!youtube) return null;

  const videoId = youtube.resource_value;
  if (!videoId) return null;

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Course Trailer</h2>
      <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Course Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-64 rounded-lg border"
        />
      </div>
    </section>
  );
};

const FeaturesSection = ({ features }: { features: Section[] }) => {
  if (!features.length) return null;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        How the course is laid out
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#111827] rounded-md p-4">
        {features.map((feature) =>
          feature.values?.map((item, idx) => (
            <div key={feature.id + "-" + idx} className="p-4">
              {item.title && (
                <h3 className="font-semibold text-lg mb-2 text-white">
                  {item.title}
                </h3>
              )}
              {item.subtitle && (
                <p className="text-gray-400">{item.subtitle}</p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const PointersSection = ({ pointers }: { pointers: Section[] }) => {
  if (!pointers.length) return null;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        What you will learn by doing the course
      </h2>
      <div className=" pl-6 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-300 rounded-md p-6">
        {pointers.map((pointer) =>
          pointer.values?.map((item, idx) => (
            <div key={pointer.id + "-" + idx} className="flex gap-2">
              <p className="text-xl  text-blue-500">
                <IoMdCheckmark />
              </p>
              <p className="text-base">{item.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const CourseDetailsSection = ({ details }: { details: Section[] }) => {
  if (!details.length) return null;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
      {details.map((detail) =>
        detail.values?.map((item, idx) => (
          <div key={detail.id + "-" + idx} className="mb-6">
            {item.title && (
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
            )}
            {item.description && (
              <div
                className="prose mt-2"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        ))
      )}
    </section>
  );
};

const ChecklistSection = ({ checklist }: { checklist: Checklist[] }) => {
  if (!checklist.length) return null;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">Course Checklist</h2>
      <div className="grid grid-cols-1 gap-4">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg">
            {item.icon && (
              <img
                src={item.icon}
                alt=""
                className="w-6 h-6 mt-1 flex-shrink-0"
              />
            )}
            <span className="text-base">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTASection = ({ ctaText }: { ctaText?: CtaText }) => {
  if (!ctaText) return null;
  return (
    <section className="mb-8 text-black">
      <div className="">
        <div className="">
          <div className="text-3xl font-bold text-blue-600 mb-4">৳1000</div>
          <button className="w-full inline-block bg-[#1CAB55] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            {ctaText.name || ctaText.text || "Enroll Now"}
          </button>
        </div>
      </div>
    </section>
  );
};

const SEOMetadata = ({ seo }: { seo?: Seo }) => {
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

const FeatureExplanationsSection = ({
  sections,
  lang,
}: {
  sections: Section[];
  lang: string;
}) => {
  if (!sections.length) return null;

  // Section titles
  // const sectionTitle =
  //   lang === "bn"
  //     ? "কোর্স এক্সক্লুসিভ ফিচার"
  //     : "Course Exclusive Feature";

  // Helper to get both Bangla and English for a value
  // const getValueText = (item: any, key: string) => {
  //   if (typeof item[key] === "object" && item[key]) {
  //     return (
  //       <>
  //         <div>{item[key].bn}</div>
  //         <div>{item[key].en}</div>
  //       </>
  //     );
  //   }
  //   return <div>{item[key]}</div>;
  // };

  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        {/* {sectionTitle} */}
        {lang === "bn" ? (
          <span className="ml-2 text-black">Course Exclusive Feature</span>
        ) : (
          <span className="ml-2 text-black">কোর্স এক্সক্লুসিভ ফিচার</span>
        )}
      </h2>
      <div className="grid grid-cols-1 gap-6 border border-gray-300 rounded-lg">
        {sections.map((section) =>
          section.values?.map((item: any, index: number) => (
            <div key={item.id}>
              <div className="p-4 bg-white/60 grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="font-bold text-lg mb-2">
                    {item.title_bn && item.title_en ? (
                      <>
                        <div>{item.title_bn}</div>
                        <div>{item.title_en}</div>
                      </>
                    ) : (
                      <div>{item.title}</div>
                    )}
                  </div>
                  <div className="list-disc pl-5">
                    {item.checklist_bn && item.checklist_en
                      ? item.checklist_bn.map((bn: string, idx: number) => (
                          <li key={idx}>
                            <div>{bn}</div>
                            <div>{item.checklist_en[idx]}</div>
                          </li>
                        ))
                      : item.checklist?.map((text: string, idx: number) => (
                          <li key={idx}>{text}</li>
                        ))}
                  </div>
                </div>
                <div className="w-full h-full">
                  {item.file_url && (
                    <img
                      src={item.file_url}
                      alt={item.title}
                      className="w-[250px] h-[250px] mb-2"
                    />
                  )}
                </div>
              </div>

              {/* Show <hr> if not the last item */}
              {index !== section?.values.length - 1 && (
                <hr className="my-2 mx-4 border-gray-300" />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const ProductPage = async ({ lang }: ProductPageProps) => {
  try {
    const data = await fetchProductData(lang);

    // Debug: Log the API response structure
    console.log("API Response:", data);
    console.log("Sections:", data.sections);

    // Ensure sections array exists
    const sections = data.sections || [];

    // Extract instructors from sections
    const instructorSections = sections.filter(
      (s: Section) => s.type === "instructors"
    );
    // Extract instructor data from values array
    const instructors: Instructor[] = instructorSections.flatMap(
      (s: Section) =>
        s.values
          ?.filter(
            (item: SectionValue) =>
              typeof item === "object" && item !== null && "name" in item
          )
          .map((item: SectionValue) => ({
            id: item.id || Math.random(),
            name: item.name,
            bio: item.description,
            image: item.image,
          })) ?? []
    );

    // Extract features sections
    const featuresSections = sections.filter(
      (s: Section) => s.type === "features"
    );

    // Extract pointers sections
    const pointersSections = sections.filter(
      (s: Section) => s.type === "pointers"
    );

    // Extract course details sections
    const detailsSections = sections.filter((s: Section) => s.type === "about");

    // Extract YouTube video from media
    const youtubeVideo = data.media?.find(
      (m: Medium) => m.resource_type === "video" && m.resource_value
    );

    const featureExplanationsSections = sections.filter(
      (s: Section) => s.type === "feature_explanations"
    );

    return (
      <>
        <SEOMetadata seo={data.seo} />
        <div className="py-8">
          <LanguageSwitcher currentLang={lang} />
          <div className="bg-[#060129] ">
            <div className="container mx-auto text-white p-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {data.title || "IELTS Course"}
              </h1>
              {data.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                  className="prose mb-6"
                />
              )}
            </div>
          </div>
          <div className="container mx-auto text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-12 col-span-2 ">
                {instructors.length > 0 && (
                  <InstructorSection instructors={instructors} />
                )}
                <FeaturesSection features={featuresSections} />
                <PointersSection pointers={pointersSections} />
                <CourseDetailsSection details={detailsSections} />
                <FeatureExplanationsSection
                  sections={featureExplanationsSections}
                  lang={lang}
                />
              </div>

              <div className="border border-gray-300 rounded-lg px-2">
                <ProductTrailerSection media={data.media || []} />
                <CTASection ctaText={data.cta_text} />
                <ChecklistSection checklist={data.checklist || []} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Product
          </h1>
          <p className="text-gray-600">
            Failed to load product information. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default ProductPage;
