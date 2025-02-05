import { type FC } from "react";
import random from "lodash/random";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/components/Button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TUser } from "@/store/authStore";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  comment: z.string().min(1, { message: "Comment is required" }),
});

type TInputs = {
  comment: string;
};

export type TComment = {
  id: number;
  text: string;
  user: TUser;
};
interface CommentProps {
  comments: TComment[];
  onComments: (comment: TComment) => void;
}

const Comment: FC<CommentProps> = ({ comments, onComments }) => {
  const user = useAuthStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>({
    resolver: zodResolver(schema),
  });

  const handleCommentSubmit = async (data: TInputs) => {
    if (user) {
      const newComment: TComment = {
        id: random(50),
        text: data.comment,
        user: user,
      };
      // comments.push(newComment);
      // setComments([...(comments || []), newComment]);
      onComments(newComment);
    }
  };

  return (
    <div className="comments mt-4 p-4 bg-white dark:bg-sky-800 rounded-xl shadow-md overflow-hidden animate animate-fade-up animate-duration-1000 animate-delay-300">
      {/* Container */}
      {comments?.map((comment) => (
        <div
          key={comment.id}
          className="comment mb-4 border-b border-gray-200 pb-2"
        >
          {/* Comment */}
          <div className="flex items-center">
            {comment?.user?.photoURL ? (
              <img
                className="w-6 h-6 rounded-full inline mr-2"
                src={comment.user.photoURL}
                alt={user?.displayName || "author"}
              />
            ) : (
              <User
                size={16}
                strokeWidth={1.5}
                className="inline mr-2 dark:text-white"
              />
            )}
            <strong>{comment?.user.displayName || "Name"}</strong>
          </div>
          <p className="text-gray-700 dark:text-white mb-1">{comment.text}</p>
        </div>
      ))}
      {/* Comment form */}
      {user && ( // Check if user is logged in
        <form onSubmit={handleSubmit(handleCommentSubmit)}>
          <Label htmlFor="comment">Add comment</Label>
          <Textarea {...register("comment")} name="comment" required />
          {errors.comment && <p>{errors.comment.message}</p>}
          <Button title={"Post"} classExtend="mt-2" />
        </form>
      )}
    </div>
  );
};

export default Comment;
