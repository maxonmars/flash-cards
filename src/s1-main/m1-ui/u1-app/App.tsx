import React from 'react';
import {Main} from "../u2-main/Main";
import {BrowserRouter} from "react-router-dom";

export const App = () => {
    return (
        <BrowserRouter>
            <div><Main/></div>
        </BrowserRouter>
    );
}