"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface Review {
  id: string;
  productName: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ReviewCtx {
  reviews: Review[];
  addReview: (r: Omit<Review, "id" | "date" | "helpful">) => void;
  getReviews: (productName: string) => Review[];
  getAvgRating: (productName: string) => number;
}

const Ctx = createContext<ReviewCtx>({
  reviews: [], addReview: () => {},
  getReviews: () => [], getAvgRating: () => 0,
});

const INITIAL_REVIEWS: Review[] = [
  { id:"r1", productName:"Power Blazer Hitam", author:"Siti A.", avatar:"🧕", rating:5, comment:"Kualitasnya luar biasa! Bahannya premium banget, pas di badan. Udah dapat banyak compliment dari teman kantor.", date:"10 Apr 2026", helpful:24, verified:true },
  { id:"r2", productName:"Power Blazer Hitam", author:"Rina M.", avatar:"👩", rating:4, comment:"Bagus sekali, warnanya persis seperti foto. Sedikit kebesaran di pundak tapi overall memuaskan.", date:"7 Apr 2026", helpful:12, verified:true },
  { id:"r3", productName:"Power Blazer Hitam", author:"Dian K.", avatar:"🧑", rating:5, comment:"Ini blazer terbaik yang pernah saya beli online! Jahitannya rapi, bahan tidak mudah kusut.", date:"3 Apr 2026", helpful:18, verified:false },
  { id:"r4", productName:"Oversized Hoodie", author:"Fajar P.", avatar:"👦", rating:5, comment:"Bahan fleece-nya tebal dan lembut banget! Udah cuci berkali-kali masih tetap bagus. Worth it!", date:"9 Apr 2026", helpful:31, verified:true },
  { id:"r5", productName:"Oversized Hoodie", author:"Nadia W.", avatar:"👧", rating:4, comment:"Suka banget dengan ukurannya yang oversized, cocok untuk santai di rumah. Warna sesuai ekspektasi.", date:"5 Apr 2026", helpful:9, verified:true },
  { id:"r6", productName:"Midi Dress Floral", author:"Ayu Y.", avatar:"🧕", rating:5, comment:"Dress paling cantik yang pernah saya punya! Motif floralnya elegan, cocok untuk berbagai acara.", date:"11 Apr 2026", helpful:27, verified:true },
  { id:"r7", productName:"Midi Dress Floral", author:"Clara D.", avatar:"👩", rating:5, comment:"Bahannya adem dan jatuhnya bagus banget. Potongannya flattering untuk semua bentuk tubuh.", date:"8 Apr 2026", helpful:15, verified:true },
  { id:"r8", productName:"Heels Statement", author:"Mega R.", avatar:"👩‍🦱", rating:4, comment:"Cantik banget heelsnya! Tingginya pas, tidak terlalu susah dipakai. Bahan kulitnya terlihat premium.", date:"6 Apr 2026", helpful:8, verified:true },
  { id:"r9", productName:"Platform Sneakers", author:"Bagas W.", avatar:"👨", rating:5, comment:"Keren abis! Sol platformnya nyaman dipakai jalan jauh. Materinya awet dan mudah dibersihkan.", date:"4 Apr 2026", helpful:22, verified:true },
  { id:"r10", productName:"Cardigan Pastel", author:"Tika K.", avatar:"🧑‍🦰", rating:5, comment:"Warna pastelnya cantik sekali! Rajutannya halus, tidak gatal. Pas untuk dipakai di ruangan ber-AC.", date:"2 Apr 2026", helpful:14, verified:true },
];

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const addReview = useCallback((r: Omit<Review, "id" | "date" | "helpful">) => {
    const newR: Review = {
      ...r, id: "r" + Date.now(),
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      helpful: 0,
    };
    setReviews(prev => [newR, ...prev]);
  }, []);

  const getReviews = useCallback((productName: string) =>
    reviews.filter(r => r.productName === productName), [reviews]);

  const getAvgRating = useCallback((productName: string) => {
    const r = reviews.filter(x => x.productName === productName);
    if (!r.length) return 0;
    return Math.round((r.reduce((s, x) => s + x.rating, 0) / r.length) * 10) / 10;
  }, [reviews]);

  return (
    <Ctx.Provider value={{ reviews, addReview, getReviews, getAvgRating }}>
      {children}
    </Ctx.Provider>
  );
}

export const useReviews = () => useContext(Ctx);
