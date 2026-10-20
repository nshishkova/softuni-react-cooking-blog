import request from '../../utils/request';

export default function CreateComment({ user, recipeId }) {

    const addCommentAction = async (formData) => {
        const newComment = {
            text: formData.get('text'),
            author: user?.email,
            recipe_id: recipeId,
        }
        try {
            await request('/comments', 'POST', newComment);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <form className="comment-form" action={addCommentAction}>
            <label htmlFor="comment">Have a tip or question?</label>
            <textarea
                id="comment"
                name="text"
                rows="3"
                placeholder="Share your thoughts..."
            ></textarea>
        </form>
    );
}