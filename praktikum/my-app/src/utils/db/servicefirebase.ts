import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    addDoc,
    where,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
}

export async function retrieveProductById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signUp(
    userData: {
        email: string;
        fullname: string;
        password: string;
        role?: string;
    },
    callback: (result: { status: "success" | "error"; message: string }) => void,
) {
    const normalizedEmail = userData.email.trim().toLowerCase();
    const trimmedPassword = userData.password.trim();

    if (!normalizedEmail) {
        callback({
            status: "error",
            message: "Email wajib diisi",
        });
        return;
    }

    if (trimmedPassword.length < 6) {
        callback({
            status: "error",
            message: "Password minimal 6 karakter",
        });
        return;
    }

    const q = query(
        collection(db, "users"),
        where("email", "==", normalizedEmail),
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    // console.log("Query result:", data);

    if (data.length === 0) {
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
        await addDoc(collection(db, "users"), {
            ...userData,
            email: normalizedEmail,
            password: hashedPassword,
            role: userData.role ?? "member",
        });
        callback({
            status: "success",
            message: "User registered successfully",
        });
    } else {
        callback({
            status: "error",
            message: "Email already exists",
        });
    }
}
