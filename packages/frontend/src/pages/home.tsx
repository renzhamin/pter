import { axiosClient } from "@/config/axios"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        axiosClient.get("/user/id").then((res) => {
            // accessing protected routes
            console.log("response data", res.data)
        })
    }, [])
    return (
        <div>
            <p>Home</p>
        </div>
    )
}
