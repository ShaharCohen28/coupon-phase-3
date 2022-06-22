import MyFooter from "../myFooter/myFooter";
import MyHeader from "../myHeader/myHeader";
import MyMain from "../myMain/myMain";
import MyMenu from "../myMenu/myMenu";
import "./mainLayout.css";
import RoutingManager from '../../Routing/routingManager/routingManager';
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../../../redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber, deepOrange, green, grey, lightBlue, purple, orange } from '@mui/material/colors';
import { PaletteMode, Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CssBaseLine from '@mui/material/CssBaseline'

function MainLayout(): JSX.Element {
    const [isDark, setIsDark]=useState(false);
const theme=createTheme({
    palette:{
        // primary:{
        //     main:isDark?purple['A100']:'#32cb00'
        // },
        // secondary:{
        //     main:isDark?'#76ff03':purple['A100']
        // },
        primary:{
            main:isDark?'#c77c02':'#ffab40'
        },
        secondary:{
            main:isDark?'#4093ff':'#0066cb'
        },
        error:{
            main:isDark?'#c40017':'#ff4d40'
        },
        warning:{
            main:isDark?'#f2ff4e':'#ed6c02'
        },
        mode:isDark?'dark':'light'
        
    },
});


const changeCurrentMode=()=>{
    setIsDark(!isDark);
    // console.log(theme);
    return isDark;
}


    return (
        
        <div className="mainLayout">
            <BrowserRouter>
                
                {/* <Provider store={store} > */}
                    <ThemeProvider theme={theme}>
                        <CssBaseLine/>
                        {/* <header>
                            <MyHeader currentMode={isDark} changeMode={changeCurrentMode}/>
                        </header> */}
                        <body>
                            <MyHeader currentMode={isDark} changeMode={changeCurrentMode}/><br/>
                            <RoutingManager/>
                        </body>
                        <footer>
                            <MyFooter/>
                        </footer>
                    </ThemeProvider>
                {/* </Provider> */}
                
            </BrowserRouter>
        </div>
        
    );
}

export default MainLayout;
