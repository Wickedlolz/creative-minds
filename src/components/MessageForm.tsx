import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { toast } from 'react-toastify';
import { MessageFormProps } from '../types';

const MessageForm = ({ id }: MessageFormProps) => {
    const navigate = useNavigate();
    const { user } = useFirebaseContext();
    const [message, setMessage] = useState<string>('');

    const handleSubmitMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
        <form className="flex" onSubmit={handleSubmitMessage}>
            <input
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                value={message}
                placeholder="Send a message 😀"
                className="bg-gray-800 w-full p-2 text-white text-sm rounded-tl-md rounded-bl-md"
            />
            <button
                type="submit"
                className="bg-cyan-500 text-white py-2 px-4 text-sm rounded-tr-md rounded-br-md hover:bg-cyan-400 duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default MessageForm;
