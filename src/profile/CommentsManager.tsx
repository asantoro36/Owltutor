import {Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IContact} from "../entities/Contact";
import {ContactPaper} from "./ContactPaper";
import * as React from "react";
import {getUserServices, updateService} from "../controller/ServiceController";
import {getLoggedUser} from "../controller/UserController";
import {Service} from "../entities/Service";
import {useEffect, useState} from "react";
import {CommentPaper} from "../components/CommentPaper/CommentPaper";
import {IComment} from "../entities/Comment";

export const CommentsManager = () => {

    const loggedUser = getLoggedUser()
    const pendingComments = getUserServices(loggedUser? loggedUser?.mail : "").reduce((acc: any, service: Service) => {
        if (service.comments) {
            const pendingServiceComments = service.comments.filter(comment => comment.status === "PENDING");
            return acc.concat(pendingServiceComments);
        }
        return acc;
    }, []);
    const [comments, setComments] = useState(pendingComments)

    const updateComment = (comment: IComment) => {
        getUserServices(loggedUser ? loggedUser?.mail : "").map((service: Service) => {
            if (service.comments) {
                const index = service.comments.findIndex((existingComment) =>
                    existingComment.text === comment.text
                )
                if (index !== -1) {
                    service.comments[index] = comment
                }
                updateService(service)
            }
        })

        const updatedPendingComments = getUserServices(loggedUser ? loggedUser?.mail : "").reduce((acc: any, service: Service) => {
            if (service.comments) {
                const pendingServiceComments = service.comments.filter(comment => comment.status === "PENDING");
                return acc.concat(pendingServiceComments);
            }
            return acc;
        }, []);

        setComments(updatedPendingComments);
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