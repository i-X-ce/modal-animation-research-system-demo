import { Photo } from "../_types/photo";

let cnt = 0;

const generateId = () => {
  return `p${cnt++}`;
};

const generateImgPath = (num: number) => {
  return `https://picsum.photos/seed/${num + 1}/500/500`;
};

const generateDatetime = () => {
  const minDate = new Date("2023-01-01T00:00:00Z");
  const maxDate = new Date("2025-01-01T00:00:00Z");
  const randomTime =
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
  return new Date(randomTime).getTime();
};

export const photos: Photo[] = Array.from({ length: 100 }).map(() => ({
  imageUrl: generateImgPath(cnt),
  id: generateId(),
  datetime: generateDatetime(),
}));
