import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import DateRangeIcon from '@mui/icons-material/DateRange';
import "./ServiceCard.css"
import Button from '@mui/material/Button';
import {CardHeader, Divider} from "@mui/material";
import {Service} from "../../Entities/Service";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import GradeIcon from '@mui/icons-material/Grade';

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard(props: ServiceCardProps) {

    const service = props.service
    const setType = (type: string) => {
        return type==='Group'? 'Grupal' : 'Individual';
    }

    const setFrequency = (frequency: string) => {
        if(frequency === 'unique')
            return "Única"
        else if (frequency === 'weekly')
            return 'Semanal'
        return 'Mensual'
    }

    return (
        <Card sx={{ maxWidth: 400 }} elevation={8}>
            <CardHeader
            title={service.title}
            subheader= {service.description}/>
            <CardContent style={{ paddingTop: '4px' }}>
                <div>
                    <div className={'class-info'}>
                        <div className={'class-info-items'}>
                            <Typography className="description-points" color="textSecondary"><AccessTimeIcon/>{service.duration}</Typography>
                            <Typography className="description-points" color="textSecondary"><EventIcon/>{setFrequency(service.frequency)}</Typography>
                            <Typography className="description-points" color="textSecondary"><PeopleIcon/>{setType(service.type)}</Typography>
                        </div>
                        <div className={'class-info-items'} >
                            <div style={{display:'flex', gap: 5, alignItems: "center"}}>
                            <Typography className="description-points" color="textSecondary"><DateRangeIcon/></Typography>
                            <Typography className="description-points" color="textSecondary">Lun</Typography>
                            <Typography className="description-points" color="textSecondary">Mar</Typography>
                            <Typography className="description-points" color="textSecondary">Mie</Typography>
                            <Typography className="description-points" color="textSecondary">Jue</Typography>
                            <Typography className="description-points" color="textSecondary">Vie</Typography>
                            </div>
                            <Typography className="description-points" color="textSecondary"><GradeIcon/>{service.rating}</Typography>
                        </div>
                    </div>
                    <div>
                        <div className={'responsible-name'}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>
                            <Typography variant="body2" color="text.secondary">{service.responsible}</Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">{service.responsibleExperience}</Typography>
                    </div>
                </div>
                <div className="card-footer">
                    <Divider/>
                    <div className="footer-content">
                            <span style={{display: 'flex'}}><Typography variant="h5"> ${service.cost} </Typography><Typography className="cost-info" color="textSecondary"> p/clase</Typography></span>
                            <Button variant="contained" size="small">Contactar</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}