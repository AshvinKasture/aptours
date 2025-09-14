interface TourAboutProps {
  description: string;
}

const TourAbout = ({ description }: TourAboutProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Trek</h2>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default TourAbout;
