declare module '@mui/material/styles/createTheme' {
  interface Theme {
    themeToggler: () => void;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    themeToggler?: () => void;
  }
}
