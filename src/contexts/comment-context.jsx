import { createContext } from "react";
import { useReducer } from "react";
import { commentReducer } from "../components/list-comment/comment-reducer";

// eslint-disable-next-line react-refresh/only-export-components
export const CommentContext = createContext();

export function CommentProvider({ children }) {
    const [comments, dispatch] = useReducer(commentReducer, []);
    
    return (
        <CommentContext.Provider value={{ comments, dispatch }}>
            {children}
        </CommentContext.Provider>
    );
}

export default CommentContext;