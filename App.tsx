
import React, { useState, useCallback } from 'react';
import { WineReview } from './types';
import { getWineReviewFromImage } from './services/geminiService';
import Header from './components/Header';
import ImageInput from './components/ImageInput';
import WineReviewDisplay from './components/WineReviewDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { WineIcon } from './components/icons/WineIcon';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [wineReview, setWineReview] = useState<WineReview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageAnalysis = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setWineReview(null);
    setImageFile(file);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const base64Image = base64data.split(',')[1];
        
        const review = await getWineReviewFromImage(base64Image, file.type);
        setWineReview(review);
      };
      reader.onerror = () => {
        throw new Error('Failed to read the image file.');
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Analysis failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleReset = () => {
    setImageFile(null);
    setWineReview(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased" style={{background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)"}}>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        {!imageFile && (
          <div className="w-full max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">Discover Your Wine's Story</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Take a photo of a wine label or upload an image to get an instant analysis from our AI Sommelier.
            </p>
            <ImageInput onImageSubmit={handleImageAnalysis} isLoading={isLoading} />
          </div>
        )}

        {isLoading && <LoadingSpinner />}
        
        {error && !isLoading && (
          <div className="w-full max-w-2xl text-center p-6 bg-red-900/50 border border-red-700 rounded-lg">
            <h3 className="text-xl font-semibold text-red-300 mb-2">An Error Occurred</h3>
            <p className="text-red-400">{error}</p>
            <button
                onClick={handleReset}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
              >
                Try Again
              </button>
          </div>
        )}

        {wineReview && !isLoading && (
          <div className="w-full max-w-4xl">
            <WineReviewDisplay review={wineReview} imageFile={imageFile} />
             <div className="text-center mt-8">
              <button
                onClick={handleReset}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 text-lg"
              >
                Analyze Another Wine
              </button>
            </div>
          </div>
        )}

        {!imageFile && !isLoading && !error && (
            <div className="mt-16 text-center text-gray-400">
                <WineIcon className="w-24 h-24 mx-auto opacity-20" />
                <p className="mt-4 text-lg">Your virtual cellar awaits.</p>
            </div>
        )}
        
      </main>
    </div>
  );
};

export default App;
