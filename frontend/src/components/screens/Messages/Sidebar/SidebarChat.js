import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './SidebarChat.css'

function SidebarChat() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        axios.get('/rooms', config)
            .then(res => {
                console.log(res.data)
                setData(res.data)
            })
    }, []);

    return (<div>

        {data.map((data) => {

            return <Link to={`/${data.url}`}>
                <div className="sidebar-chat">
                    <div className="random" style={{ backgroundColor: `${data.color}` }}></div>
                    <div className="chat-info">
                        <h2>{data.name}</h2>
                    </div>
                </div>
            </Link>
        })}


    </div>
    )
}

export default SidebarChat
