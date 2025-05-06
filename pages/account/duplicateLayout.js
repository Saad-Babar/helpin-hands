'use client'
import { usePathname } from "next/navigation";
import Header from "../../components/account-comp/shared/header/Header";
import NavigationManu from "../../components/account-comp/shared/navigationMenu/NavigationMenu";
import SupportDetails from "../../components/account-comp/supportDetails";
import useBootstrapUtils from "../../hooks/useBootstrapUtils";
import NavigationProvider from "../../utils/navigationProvider"; // ✅ Import the provider

export default function DuplicateLayout({ children }) {
    const pathName = usePathname();
    useBootstrapUtils(pathName);

    return (
        <NavigationProvider> {/* ✅ Wrap everything inside this */}
            <Header />
            <NavigationManu />
            <main className="nxl-container">
                <div className="nxl-content">
                    {children}
                </div>
            </main>
            <SupportDetails />
        </NavigationProvider>
    );
}
