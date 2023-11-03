import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../utils/firebase.config';

import Message from '../components/Message';

const Home = () => {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
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
                }))
            );
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="my-12 text-lg font-medium">
            <h2>See what other people are saying</h2>
            {allPosts.map((post) => (
                <Message key={post.id} post={post}>
                    <Link to={`/details/${post.id}`}>
                        <button>
                            {post.comments?.length > 0
                                ? post.comments?.length
                                : 0}{' '}
                            comments
                        </button>
                    </Link>
                </Message>
            ))}
        </section>
    );
};

export default Home;
