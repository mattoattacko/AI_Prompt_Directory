'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Profile from '@components/Profile';

const MyProfile = () => {

  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const router = useRouter();


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`); //only get posts from that specific user.
      const data = await response.json();

      setPosts(data);
    }

    if(session?.user.id) fetchPosts(); //only get posts if we have the user we want to fetch posts for.
  }, []);


  const handleEdit = (post) => {
    // navigate users to a different page to edit the post.
    router.push(`/update-prompt?id=${post._id}`);
  }
  
  const handleDelete = async (post) => {
    const confirmDelete = confirm('Are you sure you want to delete this prompt?');

    if(confirmDelete) {
      try {
        await fetch(`/api/posts/${post._id.toString()}`, {
          method: 'DELETE'
        })

        // get all the posts but without the deleted post
        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile 
      name='My'
      desc='Welcome to your profile page!'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile