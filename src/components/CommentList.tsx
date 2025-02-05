import { Comment } from '@prisma/client';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <span className="font-medium text-gray-700">{comment.author}</span>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2 text-gray-600">{comment.content}</p>
        </div>
      ))}
    </div>
  );
} 