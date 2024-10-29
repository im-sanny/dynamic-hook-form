import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "dark",
        }
      })}
    >
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)