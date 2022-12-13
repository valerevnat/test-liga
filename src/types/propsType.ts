// messages?: ,
// setMessages?: ,
// user?: ,
// setUser?: ,
// region?: ,
// setRegion?: ,
// theme?: ,
// setTheme?: ,
// bodyMessage?: ,
// setBodyMessage?: ,
// readOnly?: ,
// title?: ,
// setTitle?: ,

import { Dispatch, SetStateAction } from "react";

export type TypeMessages = {
    bodyMessage: string;
    date: number;
    dateSent: string;
    idMessage: string;
    region: string;
    theme: string;
    user: string;
}

export type TypeProps = {
    messages: TypeMessages[] | null;
    user?: string | null;
    region?: string | null;
    theme?: string | null;
    bodyMessage?: string | null;
    readOnly?: boolean;
    title?: string | number;
    setMessages: Dispatch<SetStateAction<null>>;
    setUser: Dispatch<SetStateAction<string>>;
    setRegion: Dispatch<SetStateAction<string>>;
    setTheme: Dispatch<SetStateAction<string>>;
    setBodyMessage: Dispatch<SetStateAction<string>>;
    setTitle: Dispatch<SetStateAction<string>>;
    setReadOnly: Dispatch<SetStateAction<boolean>>;
}