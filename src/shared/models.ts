export enum PWAInstallState {
  idle = "idle",
  installing = "installing",
  installed = "installed",
  downloaded = "downloaded",
  downloading = "downloading",
}

export interface PwaContent {
  appName: string;
  developerName: string;
  countOfDownloads: string;
  countOfReviews: string;
  size: string;
  verified: boolean;
  tags: string[];
  securityUI: boolean;
  lastUpdate: string;
  pwaLink: string;
  rating: string;
  shortDescription: string;
  fullDescription: string;
  countOfReviewsFull: string;
  countOfStars: number;
  appIcon: string;
  languages?: string[];
  images: {
    url: string;
  }[];
  reviews: {
    reviewAuthorName: string;
    reviewAuthorIcon?: string;
    reviewAuthorRating: number;
    reviewIconColor?: string;
    reviewText: string;
    reviewDate: string;
  }[];
  version: string;
  sliders: number[];
  id?: string;
}
