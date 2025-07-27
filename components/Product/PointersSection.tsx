import { IoMdCheckmark } from "react-icons/io";
import { useProductData } from "../ProductDataContext";

const PointersSection = () => {
  const { data } = useProductData();
  const lang = data?.seo?.title?.includes("IELTS") ? "en" : "bn";
  const pointersSections = data?.sections?.filter((s) => s.type === "pointers") || [];
  if (!pointersSections.length) return null;
  return (
    <section className="mb-8 text-black">
      <h2 className="text-2xl font-semibold mb-4">
        {lang === "en" ? (
          <span className="ml-2 text-black"> What you will learn by doing the course</span>
        ) : (
          <span className="ml-2 text-black">কোর্সটি করে যা শিখবেন</span>
        )}
      </h2>
      <div className="pl-6 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-300 rounded-md p-6">
        {pointersSections.map((pointer) =>
          pointer.values?.map((item, idx) => (
            <div key={pointer.id + "-" + idx} className="flex gap-2">
              <p className="text-xl text-blue-500">
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

export default PointersSection; 