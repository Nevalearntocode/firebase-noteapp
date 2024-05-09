import { Timestamp } from "firebase/firestore";

export type Note = {
    title: string;
    content: string;
    createdAt: Timestamp;
    uid: string;
    id: string
    image: string;
}