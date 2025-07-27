import { useProductData } from "../ProductDataContext";

const InstructorSection = () => {
  const { data } = useProductData();
  const lang = data?.seo?.title?.includes("IELTS") ? "en" : "bn";
  const instructorSections = data?.sections?.filter((s) => s.type === "instructors") || [];
  const instructors = instructorSections.flatMap((s) =>
    s.values?.filter((item) => typeof item === "object" && item !== null && "name" in item)
      .map((item) => ({
        id: item.id || Math.random(),
        name: item.name,
        bio: item.description,
        image: item.image,
      })) ?? []
  );
  if (!instructors.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        {lang === "en" ? (
          <span className="ml-2 text-black">Course Instructors</span>
        ) : (
          <span className="ml-2 text-black">কোর্স ইন্সট্রাক্টর</span>
        )}
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
              <div className="font-bold text-lg text-black">{inst.name}</div>
              {inst.bio && (
                <div
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: inst.bio }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstructorSection; 