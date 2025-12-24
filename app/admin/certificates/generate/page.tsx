'use client';

import { useState } from 'react';

export default function CertificateTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('gold');

  const templates = [
    { 
      value: 'grand-gold', 
      label: 'Grand Gold', 
      range: '9.0+', 
      bg: 'from-yellow-50 to-yellow-100', 
      border: 'border-yellow-300', 
      badge: 'from-yellow-400 to-yellow-600', 
      icon: 'text-yellow-900',
      awardTitle: 'GRAND GOLD AWARD'
    },
    { 
      value: 'gold', 
      label: 'Gold', 
      range: '8.0 - 8.9', 
      bg: 'from-gold-50 to-gold-100', 
      border: 'border-gold-300', 
      badge: 'from-gold-400 to-gold-600', 
      icon: 'text-white',
      awardTitle: 'GOLD AWARD'
    },
    { 
      value: 'silver', 
      label: 'Silver', 
      range: '7.0 - 7.9', 
      bg: 'from-stone-100 to-stone-200', 
      border: 'border-stone-300', 
      badge: 'from-stone-300 to-stone-500', 
      icon: 'text-white',
      awardTitle: 'SILVER AWARD'
    },
    { 
      value: 'bronze', 
      label: 'Bronze', 
      range: '6.0 - 6.9', 
      bg: 'from-orange-50 to-orange-100', 
      border: 'border-orange-300', 
      badge: 'from-orange-400 to-orange-600', 
      icon: 'text-orange-900',
      awardTitle: 'BRONZE AWARD'
    },
  ];

  const selectedTemplateData = templates.find(t => t.value === selectedTemplate) || templates[1];
  const colors = selectedTemplateData;

  return (
    <div className="flex h-screen">
      {/* Header */}
      <div className="fixed top-0 left-60 right-0 z-30">
        <header className="bg-white border-b border-stone-200/80">
          <div className="flex items-center justify-between px-8 h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-base font-semibold text-stone-900">Certificate Templates</h1>
              <span className="px-2 py-0.5 text-xs font-medium text-gold-700 bg-gold-50 rounded-full">Preview</span>
            </div>
          </div>
        </header>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 pt-14">
        {/* Left Panel - Template Selection */}
        <div className="w-96 border-r border-stone-200/80 bg-white overflow-y-auto">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-stone-900 mb-1">Available Templates</h2>
            <p className="text-xs text-stone-500 mb-6">Select a template to preview</p>

            {/* Template Selection */}
            <div className="space-y-3">
              {templates.map((template) => (
                <label key={template.value} className="cursor-pointer block">
                  <input
                    type="radio"
                    name="template"
                    value={template.value}
                    checked={selectedTemplate === template.value}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="sr-only peer"
                  />
                  <div className={`p-4 border-2 rounded-xl transition-all ${
                    selectedTemplate === template.value
                      ? 'border-gold-500 bg-gold-50/50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${template.bg} flex items-center justify-center flex-shrink-0`}>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${template.badge} flex items-center justify-center`}>
                          <iconify-icon icon="lucide:award" width="20" className={template.icon} style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-stone-900">{template.label}</p>
                        <p className="text-xs text-stone-500">Score Range: {template.range}</p>
                      </div>
                      {selectedTemplate === template.value && (
                        <iconify-icon icon="lucide:check-circle" width="20" className="text-gold-600" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Template Info */}
            <div className="mt-6 p-4 bg-stone-50 rounded-lg border border-stone-200">
              <h3 className="text-xs font-semibold text-stone-900 mb-2">Template Information</h3>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span className="text-stone-500">Award Level:</span>
                  <span className="font-medium">{selectedTemplateData.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Score Range:</span>
                  <span className="font-medium">{selectedTemplateData.range}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Award Title:</span>
                  <span className="font-medium">{selectedTemplateData.awardTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Certificate Preview */}
        <div className="flex-1 bg-stone-100 overflow-y-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-medium text-stone-600">Template Preview</span>
            </div>
          </div>

          {/* Certificate Preview */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl aspect-[1/1.414] bg-white rounded-xl shadow-2xl overflow-hidden relative">
              <div className={`absolute inset-4 border-4 ${colors.border} lg:p-24 rounded-lg flex flex-col items-center bg-gradient-to-b ${colors.bg}`}>
                
                {/* Decorative Corners */}
                <div className={`absolute top-2 left-2 w-16 h-16 border-l-4 border-t-4 ${colors.border} rounded-tl-lg`}></div>
                <div className={`absolute top-2 right-2 w-16 h-16 border-r-4 border-t-4 ${colors.border} rounded-tr-lg`}></div>
                <div className={`absolute bottom-2 left-2 w-16 h-16 border-l-4 border-b-4 ${colors.border} rounded-bl-lg`}></div>
                <div className={`absolute bottom-2 right-2 w-16 h-16 border-r-4 border-b-4 ${colors.border} rounded-br-lg`}></div>

                {/* Header */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <iconify-icon icon="lucide:award" width="16" className="text-white" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <span className="text-lg font-semibold text-stone-800 tracking-tight">Tastecert</span>
                  </div>
                  <p className="text-xs text-stone-500 tracking-widest uppercase">International Food Quality Awards</p>
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
                <p className="text-sm text-stone-500 tracking-widest uppercase mb-1">Certificate of</p>
                <h2 className={`text-3xl font-bold tracking-tight mb-4 ${
                  selectedTemplate === 'grand-gold' ? 'text-yellow-700' :
                  selectedTemplate === 'gold' ? 'text-gold-700' :
                  selectedTemplate === 'silver' ? 'text-stone-700' :
                  'text-orange-700'
                }`}>
                  {selectedTemplateData.awardTitle}
                </h2>

                {/* Recipient */}
                <p className="text-sm text-stone-500 mb-1">Awarded to</p>
                <h3 className="text-xl font-semibold text-stone-900 text-center mb-1">
                  Sample Product Name
                </h3>
                <p className="text-sm text-stone-600 mb-1">
                  by Producer Company Name
                </p>
                <p className="text-xs text-stone-400 mb-4">
                  Product Category
                </p>

                {/* Score Badge */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm border border-gold-200 mb-4">
                  <iconify-icon icon="lucide:star" width="16" className="text-gold-500" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                  <span className="text-sm font-semibold text-stone-800">
                    Score: 8.5/10
                  </span>
                </div>

                {/* Recognition Message */}
                <p className="text-sm text-stone-600 text-center max-w-md mb-6 leading-relaxed">
                  In recognition of exceptional quality and excellence in artisan food production.
                </p>

                {/* Signatures */}
                <div className="flex items-center justify-center gap-12 mb-4">
                  <div className="text-center">
                    <div className="w-20 h-12 border-b-2 border-stone-300 mb-2 flex items-center justify-center">
                      <span className="text-stone-400 italic text-lg font-serif">J. Smith</span>
                    </div>
                    <p className="text-xs text-stone-500">Chief Judge</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center border-2 border-stone-200">
                      <iconify-icon icon="lucide:stamp" width="28" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">Official Seal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-12 border-b-2 border-stone-300 mb-2 flex items-center justify-center">
                      <span className="text-stone-400 italic text-lg font-serif">M. Chen</span>
                    </div>
                    <p className="text-xs text-stone-500">Director</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-gold-200">
                  <div className="text-left">
                    <p className="text-xs text-stone-500">Issue Date</p>
                    <p className="text-sm font-medium text-stone-700">
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-white p-1 rounded border border-stone-200">
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                      <iconify-icon icon="lucide:qr-code" width="32" className="text-stone-400" style={{ strokeWidth: 1.5 } as React.CSSProperties}></iconify-icon>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-stone-500">Certificate ID</p>
                    <p className="text-sm font-medium text-stone-700 font-mono">
                      TC-2025-000001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
