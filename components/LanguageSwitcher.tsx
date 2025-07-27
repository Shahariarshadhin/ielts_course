"use client";


interface LanguageSwitcherProps {
  currentLang: string;
}

const LanguageSwitcher = ({ currentLang }: LanguageSwitcherProps) => {
  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.location.href = url.toString();
  };

  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={toggleLang}
        className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
      >
        {currentLang === 'en' ? 'বাংলা' : 'English'}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 