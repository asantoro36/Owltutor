import {getUser} from "../../controller/UserController";
import {Divider, Paper} from "@mui/material";
import * as React from "react";
import {IComment} from "../../entities/Comment";
import "./CommentPaper.css"

interface CommentPaperProps {
    comment: IComment,
    updateComment: any
}
export const CommentPaper = (props: CommentPaperProps) => {
    const {comment, updateComment} = props
    const user = getUser(comment.userId);

    const handleReject = () => {
        comment.status = "DELETED"
        updateComment(comment)
    }

    const handleApprove = () => {
        comment.status = "APPROVED"
        updateComment(comment)
    }

    return (
        <Paper elevation={5} className={"comment-container"} >
            <div className={"comment-username"}>{user?.name}</div>
            <Divider/>
            <span className={"comment-text"}>{comment.text}</span>
            <div className={"contact-buttons-container"}>

                {comment.status ==="PENDING" &&
                   (<>
                       <span onClick={handleReject} className={"button-secondary"}>Rechazar</span>
                        <span onClick={handleApprove} className={"contact-button"}>Aceptar</span>
                   </>)
                }
            </div>
        </Paper>
    )
}