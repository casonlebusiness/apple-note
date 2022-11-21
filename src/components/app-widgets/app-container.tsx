import { Box } from "@mui/material"

export const AppContainer = ({ children }) => {
    return (
        <Box display={"flex"} style={{ width: "100vw", height: "100vh" }}>
            {children}
        </Box>
    )
}