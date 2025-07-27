import { useProductData } from "../ProductDataContext";

const ProductTrailerSection = () => {
  const { data } = useProductData();
  const media = data?.media || [];
  const youtube = media.find(
    (m) => m.resource_type === "video" && m.resource_value
  );
  if (!youtube) return null;
  const videoId = youtube.resource_value;
  if (!videoId) return null;
  return (
    <section className="mb-8">
      <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Course Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-64"
        />
      </div>
    </section>
  );
};

export default ProductTrailerSection;
