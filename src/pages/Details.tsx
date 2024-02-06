import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DocumentData, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { MessageType } from '../types';

import Message from '../components/Message';
import MessageForm from '../components/MessageForm';
import MessageItem from "../components/MessageItem.tsx";

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
        <>
            <Message post={post!}></Message>
            <div className='my-4'>
                <MessageForm id={id} />
                <div className='py-6'>
                    <h2 className='font-bold'>Comments</h2>
                    {allMessage.length > 0 ?
                        allMessage?.map((message) => (
                            <MessageItem key={message.time} message={message} />
                        )):
                        <p>Write the first comment.</p>
                    }
                </div>
            </div>
        </>
    );
};

export default Details;
