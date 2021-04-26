import React, { useState } from 'react'
import './Sidebar.css'
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SidebarChat from './SidebarChat';

function Sidebar({ image }) {

    const [display, setDisplay] = useState(false);
    const [room, setRoom] = useState('');

    const addRoom = () => {
        setDisplay(!display);
    }

    const submitMessage = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const color = `rgb(${r}, ${g}, ${b})`
        console.log(color);

        const newRoom = {
            name: room,
            url: room,
            color
        }
        await axios.post('/new', newRoom, config);

        window.location = `/${room}`;

    }

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <div className="sidebar-header-left">
                    <img src={image} className="placeholder-image" />
                    <div className="online"></div>
                </div>
                <IconButton onClick={() => addRoom()}>
                    <AddIcon />
                </IconButton>


            </div>
            <div className="chats">
                <SidebarChat />
                {display === true ? (
                    <form>
                        <input
                            className="add-room-input"
                            type="text"
                            placeholder="Add New Room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                        <button className="add-room-btn" onClick={(e) => submitMessage(e)} type="submit">Send Message</button>
                    </form>
                ) : null}

            </div>
        </div>
    )
}

export default Sidebar
