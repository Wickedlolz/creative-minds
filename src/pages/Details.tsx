import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentData, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { MessageType } from '../types';

import Message from '../components/Message';
import MessageForm from '../components/MessageForm';

const Details = () => {
    const { id } = useParams();
    const [post, setPost] = useState<DocumentData>();
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

    return (
        <div>
            <Message post={post!}></Message>
            <div className="my-4">
                <MessageForm id={id} />
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
