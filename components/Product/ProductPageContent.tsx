import LanguageSwitcher from "../LanguageSwitcher";
import { useProductData } from "../ProductDataContext";
import CTASection from "./CTASection";
import ChecklistSection from "./ChecklistSection";
import CourseDetailsSection from "./CourseDetailsSection";
import FeatureExplanationsSection from "./FeatureExplanationsSection";
import FeaturesSection from "./FeaturesSection";
import InstructorSection from "./InstructorSection";
import PointersSection from "./PointersSection";
import ProductTrailerSection from "./ProductTrailerSection";
import SEOMetadata from "./SEOMetadata";

const ProductPageContent = ({ lang }: { lang: string }) => {
  const { data, loading, error } = useProductData();

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-8 text-red-500">Error: {error.message}</p>
    );
  if (!data) return null;

  return (
    <>
      <SEOMetadata />
      <div className="py-8">
        <div className="sticky top-0 z-50 bg-white">
          <div className="container mx-auto">
            <LanguageSwitcher currentLang={lang} />
          </div>
        </div>

        {/* ProductTrailerSection - Mobile: Row 1, Desktop: Sidebar */}
        <div className="md:hidden">
          <div className="bg-white border border-gray-300 p-2">
            <ProductTrailerSection />
          </div>
        </div>

        {/* Hero Section - Mobile: Row 2, Desktop: Row 1 */}
        <div className="bg-[#060129]">
          <div className="container mx-auto text-white p-12">
            <div className="md:w-4xl py-8">
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
        </div>

        {/* CTA and Checklist - Mobile: Row 3, Desktop: Sidebar */}
        <div className="md:hidden">
          <div className="bg-white border border-gray-300 p-2">
            <CTASection />
            <ChecklistSection />
          </div>
        </div>

        {/* Main Content Grid - Desktop Layout */}
        <div className="container mx-auto text-white">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* Main Content - Mobile: Row 4, Desktop: Left Column */}
            <div className="bg-white p-2 md:p-12 md:col-span-2">
              <InstructorSection />
              <FeaturesSection />
              <PointersSection />
              <FeatureExplanationsSection />
              <CourseDetailsSection />
            </div>

            {/* Desktop Sidebar - Hidden on Mobile */}
            <div className="hidden md:block md:mt-[-30%] bg-white">
              <div className="md:sticky md:top-24 border border-gray-300 p-2">
                <ProductTrailerSection />
                <CTASection />
                <ChecklistSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPageContent;
