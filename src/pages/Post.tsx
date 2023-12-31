import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';
import {
    DocumentData,
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../utils/firebase.config';
import { PostPageProps } from '../types';

const Post = ({ isInEditMode }: PostPageProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useFirebaseContext();
    const [post, setPost] = useState<DocumentData | null>(null);
    const [description, setDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (isInEditMode && id) {
            getDoc(doc(db, 'posts', id)).then((snapshot) => {
                setPost({ ...snapshot.data()!, id: snapshot.id });
                setDescription(snapshot.data()!.description);
            });
        } else {
            setPost((state) => ({ ...state, description: '' }));
        }
    }, [id, isInEditMode]);

    useEffect(() => {
        if (!user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            if (!description.length) {
                throw { message: 'Description field is empty! 🥲' };
            }

            if (description.length > 300) {
                throw { message: 'Description too long 😅' };
            }

            if (isInEditMode) {
                const docRef = doc(db, 'posts', post?.id);
                const updatedPost = {
                    ...post,
                    description,
                    timestamp: serverTimestamp(),
                };
                await updateDoc(docRef, updatedPost);
                toast.success('Post has been updated 🚀');
                return navigate('/dashboard');
            }

            const collectionRef = collection(db, 'posts');
            await addDoc(collectionRef, {
                description,
                timestamp: serverTimestamp(),
                user: user?.uid,
                avatar: user?.photoURL,
                username: user?.displayName,
                comments: [],
                likes: [],
            });

            setDescription('');

            toast.success('Post has been made 🚀');
            navigate('/dashboard');
        } catch (error) {
            const { message } = error as { message: string };
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold'>
                    {isInEditMode ? 'Edit your post' : 'Create a new post'}
                </h1>
                <div className='py-2'>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea
                        name='description'
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'
                    ></textarea>
                    <p
                        className={`text-cyan-600 font-medium text-sm ${
                            description.length > 300 ? 'text-red-600' : ''
                        }`}
                    >
                        {description.length}/300
                    </p>
                </div>
                <button
                    type='submit'
                    className={`w-full ${
                        isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-cyan-600 hover:bg-cyan-500'
                    } text-white font-medium p-2 my-2 rounded-lg text-sm duration-300`}
                    disabled={isLoading}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Post;
