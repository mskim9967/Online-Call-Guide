import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.scss';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
	  'NotoSansCJK'
    ].join(','),
  },
});

ReactDOM.render(
  <React.StrictMode>
	<MuiThemeProvider theme={theme}>
	  <App />
	</MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


