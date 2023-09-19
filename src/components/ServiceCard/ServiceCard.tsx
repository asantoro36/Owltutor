import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import "./ServiceCard.css"
import Button from '@mui/material/Button';
import {CardHeader} from "@mui/material";

export default function RecipeReviewCard() {

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardHeader
            title="Clases de Guitarra para Principiantes"
            style={{ paddingBottom: '4px' }}>

            </CardHeader>
            <CardContent style={{ paddingTop: '4px' }}>
                <div className="card-content">
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            Aprende a tocar la guitarra desde cero con nuestro curso de guitarra para principiantes. Nuestro experimentado instructor te guiará a través de las bases de la guitarra, desde acordes simples hasta canciones populares. No se requiere experiencia previa. Trae tu propia guitarra o utiliza una de las nuestras.
                        </Typography>
                    </div>
                    <div className="divider"/>
                    <div>
                        <Typography className="description-points" color="textSecondary"><AccessTimeIcon/>8 Semanas</Typography>
                        <Typography className="description-points" color="textSecondary"><EventIcon/>Semanal</Typography>
                        <Typography className="description-points" color="textSecondary"><PeopleIcon/>Grupal</Typography>
                    </div>
                </div>
                <div className="card-footer">
                        <span><Typography variant="h5"> $5000 </Typography></span>
                        <Button variant="contained" size="small">Contactar</Button>
                </div>
            </CardContent>
        </Card>
    );
}