import { useState, useEffect } from 'react';
import Chat from './Chat/Chat';
import Sidebar from './Sidebar/Sidebar';
import axios from 'axios';

const Messages = ({ history }) => {
    const [image, setImage] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login')
        }

        const username = localStorage.getItem('user');

        const config = {
            params: {
                user: username
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        }

        axios.get('/user', config)
            .then(res => {
                setImage(res.data)
                console.log(res.data)
            })

    }, [history])

    return (
        <div className="container">
            <Sidebar image={image} />
            <Chat image={image} />
        </div>

    )
};

export default Messages;