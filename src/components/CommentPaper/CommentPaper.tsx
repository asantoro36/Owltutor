import {getUser} from "../../controller/UserController";
import {Divider, Paper} from "@mui/material";
import * as React from "react";
import {IComment} from "../../entities/Comment";
import "./CommentPaper.css"

interface CommentPaperProps {
    comment: IComment,
}
export const CommentPaper = (props: CommentPaperProps) => {
    const {comment} = props
    const user = getUser(comment.userId);
    return (
        <Paper elevation={5} className={"comment-container"} >
            <div className={"comment-username"}>{user?.name}</div>
            <Divider/>
            <span className={"comment-text"}>{comment.text}</span>
        </Paper>
    )
}