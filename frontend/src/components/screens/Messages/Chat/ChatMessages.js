import React from 'react'
import './Chat.css';

function ChatMessages({ data }) {
    return (

        data.repeat === false ? (<div className={'chat-message'}>
            <img
                src={data.image} className="placeholder-image"
            />
            <div className="chat-message-right">
                <div className="chat-message-top">
                    <span className="chat-name">{data.name}</span>
                    <span className="chat-timestamp">{data.time}</span>
                </div>

                <p className="chat-message-text">{data.message}</p>
            </div>
        </div>) : (<div className="repeat-message">{data.message}</div>)


    )
}

export default ChatMessages
