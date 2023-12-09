import {Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
    getUserComments,
    makeUpdate,
} from "../controller/ServiceController";
import {getLoggedUser} from "../controller/UserController";
import {useEffect, useState} from "react";
import {CommentPaper} from "../components/CommentPaper/CommentPaper";
import {IComment} from "../entities/Comment";

export const CommentsManager = () => {
    const [comments, setComments] = useState<any[]>([])
    const loggedUser = getLoggedUser()

    const fetchData = async () => {
        const comments = await getUserComments()
        const pendingComments = comments.filter(comment => comment.status === 'PENDING');
        setComments(pendingComments)
    }

    useEffect(() => {
        fetchData()
    }, []);

    const updateComment = async (comment: IComment) => {
        await makeUpdate(comment.id.toString(), comment.status).then(() => {
            fetchData()
        });
    };

    return (
        <div className="board">
            <div>
                <div className={'courses-header'}>
                    <h2>Moderar comentarios</h2>
                </div>
                <Divider/>
                <div className={`${comments.length === 0? 'services-not-found' : 'columns'}`}>
                    {
                        comments.length === 0?
                            <Typography variant={"h4"} className={"services-not-found"}>No hay comentarios por moderar</Typography>
                            :
                            comments.map((comment: IComment) => (
                                comment.status==="PENDING" && <CommentPaper comment={comment} updateComment={updateComment}/>
                            ))
                    }
                </div>
            </div>
        </div>);
}