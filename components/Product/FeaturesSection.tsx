import { useProductData } from "../ProductDataContext";

const FeaturesSection = () => {
  const { data } = useProductData();
  const lang = data?.seo?.title?.includes("IELTS") ? "en" : "bn";
  const featuresSections = data?.sections?.filter((s) => s.type === "features") || [];
  if (!featuresSections.length) return null;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        {lang === "en" ? (
          <span className="ml-2 text-black">How the course is laid out</span>
        ) : (
          <span className="ml-2 text-black">কোর্সটি যেভাবে সাজানো হয়েছে</span>
        )}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#111827] rounded-md p-4">
        {featuresSections.map((feature) =>
          feature.values?.map((item, idx) => (
            <div key={feature.id + "-" + idx} className="p-4">
              <div className="flex gap-4">
                <div>
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.title || "Feature Icon"}
                      className="w-16 h-12 mb-4"
                    />
                  )}
                </div>
                <div className="col-span-3">
                  {item.title && (
                    <h3 className="font-semibold text-lg mb-2 text-white">
                      {item.title}
                    </h3>
                  )}
                  {item.subtitle && (
                    <p className="text-gray-400">{item.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default FeaturesSection; 