import { kabanata1 } from './kabanata1';
import { kabanata2 } from './kabanata2';
import { KabanataContent } from '../../types/kabanata';

export const kabanataParts: Record<number, KabanataContent> = {
  1: kabanata1,
  2: kabanata2,
};

export const getAllKabanata = (): KabanataContent[] => {
  return Object.values(kabanataParts);
};

export const getKabanataById = (id: number): KabanataContent | undefined => {
  return kabanataParts[id];
};

export * from './kabanata1';
export * from './kabanata2'; 