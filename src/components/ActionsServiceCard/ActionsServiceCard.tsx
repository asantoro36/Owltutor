import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import DateRangeIcon from '@mui/icons-material/DateRange';
import "../ServiceCard/ServiceCard.css"
import "./ActionsServiceCard.css"
import {Divider} from "@mui/material";
import {Service} from "../../entities/Service";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GradeIcon from '@mui/icons-material/Grade';

interface ServiceCardProps {
    service: Service;
}

export function ActionsServiceCard(props: ServiceCardProps) {

    const service = props.service
    const setType = (type: string) => {
        return type!=='INDIVIDUAL'? 'Grupal' : 'Individual';
    }

    const setFrequency = (frequency: string) => {
        if(frequency === 'UNIQUE')
            return "Única"
        else if (frequency === 'WEEKLY')
            return 'Semanal'
        return 'Mensual'
    }

    return (
        <Card sx={{ maxWidth: 400, maxHeight: 500 }} elevation={8}>
            <CardContent className="card-content">
                <div className={"header-container"}>
                    <span><Typography color="textPrimary" variant={"h5"}>{service.title}</Typography></span>
                    <div className={"actions-container"}>
                        <span onClick={() => {console.log("Edit")}} className={"service-action"}><EditIcon/></span>
                        <span onClick={() => {console.log("Delete")}} className={"service-action"}><DeleteIcon/></span>
                    </div>
                </div>
                <Divider/>
                <div className="card-description">
                    <div>
                        <Typography style={{minHeight: 48}}color="textSecondary">{service.description}</Typography>
                    </div>
                    <div className={'class-info'}>
                        <div className={'class-info-items'}>
                            <Typography className="description-points" color="textSecondary"><AccessTimeIcon/>{service.duration}</Typography>
                            <Typography className="description-points" color="textSecondary"><EventIcon/>{setFrequency(service.frequency)}</Typography>
                            <Typography className="description-points" color="textSecondary"><PeopleIcon/>{setType(service.type)}</Typography>
                        </div>
                        <div className={'class-info-items'} >
                            <div style={{display:'flex', gap: 5, alignItems: "center"}}>
                                <Typography className="description-points" color="textSecondary"><DateRangeIcon/></Typography>
                                <Typography className={`description-points ${service.days.includes('MON') ? 'bold-text' : ''}`} color="textSecondary">Lun</Typography>
                                <Typography className={`description-points ${service.days.includes('THU') ? 'bold-text' : ''}`} color="textSecondary">Mar</Typography>
                                <Typography className={`description-points ${service.days.includes('WED') ? 'bold-text' : ''}`} color="textSecondary">Mie</Typography>
                                <Typography className={`description-points ${service.days.includes('TUE') ? 'bold-text' : ''}`} color="textSecondary">Jue</Typography>
                                <Typography className={`description-points ${service.days.includes('FRI') ? 'bold-text' : ''}`} color="textSecondary">Vie</Typography>
                                <Typography className={`description-points ${service.days.includes('SAT') ? 'bold-text' : ''}`} color="textSecondary">Sab</Typography>
                                <Typography className={`description-points ${service.days.includes('SUN') ? 'bold-text' : ''}`} color="textSecondary">Dom</Typography>
                            </div>
                            <Typography className="description-points" color="textSecondary"><GradeIcon/>{service.rating}</Typography>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <Divider/>
                    <div className="footer-content">
                        <span style={{display: 'flex'}}><Typography variant="h5"> ${service.cost} </Typography><Typography className="cost-info" color="textSecondary"> p/clase</Typography></span>
                        <div className="contact-button">{!service.isPublished? "Publicar" : "Retirar"}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}