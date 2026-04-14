import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    addDoc,
    where,
    updateDoc
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);
const usersCollection = collection(db, "users");

type UserDoc = {
    id: string;
    email: string;
    fullname?: string;
    password?: string;
    role?: string;
    image?: string;
    type?: string;
};

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function serializeFirestoreValue(value: any): any {
    if (value === null || value === undefined) return value;

    if (Array.isArray(value)) {
        return value.map((item) => serializeFirestoreValue(item));
    }

    if (value instanceof Date) {
        return value.toISOString();
    }

    if (typeof value === "object") {
        if (typeof value.toDate === "function") {
            return value.toDate().toISOString();
        }

        return Object.fromEntries(
            Object.entries(value).map(([key, nestedValue]) => [
                key,
                serializeFirestoreValue(nestedValue),
            ]),
        );
    }

    return value;
}

async function getUserDocsByEmail(email: string): Promise<UserDoc[]> {
    const normalizedEmail = normalizeEmail(email);
    const q = query(usersCollection, where("email", "==", normalizedEmail));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((item) => ({
        id: item.id,
        ...(item.data() as Omit<UserDoc, "id">),
    }));
}

async function getFirstUserByEmail(email: string): Promise<UserDoc | null> {
    const users = await getUserDocsByEmail(email);
    return users[0] ?? null;
}

async function createUser(data: Omit<UserDoc, "id">) {
    return addDoc(usersCollection, data);
}

async function updateUserById(id: string, data: Partial<Omit<UserDoc, "id">>) {
    return updateDoc(doc(db, "users", id), data);
}

export async function retrieveProducts(collectionName: string) {
    const snapshot = await getDocs(collection(db, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...serializeFirestoreValue(doc.data()),
    }));
    return data;
}

export async function retrieveEvents(collectionName: string) {
    return retrieveProducts(collectionName);
}

export async function retrieveProductById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(db, collectionName, id));
    const data = snapshot.data();
    return data;
}

export async function signIn(
    email: string){
    return getFirstUserByEmail(email);
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
    const normalizedEmail = normalizeEmail(userData.email);
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

    const existingUser = await getFirstUserByEmail(normalizedEmail);

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
        await createUser({
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

export async function signInWithGoogle(userData: any) {
  try {
        const normalizedEmail = normalizeEmail(userData.email);
        const existingUser = await getFirstUserByEmail(normalizedEmail);

        if (existingUser) {
            const mergedData = {
                ...userData,
                email: normalizedEmail,
                role: existingUser.role || "member",
            };
            await updateUserById(existingUser.id, mergedData);
      return {
        status: true,
        message: "User registered and logged in with Google",
                data: mergedData,
      };
    } else {
            const newUserData = {
                ...userData,
                email: normalizedEmail,
                role: "member",
            };
            await createUser(newUserData);
      return {
        status: true,
        message: "User registered and logged in with Google",
                data: newUserData,
      };
    }
    } catch (_error: any) {
    return {
      status: false,
      message: "Failed to register user with Google",
    };
  }
}

export async function signInWithOAuth(userData: any) {
        return signInWithGoogle(userData);
}