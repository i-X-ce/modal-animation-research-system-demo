export interface Photo {
  id: string;
  imageUrl: string;
  datetime: number;
  place: {
    prefecture: string;
    city: string;
  };
  isDisplay: boolean;
}
