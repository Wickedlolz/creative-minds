import { ReactNode } from 'react';
import { User, UserCredential } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

export type FirebaseProviderProps = {
    children: ReactNode;
};

export type FirebaseInitialState = {
    user: User | null;
    signInWithGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
};

export type MessageProps = {
    children?: ReactNode;
    post: Post | DocumentData;
};

export type Post = {
    id: string;
    avatar: string;
    username: string;
    description: string;
    timestamp: string;
    comments: string[];
    likes: string[];
};

export type PostPageProps = {
    isInEditMode?: boolean;
};

export type MessageType = {
    avatar: string;
    userName: string;
    message: string;
    time: string;
};

export type MessageFormProps = {
    id: string | undefined;
};
