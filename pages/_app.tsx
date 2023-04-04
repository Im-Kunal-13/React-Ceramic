import "../styles/globals.scss"
import "tailwindcss/tailwind.css"
import type { AppProps } from "next/app"
import { Provider } from "@self.id/react"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider client={{ ceramic: "testnet-clay" }}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
