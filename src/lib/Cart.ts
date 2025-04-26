import { User } from "./Users";

export type CartItem = {
    productId: number;
    quantity: number;
    price: number;
    user: User;
    purchasedate: Date;
};

