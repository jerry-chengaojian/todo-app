'use client';

import { useEffect, useState } from 'react';
import CommentInput from '@/components/CommentInput';
import CommentList from '@/components/CommentList';
import type { Comment } from '@prisma/client';
import { FaComments } from 'react-icons/fa';
import { BiCommentAdd } from 'react-icons/bi';

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch('/api/comments');
    const data = await response.json();
    setComments(data);
  };

  const handleSubmitComment = async (content: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaComments className="text-blue-500" />
        Comments
      </h1>
      <div className="relative">
        <BiCommentAdd className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <CommentInput onSubmit={handleSubmitComment} />
      </div>
      <CommentList comments={comments} />
    </div>
  );
} 