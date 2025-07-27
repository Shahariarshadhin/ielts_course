import { useProductData } from "../ProductDataContext";

const ChecklistSection = () => {
  const { data } = useProductData();
  const checklist = data?.checklist || [];
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

export default ChecklistSection; 