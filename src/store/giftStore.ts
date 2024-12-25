import { create } from 'zustand';

export interface Gift {
    id: number;
    name: string;
    description: string;
    probability: number;
}

interface GiftStore {
    gifts: Gift[];
    setGifts: (gifts: Gift[]) => void;
    updateGift: (gift: Gift) => void;
    deleteGift: (id: number) => void;
    addGift: (gift: Omit<Gift, 'id'>) => void;
}

export const useGiftStore = create<GiftStore>((set) => ({
    gifts: [
        { id: 1, name: "1,222,024 VND", description: "Một món quà bất ngờ từ ví thần tài!", probability: 5 },
        { id: 2, name: "Một đôi boot mới", description: "Nâng niu bàn chân Việt", probability: 15 },
        { id: 3, name: "Một chuyến du lịch cùng nhau", description: "Đưa nhau đi trốn", probability: 20 },
        { id: 4, name: "Một bộ quần áo mới", description: "Một bộ đồ xinh cho vợ", probability: 10 },
        { id: 5, name: "Bó hoa này đẹp như em ấy!", description: "Một bó hoa đẹp tặng vợ", probability: 20 },
        { id: 6, name: "Một buổi tối lãng mạn bên chồng", description: "Tối nay, c sẽ biến v thành nàng công chúa nhé!", probability: 30 }
    ],
    setGifts: (gifts) => set({ gifts }),
    updateGift: (updatedGift) =>
        set((state) => ({
            gifts: state.gifts.map(gift =>
                gift.id === updatedGift.id ? updatedGift : gift
            )
        })),
    deleteGift: (id) =>
        set((state) => ({
            gifts: state.gifts.filter(gift => gift.id !== id)
        })),
    addGift: (newGift) =>
        set((state) => ({
            gifts: [...state.gifts, { ...newGift, id: Math.max(...state.gifts.map(g => g.id)) + 1 }]
        }))
}));