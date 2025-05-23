'use client'
import { usePathname } from "next/navigation";
import Header from "../../../components/account-comp/shared/header/Header";
import NavigationManu from "../../../components/account-comp/shared/navigationMenu/NavigationMenu";
import SupportDetails from "../../../components/account-comp/supportDetails";
import dynamic from "next/dynamic";
import useBootstrapUtils from "../../../hooks/useBootstrapUtils";

// const useBootstrapUtils = dynamic(() => import('@/hooks/useBootstrapUtils'), { ssr: false })

const layout = ({ children }) => {
    const pathName = usePathname()
    useBootstrapUtils(pathName)

    return (
        <>
            <Header />
            <NavigationManu />
            <main className="nxl-container">
                <div className="nxl-content">
                    {children}
                </div>
            </main>
            <SupportDetails />
        </>
    )
}

export default layout