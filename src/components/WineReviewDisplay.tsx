import React from 'react';
import { WineReview } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
import { CalendarIcon } from './icons/CalendarIcon';

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
  const imagePreviewUrl = imageFile ? URL.createObjectURL(imageFile) : '';

  return (
    <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-6 md:p-8">
            <div className="md:col-span-2 flex flex-col items-center text-center">
                <img src={imagePreviewUrl} alt={wineName} className="w-full max-w-[200px] md:max-w-xs h-auto object-contain rounded-lg shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300"/>
                <div className="flex items-center justify-center gap-8 w-full">
                    <ScoreCircle score={wineScore} />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-100">{averagePrice}</div>
                        <div className="text-sm text-gray-400 font-light">Average Price</div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-3 space-y-6">
                <div>
                    <p className="text-lg md:text-xl text-indigo-400 font-semibold">{winery}</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight mt-1">{wineName}</h2>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300 mt-4">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 text-gray-400" />
                            <span>{region}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-gray-400" />
                            <span>{year}</span>
                        </div>
                    </div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-lg font-bold text-gray-200 mb-3">Tasting Notes</h3>
                    <div className="flex flex-wrap gap-2">
                        {tastingNotes.map((note, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-700/50 border border-gray-600/50 text-gray-300 rounded-full text-sm font-medium">
                                {note}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-black/20 p-4 rounded-lg border border-gray-700/50">
                    <h3 className="text-lg font-bold text-gray-200 mb-2">Expert Review</h3>
                    <blockquote className="border-l-4 border-indigo-500 pl-4">
                      <p className="text-gray-300 leading-relaxed italic">{expertReview}</p>
                    </blockquote>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WineReviewDisplay;