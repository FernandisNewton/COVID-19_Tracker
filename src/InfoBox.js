import React from 'react'
import './Infobox.css'
import {Card,CardContent,Typography} from '@material-ui/core'
function InfoBox({title,cases,total,isRed}) {
    return (
        <Card className="infobox">
            <CardContent>
                <Typography className="infobox__title" color="textSecondary" >
                <h4>{title}</h4>
                </Typography>
         <h2 className={`infobox__cases ${!isRed && "infobox__cases--green"}`}>{cases}</h2>
           <Typography className="infobox__total" color="textSecondary">
               in {total}  
           </Typography>
            </CardContent>
        </Card> 
    )
}

export default InfoBox
