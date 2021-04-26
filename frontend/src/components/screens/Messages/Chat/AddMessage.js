import React, { useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { MicOutlined } from '@material-ui/icons';
import axios from 'axios';
import date from 'date-and-time';

function AddMessage({ image, room }) {
    const [message, setMessage] = useState('');

    const submitMessage = async (e) => {
        e.preventDefault();

        const name = localStorage.getItem('user');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }
        const now = new Date();
        const time = date.format(now, 'h:mm A');

        const newMessage = {
            name,
            message,
            image,
            time,
            repeat: false,
            room
        }

        await axios.post('/', newMessage, config);
        setMessage('');
    }

    return (

        <div className="chat-footer">

            <form>
                <input
                    type="text"
                    placeholder="Type Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="send-btn" onClick={(e) => submitMessage(e)} type="submit">Send</button>
            </form>

        </div>

    )
}

export default AddMessage
