import ItemComment from "./item-comment/ItemComment";
import { useEffect, useState } from "react";
import request from "../../utils/request";

export default function ListComment({ recipeId, refresh }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        request(`/comments?recipe_id=eq.${recipeId}&order=created_at.desc`)
            .then((result) => setComments(result));
    }, [recipeId, refresh]);
    return (
        <>
            {comments.map(comment => <ItemComment key={comment.id} {...comment} />)}
        </>
    );
}