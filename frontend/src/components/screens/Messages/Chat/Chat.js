import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import ChatMessages from './ChatMessages';
import './Chat.css'
import AddMessage from './AddMessage';
import axios from 'axios';
import Pusher from 'pusher-js';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ image }) {
    const [data, setData] = useState([]);
    const roomName = useParams().id;

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        axios.get('/', config)
            .then(res => {
                setData(res.data)
            })
    }, []);

    useEffect(() => {
        const pusher = new Pusher('a638627c0b2d7ee10312', {
            cluster: 'us2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (newMessage) {
            setData([...data, newMessage])
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [data])

    let messages = data.filter((message) => message.room === roomName);
    let check = 'name';
    messages.forEach((message) => {
        if (check === message.name) {
            message.repeat = true;
        } else {
            check = message.name;
        }
    });

    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="header-info">
                    <h3>{roomName}</h3>
                </div>
                <Link to='/login'><button className="logout-btn" onClick={() => { logoutHandler() }}>Log Out</button></Link>

            </div>
            <ScrollToBottom className="chat-body">

                {messages.map((message, index) => {

                    return <ChatMessages key={index} data={message} />
                })}

            </ScrollToBottom>



            <AddMessage image={image} room={roomName} />
        </div>
    )
}

export default Chat
