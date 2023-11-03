import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';
import {
    DocumentData,
    Timestamp,
    arrayUnion,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { toast } from 'react-toastify';
import { MessageType } from '../types';

import Message from '../components/Message';

const Details = () => {
    const { id } = useParams();
    const { user } = useFirebaseContext();
    const navigate = useNavigate();
    const [post, setPost] = useState<DocumentData>();
    const [message, setMessage] = useState<string>('');
    const [allMessage, setAllMessages] = useState<MessageType[]>([]);
    const docRef = doc(db, 'posts', id!);

    useEffect(() => {
        getDoc(doc(db, 'posts', id!)).then((result) => {
            setPost(result.data());
        });
    }, [id]);

    useEffect(() => {
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.data()?.comments) {
                setAllMessages(snapshot.data()?.comments);
            }
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitMessage = async () => {
        if (!user) return navigate('/auth/login');

        if (!message) {
            toast.error("Don't leave an empty message 😅");
            return;
        }

        try {
            const docRef = doc(db, 'posts', id!);
            await updateDoc(docRef, {
                comments: arrayUnion({
                    message,
                    avatar: user.photoURL,
                    userName: user.displayName,
                    time: Timestamp.now(),
                }),
            });
            setMessage('');
        } catch (error) {
            const { message } = error as { message: string };
            toast.error(message);
        }
    };

    return (
        <div>
            <Message post={post!}></Message>
            <div className="my-4">
                <div className="flex">
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        value={message}
                        placeholder="Send a message 😀"
                        className="bg-gray-800 w-full p-2 text-white text-sm rounded-tl-md rounded-bl-md"
                    />
                    <button
                        onClick={submitMessage}
                        className="bg-cyan-500 text-white py-2 px-4 text-sm rounded-tr-md rounded-br-md hover:bg-cyan-400 duration-300"
                    >
                        Submit
                    </button>
                </div>
                <div className="py-6">
                    <h2 className="font-bold">Comments</h2>
                    {allMessage?.map((message) => (
                        <div
                            className="bg-white p-4 my-4 border-2"
                            key={message.time}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <img
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full"
                                    src={message.avatar}
                                    alt={message.message}
                                    loading="lazy"
                                />
                                <h2>{message.userName}</h2>
                            </div>
                            <h2>{message.message}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Details;
