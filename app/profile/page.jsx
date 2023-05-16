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


  const handleEdit = () => {
    []
  }
  
  const handleDelete = () => {
    []
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