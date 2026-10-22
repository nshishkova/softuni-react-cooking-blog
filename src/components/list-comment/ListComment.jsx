import ItemComment from "./item-comment/ItemComment";
import { useEffect, useReducer } from "react";
import * as commentApi from "../../api/comment-api";
import { commentReducer } from "./comment-reducer";

export default function ListComment({ recipeId }) {
    const [comments, dispatch] = useReducer(commentReducer, []);

    useEffect(() => {
        commentApi.getAll(recipeId)
            .then((result) => dispatch({ type: 'SET_COMMENTS', payload: result }));
    }, [recipeId]);
    return (
        <>
            {comments.map(comment => <ItemComment key={comment.id} {...comment} />)}
        </>
    );
}