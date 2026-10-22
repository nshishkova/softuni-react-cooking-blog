import * as commentApi from '../../api/comment-api';
import { useContext } from 'react';
import { CommentContext } from '../../contexts/comment-context';

export default function CreateComment({ user, recipeId }) {
    const { dispatch } = useContext(CommentContext);

    const addCommentAction = async (formData) => {

        const newComment = {
            text: formData.get('text'),
            author: user?.email,
            recipe_id: recipeId,
            user_id: user?.id
        }
        try {
            const result = await commentApi.create(newComment);

            dispatch({ type: 'ADD_COMMENT', payload: result[0] });
        } catch (error) {
            alert(error);
        }
    }

    return (
        <form className="comment-form" action={addCommentAction}>
            <label htmlFor="text">Add a comment</label>
            <textarea
                id="text"
                name="text"
                rows="3"
                placeholder="Write your comment here..."
            ></textarea>
            <button type="submit" className="button button-primary">Post Comment</button>
        </form>
    );
}