'use client';

interface CertificateTemplateProps {
  awardLevel: 'GRAND_GOLD' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
  productName: string;
  producerName: string;
  categoryName: string;
  score: number;
  issueDate: string;
  certificateNumber: string;
}

export default function CertificateTemplate({
  awardLevel,
  productName,
  producerName,
  categoryName,
  score,
  issueDate,
  certificateNumber,
}: CertificateTemplateProps) {
  const getAwardTitle = () => {
    switch (awardLevel) {
      case 'GRAND_GOLD':
        return 'Grand Gold Award';
      case 'GOLD':
        return 'Gold Award';
      case 'SILVER':
        return 'Silver Award';
      case 'BRONZE':
        return 'Bronze Award';
      case 'NONE':
        return 'Recognition';
      default:
        return 'Gold Award';
    }
  };

  const formattedDate = new Date(issueDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-100 p-4 md:p-8">
      {/* Certificate Container */}
      <div className="relative paper-texture w-full aspect-[1/1.3] md:aspect-[1/1.4] max-w-2xl mx-auto p-6 md:p-8 lg:p-12 flex flex-col intricate-border shadow-xl">
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <iconify-icon icon="lucide:award" width="200" height="200"></iconify-icon>
        </div>

        {/* Certificate Header */}
        <div className="text-center border-b border-stone-200 pb-4 relative z-10">
          <div className="flex justify-center mb-2">
            <iconify-icon icon="lucide:award" className="text-stone-800" width="32"></iconify-icon>
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-stone-900 uppercase tracking-widest font-semibold mb-2">Certificate</h2>
          <p className="font-serif text-sm text-stone-500 italic">of Quality & Authenticity</p>
        </div>

        {/* Certificate Body */}
        <div className="flex-grow flex flex-col justify-center text-center py-4 relative z-10 space-y-3 md:space-y-4">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">This document certifies that</p>
          
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-stone-900 font-medium italic leading-tight px-4">
            {productName}
          </h3>
          
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400 font-medium">Produced by {producerName}</p>
          
          <div className="text-xs md:text-sm text-stone-600 font-light leading-relaxed px-4 max-w-lg mx-auto">
            has successfully met the rigorous standards of the Tastecert Quality Institute, achieving a verified score of <span className="font-semibold text-stone-800">{score.toFixed(1)}/10</span> in the {categoryName} category, earning the distinction of <span className="font-semibold text-stone-800">{getAwardTitle()}</span>.
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="mt-auto pt-4 border-t border-stone-200 relative z-10">
          <div className="grid grid-cols-2 gap-8 items-end mb-6">
            <div className="text-center">
              <div className="h-12 flex items-end justify-center mb-1">
                <span className="font-signature text-2xl md:text-3xl text-stone-800 transform -rotate-6 block">James Miller</span>
              </div>
              <div className="h-px w-full bg-stone-300"></div>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 mt-1">Director of Evaluation</p>
            </div>
            <div className="text-center">
              <div className="h-12 flex items-end justify-center mb-1">
                <span className="font-signature text-2xl md:text-3xl text-stone-800 block">Elena Ross</span>
              </div>
              <div className="h-px w-full bg-stone-300"></div>
              <p className="text-[9px] uppercase tracking-wider text-stone-400 mt-1">Compliance Officer</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[9px] text-stone-400 uppercase tracking-wide">Issue Date</span>
              <span className="text-xs md:text-sm text-stone-800 font-medium">{formattedDate}</span>
            </div>
            
            {/* Gold Seal */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full gold-foil flex items-center justify-center shadow-lg relative">
              <div className="absolute inset-1 border border-white/30 rounded-full"></div>
              <iconify-icon icon="lucide:ribbon" className="text-white/90 drop-shadow-md" width="32"></iconify-icon>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[9px] text-stone-400 uppercase tracking-wide">Registration No.</span>
              <span className="font-mono text-xs md:text-sm text-stone-800 font-medium">{certificateNumber}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
