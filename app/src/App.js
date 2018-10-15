import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TestPage from './components/TestPage';
import DataProvider from './providers/DataProvider';
import ThemeProvider from './providers/ThemeProvider';

const App = () => (
  <CssBaseline>
    <DataProvider>
      <ThemeProvider>
        <TestPage />
      </ThemeProvider>
    </DataProvider>
  </CssBaseline>
);

export default App;
