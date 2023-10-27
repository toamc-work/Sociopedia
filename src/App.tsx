import React, {useMemo} from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { CssBaseline, ThemeProvider } from '@mui/material'; 
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from './scenes/home-page';
import ProfilePage from './scenes/profile-page';
import LoginPage from './scenes/login-page';
import { IStateAuth } from './state';

function App() {
  const mode = useSelector((state:IStateAuth.IInitialState) => state.mode);
  
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/home' element={<HomePage/>}/>
              <Route path='/profile/:userId' element={<ProfilePage/>}/>
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
