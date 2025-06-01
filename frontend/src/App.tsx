import { ThemeProvider } from 'styled-components'
import { mainTheme } from './style/theme';
import Navbar from './components/navbar';
import Home from './features/pages/home';

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Navbar/>
      <Home/>
    </ThemeProvider>
  )
}

export default App
