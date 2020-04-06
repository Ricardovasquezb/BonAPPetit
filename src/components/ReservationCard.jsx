import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../assets/css/card-views.css'
import { useHistory } from "react-router-dom"
import { arrayFirebaseParser } from "../utils"

const CardView = props => {
    const { push: toLocation } = useHistory()
    const [data, setData] = useState([]);

    useEffect(() => {
        props.firebaseInstance.ref("/reservations").once("value")
            .then(snapShot => {
                const val = snapShot.val()
                const dataParsed = arrayFirebaseParser(val)
                console.log(dataParsed)
                setData(dataParsed)
            })
            .catch(e => {
                console.error(e)
            })
    }, [])
    
    const toDetailsReservation = (reservationId) => () => {
        toLocation("/new-reservation/" + reservationId)
    }
    return(
    <div className='card-views'>
        {
            data.map((item, key) => (   
                
                <Card 
                    key={key}
                    bg={"dark"}
                    text={'light'}
                    style={{ width: '18rem' }}
                >
                    <Card.Img variant="top" src={item.profileurl}/>
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle className="mb-2">{item.direction}</Card.Subtitle>
                        <Button variant={item.button_variant} onClick={toDetailsReservation(item.uid)}>
                            {"Ver reservacion"}
                        </Button>
                        <Card.Link href={`#/${item.href}`}>{item.link}</Card.Link>
                    </Card.Body>
                </Card>
            ))
        }
    </div>
  );
}

export default CardView;