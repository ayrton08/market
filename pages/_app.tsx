import '../styles/global.css';
import { Footer } from 'ui';
import { RecoilRoot } from 'recoil';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Header } from '../components/ui/Header';
import { lightTheme } from '../themes/light-theme';
import { CartProvider } from 'context';

const theme = createTheme({
  type: 'light',
});

function MyApp({ Component, pageProps }: any) {
  return (
    <CartProvider>
      <RecoilRoot>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />

          <NextUIProvider theme={theme}>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </NextUIProvider>
        </ThemeProvider>
      </RecoilRoot>
    </CartProvider>
  );
}

export default MyApp;
