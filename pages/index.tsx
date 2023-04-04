import type { NextPage } from "next"
import { useState } from "react"
import {
    useViewerConnection,
    useViewerRecord,
    usePublicRecord,
} from "@self.id/react"
import { EthereumAuthProvider, SelfID } from "@self.id/web"

const Home: NextPage = () => {
    async function createAuthProvider() {
        // The following assumes there is an injected `window.ethereum` provider
        const addresses = await window?.ethereum.request({
            method: "eth_requestAccounts",
        })
        return new EthereumAuthProvider(window?.ethereum, addresses[0])
    }

    const [selfID, setSelfID] = useState<any>()

    console.log({ selfID })

    async function createSelfID() {
        // The following assumes there is an injected `window.ethereum` provider
        const addresses = await window?.ethereum.request({
            method: "eth_requestAccounts",
        })

        const self = await SelfID?.authenticate({
            authProvider: new EthereumAuthProvider(
                window?.ethereum,
                addresses[0]
            ),
            ceramic: "testnet-clay",
        })

        setSelfID(self)

        console.log("yo we're here ! ")

        const result = await selfID.set("basicProfile", {
            name1: "Shivalala",
            name2: "Kunalala",
            name3: "Athulala",
            name4: "Pranavala",
            name5: "aditalala",
            name6: "Nirbalala",
            contentTypes: [
                "reaction",
                "reply",
                "attachments",
                "poll",
                "patna junction",
                "Goa Girls"
            ],
        })

        console.log({ result })

        return self
    }

    async function setBasicProfile() {
        // Use the SelfID instance created by the `createSelfID()` function
        const result = await selfID.set("basicProfile", {
            name1: "Shivalala",
            name2: "Kunalala",
            name3: "Athulala",
            name4: "Pranavala",
            name5: "aditalala",
            name6: "Nirbalala",
            contentTypes: [
                "reaction",
                "reply",
                "attachments",
                "poll",
                "patna junction",
                "Goa Girls"
            ],
        })
        console.log({ result })
        return result
    }

    const [connection, connect, disconnect] = useViewerConnection()

    const record = useViewerRecord("basicProfile")

    console.log({ record })

    return typeof window !== "undefined" ? (
        connection.status === "connected" ? (
            <>
                <button
                    onClick={() => {
                        disconnect()
                    }}
                >
                    Disconnect ({connection.selfID.id})
                </button>
                <button
                    onClick={createSelfID}
                    className="bg-white p-5 mx-5 text-black"
                >
                    createSelfID
                </button>
                <button
                    onClick={setBasicProfile}
                    className="bg-white p-5 mx-5 text-black"
                >
                    setBasicProfile
                </button>
            </>
        ) : "ethereum" in window ? (
            <button
                disabled={connection.status === "connecting"}
                onClick={() => {
                    createAuthProvider().then(connect)
                }}
            >
                Connect
            </button>
        ) : (
            <p>
                An injected Ethereum provider such as{" "}
                <a href="https://metamask.io/">MetaMask</a> is needed to
                authenticate.
            </p>
        )
    ) : (
        <></>
    )
}

export default Home
