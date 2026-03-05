import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    return data;
}

export async function retrieveEvents(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => {
        const rawData = doc.data() as {
            date?: string | Date | { seconds: number };
            [key: string]: any;
        };

        let normalizedDate = rawData.date;
        if (rawData.date instanceof Date) {
            normalizedDate = rawData.date.toISOString();
        } else if (
            rawData.date &&
            typeof rawData.date === "object" &&
            "seconds" in rawData.date
        ) {
            normalizedDate = new Date(rawData.date.seconds * 1000).toISOString();
        }

        return {
            id: doc.id,
            ...rawData,
            date: normalizedDate ?? ""
        };
    });
    return data;
}
