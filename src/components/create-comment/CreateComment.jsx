import { commentApi } from '../../api';

export default function CreateComment({ user, recipeId, onCreate }) {

    const addCommentAction = async (formData) => {
        const newComment = {
            text: formData.get('text'),
            author: user?.email,
            recipe_id: recipeId,
            user_id: user?.id
        }
        try {
            await commentApi.create(newComment);
            onCreate();
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