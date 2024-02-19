import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"
import Loader from "./Loader";
function AppLayout() {
    const nav = useNavigation();
    const isLoading = nav.state === "loading";
    return (
        <div className="layout">
            {isLoading && <Loader />}
            <Header />
            <main>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    )
}

export default AppLayout
