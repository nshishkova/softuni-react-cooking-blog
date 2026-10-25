import ItemComment from "./item-comment/ItemComment";
import { useEffect, useContext, useState } from "react";
import * as commentApi from "../../api/comment-api";
import { CommentContext } from "../../contexts/comment-context";
import { toast } from "react-toastify";

export default function ListComment({ recipeId }) {
    const { comments, dispatch } = useContext(CommentContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        commentApi.getAll(recipeId)
            .then((result) => dispatch({ type: 'SET_COMMENTS', payload: result }))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [recipeId, dispatch]);

    const deleteCommentHandler = (id) => {
        commentApi.remove(id)
            .then(() => {
                dispatch({ type: "DELETE_COMMENT", payload: id });
                toast.success("Comment deleted.");
            })
            .catch((error) => toast.error(error.message));
    };

    if (isLoading) {
        return <p className="empty-state">Loading comments...</p>;
    }

    if (error) {
        return <p className="empty-state">Could not load the comments. Please try again later.</p>;
    }

    if (comments.length === 0) {
        return <p className="empty-state">No comments yet. Be the first to share a tip!</p>;
    }

    return (
        <>
            {comments.map(comment => <ItemComment key={comment.id} onDelete={deleteCommentHandler} {...comment} />)}
        </>
    );
}