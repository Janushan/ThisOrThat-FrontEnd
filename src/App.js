import './App.css';
import React, {Component} from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import Header from './Components/Header'

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: "#1da1f2",
      light: "#E8EEF8",
      dark: "#0c90e1"
    },
    secondary: {
      main: "#657786",
      light: "#E8EEF8",
      dark: "#2653A6"
    },
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StylesProvider injectFirst>
            <Header/>
        </StylesProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
