"use client";
import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeCommentModel } from "@/redux/Slices/modalSlice";
import PostInput from "../PostInput";
import { PostHeader } from "../Post";
import { XMarkIcon } from "@heroicons/react/24/outline";
import fetchComments from "./utils/fetchComments"; // ✅ fixed import

function CommentModal() {
  const Open = useSelector((state: RootState) => state.modals.commentModalOpen);
  const commentDetails = useSelector(
    (state: RootState) => state.modals.commentPostDetails
  );
  const dispatch = useDispatch<AppDispatch>();

  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (commentDetails.id) {
      fetchComments(commentDetails.id).then(setComments);
    }
  }, [commentDetails.id]);
  console.log("Fetched comments:", comments); // ✅ debug log

  return (
    <Modal
      open={Open}
      onClose={() => dispatch(closeCommentModel())}
      className="flex justify-center items-center"
    >
      <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl outline-none relative">
        <XMarkIcon
          className="w-7 h-7 absolute top-4 right-4 cursor-pointer z-20"
          onClick={() => dispatch(closeCommentModel())}
        />
        <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col relative">
          <PostHeader
            name={commentDetails.name}
            username={commentDetails.username}
            text={commentDetails.text}
            replyTo={commentDetails.username}
          />

          <div className="mt-4">
            <PostInput placeholder="Wanna reply?" insideModal={true} />
          </div>

          {/* ✅ Render comments */}
          <div className="mt-6 space-y-3">
            {comments.map(c => (
              <div key={c.id} className="border-b pb-2">
                <p className="font-semibold">{c.name} (@{c.username})</p>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CommentModal;
