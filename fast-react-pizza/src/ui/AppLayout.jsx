import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"
import Loader from "./Loader";
function AppLayout() {
    const nav = useNavigation();
    const isLoading = nav.state === "loading";
    return (
        <div className="grid h-screen
        grid-rows-[auto_1fr_auto] ">
            {isLoading && <Loader />}
            <Header />
            <div className="overflow-scroll">
            <main className=" max-w-3xl mx-auto">
                <Outlet />
            </main>
            </div>
            <CartOverview />
        </div>
    )
}

export default AppLayout
