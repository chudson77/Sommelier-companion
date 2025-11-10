
import React from 'react';
import { WineReview } from '../types';

interface WineReviewDisplayProps {
  review: WineReview;
  imageFile: File | null;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
    const getScoreColor = () => {
        if (score >= 95) return 'text-purple-400 border-purple-400';
        if (score >= 90) return 'text-green-400 border-green-400';
        if (score >= 85) return 'text-yellow-400 border-yellow-400';
        return 'text-orange-400 border-orange-400';
    };

    return (
        <div className={`relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full border-4 bg-gray-900/50 ${getScoreColor()}`}>
            <span className="text-4xl md:text-5xl font-bold">{score}</span>
            <span className="absolute bottom-4 md:bottom-5 text-xs font-semibold text-gray-400">/ 100</span>
        </div>
    );
};

const WineReviewDisplay: React.FC<WineReviewDisplayProps> = ({ review, imageFile }) => {
  const { wineName, winery, region, year, tastingNotes, averagePrice, wineScore, expertReview } = review;
  const imagePreviewUrl = imageFile ? URL.createObjectURL(imageFile) : 'https://picsum.photos/300/400';

  return (
    <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-8">
            <div className="md:col-span-1 flex flex-col items-center text-center">
                <img src={imagePreviewUrl} alt={wineName} className="w-full max-w-[200px] md:max-w-xs h-auto object-contain rounded-lg shadow-lg mb-6"/>
                <ScoreCircle score={wineScore} />
                <div className="mt-4 text-2xl font-bold text-gray-100">{averagePrice}</div>
                <div className="text-sm text-gray-400">Average Price</div>
            </div>

            <div className="md:col-span-2 space-y-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{wineName}</h2>
                    <p className="text-lg md:text-xl text-gray-300 mt-1">{winery}</p>
                    <p className="text-md text-indigo-400 font-semibold mt-2">{`${region} - ${year}`}</p>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Tasting Notes</h3>
                    <div className="flex flex-wrap gap-2">
                        {tastingNotes.map((note, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                                {note}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Expert Review</h3>
                    <p className="text-gray-300 leading-relaxed">{expertReview}</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WineReviewDisplay;
