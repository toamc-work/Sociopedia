import React, {useMemo} from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { CssBaseline, ThemeProvider } from '@mui/material'; 
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from './scenes/home-page';
import ProfilePage from './scenes/profile-page';
import AuthPage from './scenes/auth-page';
import { IStateAuth } from './state';
import { ProtectRoute } from './ProtectedRoute';

function App() {
  const mode = useSelector((state:IStateAuth.IInitialState) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
 
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path='/' element={<AuthPage/>}/>
              <Route path='/home' element={<ProtectRoute element={<HomePage/>}/>}/>
              <Route path='/profile/:userId' element={<ProtectRoute element={<ProfilePage/>}/>}/>  
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
