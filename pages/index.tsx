import type { NextPage } from "next"
import * as React from "react"
import { ChakraProvider, Box, theme } from "@chakra-ui/react"
import TopBar from "../components/TopBar"
import TodoList from "../components/TodoList"
import { NoSsr } from "@mui/base"
import TodoAdd from "../components/TodoAdd"

const Home: NextPage = () => {
    return (
        <ChakraProvider theme={theme}>
            <Box maxWidth="8xl" margin="auto" p={5}>
                <TopBar />
                <NoSsr>
                    <TodoList />
                </NoSsr>
                <TodoAdd />
            </Box>
        </ChakraProvider>
    )
}

export default Home
