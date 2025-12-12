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
        return 'GRAND GOLD AWARD';
      case 'GOLD':
        return 'GOLD AWARD';
      case 'SILVER':
        return 'SILVER AWARD';
      case 'BRONZE':
        return 'BRONZE AWARD';
      case 'NONE':
        return 'CERTIFICATE OF RECOGNITION';
      default:
        return 'GOLD AWARD';
    }
  };

  const getTemplateColors = () => {
    switch (awardLevel) {
      case 'GRAND_GOLD':
        return {
          bg: 'from-yellow-50 to-yellow-100',
          border: 'border-yellow-300',
          badge: 'from-yellow-400 to-yellow-600',
          icon: 'text-yellow-900',
          textGradient: 'from-yellow-700 via-yellow-600 to-yellow-500',
        };
      case 'GOLD':
        return {
          bg: 'from-amber-50 to-amber-100',
          border: 'border-amber-300',
          badge: 'from-amber-400 to-amber-600',
          icon: 'text-white',
          textGradient: 'from-amber-600 via-amber-500 to-amber-400',
        };
      case 'SILVER':
        return {
          bg: 'from-zinc-100 to-zinc-200',
          border: 'border-zinc-300',
          badge: 'from-zinc-300 to-zinc-500',
          icon: 'text-white',
          textGradient: 'from-zinc-600 via-zinc-500 to-zinc-400',
        };
      case 'BRONZE':
        return {
          bg: 'from-orange-50 to-orange-100',
          border: 'border-orange-300',
          badge: 'from-orange-400 to-orange-600',
          icon: 'text-orange-900',
          textGradient: 'from-orange-600 via-orange-500 to-orange-400',
        };
      case 'NONE':
        return {
          bg: 'from-zinc-50 to-zinc-100',
          border: 'border-zinc-200',
          badge: 'from-zinc-300 to-zinc-400',
          icon: 'text-zinc-700',
          textGradient: 'from-zinc-600 via-zinc-500 to-zinc-400',
        };
      default:
        return {
          bg: 'from-amber-50 to-amber-100',
          border: 'border-amber-300',
          badge: 'from-amber-400 to-amber-600',
          icon: 'text-white',
          textGradient: 'from-amber-600 via-amber-500 to-amber-400',
        };
    }
  };

  const colors = getTemplateColors();
  const formattedDate = new Date(issueDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-100 p-4">
      <div className="w-full max-w-2xl aspect-[1/1.414] bg-white rounded-xl shadow-2xl overflow-hidden relative">
        <div className={`absolute inset-4 border-4 ${colors.border} rounded-lg p-8 flex flex-col items-center bg-gradient-to-b ${colors.bg}`}>
          {/* Decorative Corners */}
          <div className={`absolute top-2 left-2 w-16 h-16 border-l-4 border-t-4 ${colors.border} rounded-tl-lg`}></div>
          <div className={`absolute top-2 right-2 w-16 h-16 border-r-4 border-t-4 ${colors.border} rounded-tr-lg`}></div>
          <div className={`absolute bottom-2 left-2 w-16 h-16 border-l-4 border-b-4 ${colors.border} rounded-bl-lg`}></div>
          <div className={`absolute bottom-2 right-2 w-16 h-16 border-r-4 border-b-4 ${colors.border} rounded-br-lg`}></div>

          {/* Header */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <iconify-icon icon="lucide:award" width="16" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <span className="text-lg font-semibold text-zinc-800 tracking-tight">Tastecert</span>
            </div>
            <p className="text-xs text-zinc-500 tracking-widest uppercase">International Food Quality Awards</p>
          </div>

          {/* Award Badge */}
          <div className="relative mb-4">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${colors.badge} flex items-center justify-center shadow-lg`}>
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${colors.badge} flex items-center justify-center border-2 border-white/30`}>
                <iconify-icon icon="lucide:award" width="40" className={colors.icon} style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
          </div>

          {/* Certificate Title */}
          <p className="text-sm text-zinc-500 tracking-widest uppercase mb-1">Certificate of</p>
          <h2 className={`text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent`}>
            {getAwardTitle()}
          </h2>

          {/* Recipient */}
          <p className="text-sm text-zinc-500 mb-1">Awarded to</p>
          <h3 className="text-xl font-semibold text-zinc-900 text-center mb-1">
            {productName}
          </h3>
          <p className="text-sm text-zinc-600 mb-1">
            by {producerName}
          </p>
          <p className="text-xs text-zinc-400 mb-4">
            {categoryName}
          </p>

          {/* Score Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm border border-amber-200 mb-4">
            <iconify-icon icon="lucide:star" width="16" className="text-amber-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
            <span className="text-sm font-semibold text-zinc-800">
              Score: {score.toFixed(1)}/10
            </span>
          </div>

          {/* Recognition Message */}
          <p className="text-sm text-zinc-600 text-center max-w-md mb-6 leading-relaxed">
            In recognition of exceptional quality and excellence in artisan food production.
          </p>

          {/* Signatures */}
          <div className="flex items-center justify-center gap-12 mb-4">
            <div className="text-center">
              <div className="w-20 h-12 border-b-2 border-zinc-300 mb-2 flex items-center justify-center">
                <span className="text-zinc-400 italic text-lg font-serif">J. Smith</span>
              </div>
              <p className="text-xs text-zinc-500">Chief Judge</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center border-2 border-zinc-200">
                <iconify-icon icon="lucide:stamp" width="28" className="text-zinc-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Official Seal</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-12 border-b-2 border-zinc-300 mb-2 flex items-center justify-center">
                <span className="text-zinc-400 italic text-lg font-serif">M. Chen</span>
              </div>
              <p className="text-xs text-zinc-500">Director</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-amber-200">
            <div className="text-left">
              <p className="text-xs text-zinc-500">Issue Date</p>
              <p className="text-sm font-medium text-zinc-700">
                {formattedDate}
              </p>
            </div>
            <div className="w-16 h-16 bg-white p-1 rounded border border-zinc-200">
              <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                <iconify-icon icon="lucide:qr-code" width="32" className="text-zinc-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500">Certificate ID</p>
              <p className="text-sm font-medium text-zinc-700">
                {certificateNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
