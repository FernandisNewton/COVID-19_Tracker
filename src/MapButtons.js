import React from 'react'
import './Map.css'
import {Card,CardContent} from '@material-ui/core'
function MapButtons({title,active,isRed, ...props}) {
    return (
      
             <Card
             onClick={props.onClick}
             className={`button ${active && "button--selected"} ${isRed && 'button--red'}` }>
                
            <CardContent>
                
         <h2 className="title">{title}</h2>
           
            </CardContent>
        </Card> 
      
    )
}

export default MapButtons
