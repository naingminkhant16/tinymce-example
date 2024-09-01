import {createContext, useContext} from "react";
import Nav from "../Components/Nav.jsx";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);
export default function Layout({children, title}) {
    return (
        <AppContext.Provider value={{}}>
            <title>{title}</title>
            <Nav/>
            <div className="container">
                <div className="mt-3 w-50 m-auto">
                    {children}
                </div>
            </div>
        </AppContext.Provider>
    );
}
