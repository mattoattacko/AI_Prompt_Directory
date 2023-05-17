'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Image from 'next/image';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  //~~~ Copy prompt to clipboard ~~~//
  const handleCopy = () => {
    setCopied(post.prompt);
    navigate.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000); // we do this to reset state
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="cursor-pointer flex flex-1 justify-start items-center gap-3">
          <Image 
            src={post.creator.image}
            alt='user profile picture'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className="flex flex-col">
            <h3 
              className="font-satoshi font-semibold text-gray-900"
            >
              {post.creator.username}
            </h3>

            <p 
              className="font-inter text-sm text-gray-500"            
            >
              {post.creator.email}
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <div
          className='copy_btn'
          onClick={handleCopy}
        >
          {/* image changes depending on if it's been clicked */}
          <Image 
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt='copy icon'
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>

      <p 
        className='cursor-pointer font-inter text-sm blue_gradient'
        // check if handleTagClick exists (is defined) and if it does call handleTagClick.
        // this makes sure we have the tag and if we do we can click it and show all the similar tags.
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {/* check if the currently logged in user is the creator of a post, and if they are on the  '/profile' page. If so, show the Edit and Delete buttons  */}
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='flex-center mt-5 gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard