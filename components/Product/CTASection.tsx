import { useProductData } from "../ProductDataContext";

const CTASection = () => {
  const { data } = useProductData();
  const lang = data?.seo?.title?.includes("IELTS") ? "en" : "bn";
  const ctaText = data?.cta_text;
  if (!ctaText) return null;
  return (
    <section className="mb-8 text-black">
      <div className="">
        <div className="">
          <div className="text-3xl font-bold mb-4">
            <h2 className="text-2xl font-semibold mb-4">
              {lang === "en" ? (
                <span className="ml-2 text-black"> ৳1000</span>
              ) : (
                <span className="ml-2 text-black">৳১০০০</span>
              )}
            </h2>
          </div>
          <button className="w-full inline-block bg-[#1CAB55] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            {ctaText.name || ctaText.text || "Enroll Now"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 