import { Outlet } from "react-router-dom"
import TopBar from "./TopBar"

function MainApp() {
    return (
        <>
            <TopBar/>
            <div className="textcenter contentdiv lesstoproom">
                <Outlet/>
            </div>
        </>
    )
}

export default MainApp