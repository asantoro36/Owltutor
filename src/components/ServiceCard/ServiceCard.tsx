import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import "./ServiceCard.css"
import Button from '@mui/material/Button';
import {CardHeader} from "@mui/material";
import {Service} from "../../Entities/Service";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard(props: ServiceCardProps) {

    const service = props.service
    return (
        <Card sx={{ maxWidth: 300 }} elevation={8}>
            <CardHeader
            title={service.title}
            style={{ paddingBottom: '4px' }}>

            </CardHeader>
            <CardContent style={{ paddingTop: '4px' }}>
                <div className="card-content">
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            {service.description}
                        </Typography>
                    </div>
                    <div className="divider"/>
                    <div>
                        <Typography className="description-points" color="textSecondary"><AccessTimeIcon/>{service.duration}</Typography>
                        <Typography className="description-points" color="textSecondary"><EventIcon/>{service.frequency}</Typography>
                        <Typography className="description-points" color="textSecondary"><PeopleIcon/>{service.type}</Typography>
                        <Typography className="description-points" color="textSecondary"><PersonIcon/>{service.responsible}</Typography>
                    </div>
                </div>
                <div className="card-footer">
                        <span><Typography variant="h5"> ${service.cost} </Typography></span>
                        <Button variant="contained" size="small">Contactar</Button>
                </div>
            </CardContent>
        </Card>
    );
}