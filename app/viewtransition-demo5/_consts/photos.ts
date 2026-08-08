import { generateIndex } from "../_stores/systemStore";
import { Photo } from "../_types/photo";

let cnt = 0;

const generateId = () => {
  return `p${cnt++}`;
};

const generateImgPath = (num: number) => {
  return `https://picsum.photos/seed/${num + 1}/500/500`;
};

export const photos: Photo[] = Array.from({ length: 100 }).map(() => ({
  imageUrl: generateImgPath(cnt),
  id: generateId(),
  datetime: generateIndex(),
}));
