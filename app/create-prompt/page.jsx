'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';// useSession allows us to keep track of the user being logged in or not.
import { useRouter } from 'next/navigation'; // useRouter allows us to navigate to other pages

import Form from '@components/Form';

const CreatePost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true); //for the loading spinner
    
    // We pass this data from our FE to our API endpoint using a POST request
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id // get the user id from the session
        })
      })

      if(response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <Form 
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePost