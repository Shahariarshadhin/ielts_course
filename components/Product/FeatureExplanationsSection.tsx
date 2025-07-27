import { useProductData } from "../ProductDataContext";

const FeatureExplanationsSection = () => {
  const { data } = useProductData();
  const lang = data?.seo?.title?.includes("IELTS") ? "en" : "bn";
  const featureExplanationsSections = data?.sections?.filter((s) => s.type === "feature_explanations") || [];
  if (!featureExplanationsSections.length) return null;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        {lang === "en" ? (
          <span className="ml-2 text-black">Course Exclusive Feature</span>
        ) : (
          <span className="ml-2 text-black">কোর্স এক্সক্লুসিভ ফিচার</span>
        )}
      </h2>
      <div className="grid grid-cols-1 gap-6 border border-gray-300 rounded-lg">
        {featureExplanationsSections.map((section) =>
          section.values?.map((item, index) => (
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
                      ? item.checklist_bn.map((bn, idx) => (
                          <li key={idx}>
                            <div>{bn}</div>
                            <div>{item.checklist_en[idx]}</div>
                          </li>
                        ))
                      : item.checklist?.map((text, idx) => (
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

export default FeatureExplanationsSection; 