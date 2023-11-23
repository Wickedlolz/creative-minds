import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { Post } from '../types';

import Message from '../components/Message';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Home = () => {
    const { user } = useFirebaseContext();
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    avatar: doc.data().avatar,
                    description: doc.data().description,
                    username: doc.data().username,
                    timestamp: doc.data().timestamp,
                    comments: doc.data().comments,
                    likes: doc.data().likes || [],
                }))
            );
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLikeUnlike = async (post: Post) => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            if (!post.likes.includes(user?.uid || '')) {
                await updateDoc(doc(db, 'posts', post.id), {
                    likes: arrayUnion(user?.uid),
                });
            } else {
                await updateDoc(doc(db, 'posts', post.id), {
                    likes: arrayRemove(user?.uid),
                });
            }
        } catch (error) {
            const { message } = error as { message: string };
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='my-12 text-lg font-medium'>
            <h2>See what other people are saying</h2>
            {allPosts.map((post) => (
                <Message key={post.id} post={post}>
                    <div className='flex items-center gap-4'>
                        <Link to={`/details/${post.id}`}>
                            <button>
                                {post.comments?.length > 0
                                    ? post.comments?.length
                                    : 0}{' '}
                                comments
                            </button>
                        </Link>
                        {user && (
                            <button
                                className={`flex items-center gap-1 ${
                                    isLoading && 'cursor-not-allowed'
                                }`}
                                onClick={() => handleLikeUnlike(post)}
                                disabled={isLoading}
                            >
                                {!post.likes.includes(user!.uid) ? (
                                    <FaRegHeart className='text-xl inline-block' />
                                ) : (
                                    <FaHeart className='text-xl inline-block' />
                                )}{' '}
                                {post.likes.length}
                            </button>
                        )}
                    </div>
                </Message>
            ))}
        </section>
    );
};

export default Home;
