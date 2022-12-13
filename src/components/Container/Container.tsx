import React, { useState, useEffect } from 'react';
import MessageForm from '../MessageForm/MessageForm';
import TableWithMessage from '../TableWithMessage/TableWithMessage';
import './Container.scss'



const Container = () => {
    const [messages, setMessages] = useState(null);
    const [user, setUser] = useState('');
    const [region, setRegion] = useState('');
    const [theme, setTheme] = useState('');
    const [bodyMessage, setBodyMessage] = useState('');
    const [title, setTitle] = useState('Письмо');
    const [readOnly, setReadOnly] = useState(false);

    useEffect(() => {
        const storageData = localStorage.getItem('formData');
        if (storageData) {
            setMessages(JSON.parse(storageData))
        }

    }, [])

    return (
        <div className='container'>
            <TableWithMessage
                messages={messages}
                user={user}
                region={region}
                theme={theme}
                bodyMessage={bodyMessage}
                setTheme={setTheme}
                setUser={setUser}
                setRegion={setRegion}
                setBodyMessage={setBodyMessage}
                setReadOnly={setReadOnly}
                setTitle={setTitle}
                setMessages={setMessages}
            />
            <MessageForm
                messages={messages}
                user={user}
                region={region}
                theme={theme}
                bodyMessage={bodyMessage}
                title={title}
                readOnly={readOnly}
                setMessages={setMessages}
                setUser={setUser}
                setRegion={setRegion}
                setTheme={setTheme}
                setBodyMessage={setBodyMessage}
                setReadOnly={setReadOnly}
                setTitle={setTitle}
            />
        </div>

    );
};

export default Container;