export interface WineReview {
  wineName: string;
  winery: string;
  region: string;
  year: number | string; // Year can be 'NV' for Non-Vintage
  tastingNotes: string[];
  averagePrice: string;
  wineScore: number;
  expertReview: string;
}
