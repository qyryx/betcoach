import Marquee from "react-fast-marquee";
import { useState, useEffect } from 'react';
import httpClient from "../httpClient";

const Footer = () => {
    const [feed, setFeed] = useState('')

    useEffect(() => {
        function fetchData() {
            httpClient.get('/ticket/feed')
                .then(response => {
                    if (response.data && response.data.length !== 0) {
                        setFeed(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchData();
    }, []);

    return (
        <div className='footer'>
            <div style={{ width: 180 }}>Ticket arena</div>
            <div style={{ width: 10, borderLeft: '1px solid grey', height: '100%' }}> </div>
            <Marquee>{feed}</Marquee>
            <div style={{ width: 10, borderRight: '1px solid grey', height: '100%' }}> </div>
            <div style={{ width: 400 }}>BetCoach® - Andrej Horník 2023</div>
        </div>
    )
}

export default Footer