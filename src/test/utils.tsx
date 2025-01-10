import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import theme from '../theme';
import { AuthProvider } from '../context/AuthContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
