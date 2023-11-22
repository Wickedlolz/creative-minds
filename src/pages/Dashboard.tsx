import { Link, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../context/FirebaseContext';
import { Post } from '../types';

import Message from '../components/Message';
import { BsTrash2Fill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logOut } = useFirebaseContext();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (user) {
            const collectionRef = collection(db, 'posts');
            const q = query(collectionRef, where('user', '==', user!.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setPosts(
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
        }
    }, [user]);

    const deletePost = async (id: string) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);
        toast.success('Successfully delete your post!');
    };

    const handleSignOut = async () => {
        await logOut();
        navigate('/');
    };

    return (
        <section>
            <h1>Your posts</h1>
            {posts.map((post) => {
                return (
                    <Message post={post} key={post.id}>
                        <div className='flex gap-4'>
                            <button
                                onClick={() => deletePost(post.id)}
                                className='text-pink-600 flex items-center justify-center gap-2 py-2 text-sm'
                            >
                                <BsTrash2Fill className='text-2xl' /> Delete
                            </button>
                            <Link to={`/post/${post.id}`}>
                                <button className='text-teal-600 flex items-center justify-center gap-2 py-2 text-sm'>
                                    <AiFillEdit className='text-2xl' />
                                    Edit
                                </button>
                            </Link>
                        </div>
                    </Message>
                );
            })}
            <button
                className='font-medium text-white bg-gray-800 py-2 px-4 my-6 rounded-md hover:bg-gray-700 duration-300'
                onClick={handleSignOut}
            >
                Sign out
            </button>
        </section>
    );
};

export default Dashboard;
