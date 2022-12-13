import React, { FC, useEffect, useState } from 'react';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SearchRounded } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Box,
    TextField,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { TypeMessages, TypeProps } from '../../types/propsType';

import '../../style/box.scss';
import '../../style/title.scss';
import './TableWithMessage.scss';


const TableWithMessage: FC<TypeProps> = ({
    messages,
    setTheme,
    setUser,
    setRegion,
    setBodyMessage,
    setReadOnly,
    setTitle,
}) => {
    const [timeFrom, setTimeFrom] = useState(null);
    const [timeTo, setTimeTo] = useState(null);
    const [page, setPage] = useState<number>(1);
    const [messagesPagination, setMessagesPagination] = useState<TypeMessages[]>([]);
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQury] = useState('');
    const countPagination = messages ? Math.ceil(JSON.parse(localStorage.getItem('formData') || '').length / 8) : 0;


    // useEffect(() => {
    //     console.log('Следит за message', messages);
    // }, [messages])

    useEffect(() => {
        const start = page === 1 ? 0 : (page - 1) * 8;
        const end = page * 8;
        const startTime = timeFrom ? new Date(timeFrom).getTime() : null;
        const endTime = timeTo ? new Date(timeTo).setDate(new Date(timeTo).getDate() + 1) : null;
        let filterMessages = searchQuery ? messages?.filter((message: any) => message.theme.toLowerCase().includes(searchQuery.toLowerCase())) : messages

        if (startTime) {
            filterMessages = filterMessages?.filter((message: any) => message.date > startTime)
        }
        if (endTime) {
            filterMessages = filterMessages?.filter((message: any) => message.date < endTime)
        }
        if (filterMessages) {
            setMessagesPagination(filterMessages?.slice(start, end));
        }

    }, [messages, page, searchQuery, timeFrom, timeTo])

    const handleChangeTimeFrom = (newValue: any) => {
        if (newValue?.$d) {
            setTimeFrom(newValue.$d);
        }

    };

    const handleChangeTimeTo = (newValue: any) => {
        if (newValue?.$d) {
            setTimeTo(newValue.$d);
        }
    };

    const clearDateFrom = () => {
        setTimeFrom(null);
    }
    const clearDateTo = () => {
        setTimeTo(null);
    }

    const handleClickRow = (mes: TypeMessages) => {
        setTheme(mes.theme)
        setUser(mes.user)
        setRegion(mes.region)
        setBodyMessage(mes.bodyMessage)
        setTitle(mes.idMessage)
        setReadOnly(true)
    }

    const handlerSearch = () => {
        setSearchQury(search) // для того, чтобы срабатывало только при клике на лупу. его ставим зависимости
    }

    const clearSearch = () => {
        setSearch('');
        setSearchQury('');
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    return (
        <Box
            className="modal_box"
        >
            <div className='title'>История писем</div>
            <div className='header'>
                <div className='header-date-picker'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <div className="date-picker-wrapper">
                            <DesktopDatePicker
                                className="date-from"
                                label="С"
                                maxDate={timeTo}
                                inputFormat="DD.MM.YYYY"
                                value={timeFrom}
                                onChange={handleChangeTimeFrom}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <IconButton
                                className="button clear-date-peacker"
                                onClick={clearDateFrom}
                            >
                                <ClearIcon sx={{ display: timeFrom ? 'block' : 'none' }} />
                            </IconButton>
                        </div>
                        <div className="date-picker-wrapper">
                            <DesktopDatePicker
                                label="По"
                                minDate={timeFrom}
                                inputFormat="DD.MM.YYYY"
                                value={timeTo}
                                onChange={handleChangeTimeTo}
                                renderInput={(params) => <TextField {...params} />}
                            >
                            </DesktopDatePicker>
                            <IconButton
                                className="button clear-date-peacker"
                                onClick={clearDateTo}

                            >
                                <ClearIcon sx={{ display: timeTo ? 'block' : 'none' }} />
                            </IconButton>
                        </div>
                    </LocalizationProvider>
                </div>

                <div>
                    <TextField
                        className="search-fieled"
                        id="outlined-search"
                        placeholder="Поиск по записям"
                        // type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="small"
                        autoFocus
                        fullWidth
                        onKeyDown={(e) => e.key === 'Enter' ? handlerSearch() : null}
                        InputProps={{
                            className: 'input',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        className="button"
                                        onClick={handlerSearch}
                                    >
                                        <SearchRounded />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        className="button"
                                        onClick={clearSearch}
                                    >
                                        <ClearIcon sx={{ display: search ? 'block' : 'none' }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

            </div>
            <TableContainer component={Paper}>
                <Table
                    aria-label="simple table"
                    size="medium"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ paddingLeft: 3.5 }}>ID</TableCell>
                            <TableCell align="left">Тема</TableCell>
                            <TableCell align="left">Дата и время отправки</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody

                    >
                        {messagesPagination ? messagesPagination.map((message: any) => (
                            <TableRow
                                hover
                                key={message.idMessage}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => handleClickRow(message)}
                            >
                                <TableCell component="th" scope="row" sx={{ fontSize: 16, paddingLeft: 3.5 }}>
                                    {message.idMessage}
                                </TableCell>
                                <TableCell align="left" >{message.theme.length > 30 ? `${message.theme.slice(0, 30)}...` : message.theme}</TableCell>
                                <TableCell align="left" >{message.dateSent}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={countPagination}
                color="primary"
                onChange={handleChangePage}
            />

        </Box >
    );
};

export default TableWithMessage;



