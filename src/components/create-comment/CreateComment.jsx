import * as commentApi from '../../api/comment-api';
import { useContext } from 'react';
import { CommentContext } from '../../contexts/comment-context';
import { toast } from 'react-toastify';

const maxCommentLength = 1000;

export default function CreateComment({ user, recipeId }) {
    const { dispatch } = useContext(CommentContext);

    const addCommentAction = async (formData) => {
        const text = formData.get('text').trim();

        if (!text) {
            toast.error("Comment cannot be empty.");
            return;
        }

        if (text.length > maxCommentLength) {
            toast.error(`Comment must be ${maxCommentLength} characters or less.`);
            return;
        }

        const newComment = {
            text,
            author: user?.user_metadata?.name || user?.email,
            recipe_id: recipeId,
            user_id: user?.id
        }
        try {
            const result = await commentApi.create(newComment);

            dispatch({ type: 'ADD_COMMENT', payload: result[0] });
            toast.success("Comment posted.");
        } catch (error) {
            toast.error(error.message);
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
                maxLength={maxCommentLength}
            ></textarea>
            <button type="submit" className="button button-primary">Post Comment</button>
        </form>
    );
}