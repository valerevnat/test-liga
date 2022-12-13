import React, { FC, useState, useEffect } from 'react';
import { Box, MenuItem, TextField, Button } from '@mui/material';
import { users, regions } from '../../mockData';
import { TypeProps } from '../../types/propsType';

import '../../style/box.scss';
import '../../style/title.scss';
import './MessageForm.scss'


const style = {
    minWidth: 552
}

const MessageForm: FC<TypeProps> = ({
    messages,
    setMessages,
    user,
    setUser,
    region,
    setRegion,
    theme,
    setTheme,
    bodyMessage,
    setBodyMessage,
    readOnly,
    title,
    setReadOnly,
    setTitle
}: any) => {

    useEffect(() => {
        console.log(messages);

    }, [messages])

    const [error, setError] = useState(false)

    const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    };

    const handleChangeRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegion(event.target.value);
    };

    const handleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.value)
    };
    const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBodyMessage(event.target.value)
    };

    const submintForm = () => {
        const dateSent = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, -3)}`;
        const date = new Date().getTime()  // для даты в формате js
        const idMessage = messages?.length ? messages[messages.length - 1].idMessage + 1 : 1;
        const formData = {
            idMessage,
            theme,
            user,
            region,
            bodyMessage,
            dateSent,
            date
        }

        if (!formData.theme) {
            setError(true)
            return null
        }

        // два варианта: или у нас в локал что-то лежит, или это первая запись
        // к local мы обращаемся один раз
        // реактивно меняться таблица... поэтому setMessages делаем
        if (title !== 'Письмо' && !readOnly) {
            //@ts-ignore
            let index = messages.findIndex(el => el.idMessage === title);
            const editedMessages = [...messages.slice(0, index), { ...formData, idMessage: title }, ...messages.slice(index + 1)];
            setMessages(editedMessages)
            localStorage.setItem('formData', JSON.stringify(editedMessages));
        } else if (messages) {
            localStorage.setItem('formData', JSON.stringify([...messages, formData])) // localStorage не умеет следить за изменениями
            setMessages([...messages, formData]) // поэтому создаем состояние, которое будем изменять, чтобы происходил перерендер
        } else {
            localStorage.setItem('formData', JSON.stringify([formData]))
            setMessages([formData])
        }

        setTheme('')
        setUser('')
        setRegion('')
        setBodyMessage('')
        setTitle('Письмо')
        setError(false)
    }

    const changeForm = () => {
        setReadOnly(false)
        console.log('title', title);

    }

    const cancelSent = () => {
        const messagesWithoutCansel = messages.filter((item: any) => item.idMessage !== title);
        setReadOnly(false)
        setMessages(messagesWithoutCansel)
        setTheme('')
        setUser('')
        setRegion('')
        setBodyMessage('')
        setTitle('Письмо')
    }

    const btnChange = readOnly ?
        (<>
            <Button
                sx={{ marginTop: 4, marginRight: 3, borderColor: '#168FF7', fontSize: 15 }}
                variant="outlined"
                onClick={changeForm}
            >
                Изменить
            </Button>
            <Button
                sx={{ marginTop: 4, background: '#168FF7', fontSize: 15 }}
                variant="contained"
                onClick={cancelSent}
            >
                Отменить отправку
            </Button>
        </>) : null



    return (
        <Box
            sx={style}
            className="modal_box"
        >
            <div className='title'>{title}</div>
            <div className='form-message-wrapper'>
                <div className='formMessage'>
                    <div className='form-message-input' >
                        <TextField
                            className={readOnly ? 'disabled' : ''}
                            id="outlined-basic"
                            label="Тема"
                            variant="outlined"
                            value={theme}
                            disabled={readOnly}
                            onChange={handleTheme}
                            required
                            error={error}
                            helperText={error ? 'Поле обязательно для заполнения' : ''}

                        />
                    </div>
                    <div className='form-message-input'>
                        <TextField
                            className={readOnly ? 'disabled' : ''}
                            id="outlined-select-currency"
                            select
                            label="Выберите пользователей"
                            value={user}
                            disabled={readOnly}
                            onChange={handleChangeUser}
                        >
                            {users.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='form-message-input'>
                        <TextField
                            className={readOnly ? 'disabled' : ''}
                            id="outlined-select-currency"
                            select
                            label="Выберите регион"
                            value={region}
                            disabled={readOnly}
                            onChange={handleChangeRegion}
                        >
                            {regions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className='form-message-input'>
                        <TextField
                            className={readOnly ? 'disabled' : ''}
                            id="outlined-textarea"
                            label="Тело"
                            placeholder="Введите сообщение"
                            multiline
                            rows={7}
                            value={bodyMessage}
                            disabled={readOnly}
                            onChange={handleChangeBody}
                        />
                    </div>
                </div>
                <div className='formMessage__btn'>
                    {btnChange}
                    <Button
                        sx={{ marginTop: 4, background: '#168FF7', fontSize: 15, display: readOnly ? 'none' : 'block' }}
                        variant="contained"
                        onClick={submintForm}
                    >
                        Отправить
                    </Button>

                </div>
            </div>



        </Box>

    );
};

export default MessageForm;