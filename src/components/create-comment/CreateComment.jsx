import request from '../../utils/request';

export default function CreateComment({ user, recipeId, onCreate }) {

    const addCommentAction = async (formData) => {
        const newComment = {
            text: formData.get('comment'),
            author: user?.email,
            recipe_id: recipeId,
        }
        try {
            await request('/comments', 'POST', newComment);
            onCreate();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <form className="comment-form" action={addCommentAction}>
            <label htmlFor="comment">Add a comment</label>
            <textarea
                id="comment"
                name="comment"
                rows="3"
                placeholder="Write your comment here..."
            ></textarea>
            <button type="submit" className="button button-primary">Post Comment</button>
        </form>
    );
}