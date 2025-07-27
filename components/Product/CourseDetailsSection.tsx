import { useProductData } from "../ProductDataContext";

const CourseDetailsSection = () => {
  const { data } = useProductData();
  const lang = data?.seo?.title?.includes("IELTS") ? "en" : "bn";
  const detailsSections = data?.sections?.filter((s) => s.type === "about") || [];
  if (!detailsSections.length || !detailsSections[0]?.values?.length) return null;
  const values = detailsSections[0].values;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        {lang === "en" ? (
          <span className="ml-2 text-black">Course Details</span>
        ) : (
          <span className="ml-2 text-black">কোর্স সম্পর্কে বিস্তারিত</span>
        )}
      </h2>
      <div className="space-y-4 border border-gray-300 rounded-lg p-4">
        {values.map((item, idx) => (
          <details
            key={idx}
            open={idx === 0}
            className="border-b border-dashed"
          >
            <summary className="cursor-pointer p-4 font-medium transition">
              <span
                dangerouslySetInnerHTML={{
                  __html: item.title || `Section ${idx + 1}`,
                }}
              />
            </summary>
            <div className="p-4 bg-white">
              {item.description && (
                <div
                  className="prose mt-2"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

export default CourseDetailsSection; 