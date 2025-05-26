'use client';

import React, { Fragment, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { menuList } from "../../../../utils/fackData/menuList";
import getIcon from "../../../../utils/getIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Custom hook to fetch current user info
function useCurrentUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user || null);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    return { user, loading };
}

const Menus = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openSubDropdown, setOpenSubDropdown] = useState(null);
    const [activeParent, setActiveParent] = useState(null);
    const [activeChild, setActiveChild] = useState(null);
    const pathName = usePathname();

    const { user, loading } = useCurrentUser();

    useEffect(() => {
        console.log("👤 User:", user);
    }, [user]);

    // Edited filtering logic here:
    const filteredMenu = user && user.role === "admin"
  ? menuList
  : user
    ? menuList.filter(item => {
        if (!item.role) return true;
        return item.role === user.role;
      })
    : []; // empty array when no user yet


    useEffect(() => {
        console.log("📋 Filtered Menu:", filteredMenu);
    }, [filteredMenu]);

    useEffect(() => {
        if (pathName !== "/") {
            const parts = pathName.split("/");
            setActiveParent(parts[1]);
            setActiveChild(parts[2]);
            setOpenDropdown(null);
            setOpenSubDropdown(null);
        } else {
            setActiveParent(null);
            setOpenDropdown(null);
            setOpenSubDropdown(null);
        }
    }, [pathName]);

    if (loading) {
        return <div className="text-center text-sm text-gray-500 py-4">🔄 Loading menus...</div>;
    }

    if (!user) {
        return <div className="text-center text-red-500 py-4">❌ Please login to see menu</div>;
    }

    const handleMainMenu = (e, id) => {
        setOpenDropdown(prev => (prev === id ? null : id));
    };

    const handleDropdownMenu = (e, name) => {
        e.stopPropagation();
        setOpenSubDropdown(prev => (prev === name ? null : name));
    };

    return (
        <>
            {filteredMenu.map((item) => {
                if (item.type === "heading") {
                    return (
                        <li key={item.id} className="nxl-heading px-4 py-2 text-xs text-muted uppercase tracking-wide">
                            {item.name}
                        </li>
                    );
                }

                const { dropdownMenu, id, name, path, icon } = item;
                const showDropdown = dropdownMenu && dropdownMenu.length > 0;

                return (
                    <li
                        key={id}
                        onClick={(e) => handleMainMenu(e, id)}
                        className={`nxl-item nxl-hasmenu ${activeParent === id ? "active nxl-trigger" : ""}`}
                    >
                        <Link href={path} className="nxl-link text-capitalize">
                            <span className="nxl-micon">{getIcon(icon)}</span>
                            <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
                                {name}
                            </span>
                            <span className="nxl-arrow fs-16">
                                <FiChevronRight />
                            </span>
                        </Link>

                        {showDropdown && (
                            <ul className={`nxl-submenu ${openDropdown === id ? "nxl-menu-visible" : "nxl-menu-hidden"}`}>
                                {dropdownMenu.map(({ id: childId, name, path, subdropdownMenu = [], target }) => {
                                    const isActive = pathName === path;

                                    return (
                                        <Fragment key={childId}>
                                            {subdropdownMenu.length > 0 ? (
                                                <li
                                                    className={`nxl-item nxl-hasmenu ${activeChild === name ? "active" : ""}`}
                                                    onClick={(e) => handleDropdownMenu(e, name)}
                                                >
                                                    <Link href={path} className="nxl-link text-capitalize">
                                                        <span className="nxl-mtext">{name}</span>
                                                        <span className="nxl-arrow">
                                                            <FiChevronRight />
                                                        </span>
                                                    </Link>
                                                    <ul className={`nxl-submenu ${openSubDropdown === name ? "nxl-menu-visible" : "nxl-menu-hidden"}`}>
                                                        {subdropdownMenu.map(({ id, name, path }) => (
                                                            <li key={id} className={`nxl-item ${pathName === path ? "active" : ""}`}>
                                                                <Link className="nxl-link text-capitalize" href={path}>
                                                                    {name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ) : (
                                                <li className={`nxl-item ${isActive ? "active" : ""}`}>
                                                    <Link className="nxl-link" href={path} target={target}>
                                                        {name}
                                                    </Link>
                                                </li>
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </ul>
                        )}
                    </li>
                );
            })}
        </>
    );
};

export default Menus;
