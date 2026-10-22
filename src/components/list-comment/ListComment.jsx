import ItemComment from "./item-comment/ItemComment";
import { useEffect, useContext } from "react";
import * as commentApi from "../../api/comment-api";
import { CommentContext } from "../../contexts/comment-context";

export default function ListComment({ recipeId }) {
    const { comments, dispatch } = useContext(CommentContext);

    useEffect(() => {
        commentApi.getAll(recipeId)
            .then((result) => dispatch({ type: 'SET_COMMENTS', payload: result }));
    }, [recipeId, dispatch]);

    const deleteCommentHandler = (id) => {
        commentApi.remove(id)
            .then(() => dispatch({ type: "DELETE_COMMENT", payload: id }));
    };

    return (
        <>
            {comments.map(comment => <ItemComment key={comment.id} onDelete={deleteCommentHandler} {...comment} />)}
        </>
    );
}