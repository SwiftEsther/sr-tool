import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AgentIcon from "./assets/icons/AgentIcon";
import DashboardIcon from "./assets/icons/DahsboardIcon";
import IncidentIcon from "./assets/icons/IncidentIcon";
import PartyIcon from "./assets/icons/PartyIcon";
import ResultIcon from "./assets/icons/ResultIcon";
import TerritoryIcon from "./assets/icons/TerritoryIcon";
import UserIcon from "./assets/icons/UserIcon";

const SideNav = ({location}) => {
    let defaultMenuList = [
        {
            name: 'Dashboard',
            icon: () => <DashboardIcon />,
            active: true,
            subMenus: [
                {
                    name: 'Result',
                    active: false,
                    path: '/dashboard/results'
                },
                {
                    name: 'Incidents',
                    active: false,
                    path: '/dashboard/incidents'
                }
            ],
            path: '/dashboard'
        },
        {
            name: 'Results',
            icon: () => <ResultIcon />,
            active: false,
            subMenus: [],
            path: '/results'
        },
        {
            name: 'Incident',
            icon: () => <IncidentIcon />,
            active: false,
            subMenus: [],
            path: '/incidents'
        },
        {
            name: 'Agents',
            icon: () => <AgentIcon />,
            active: false,
            subMenus: [],
            path: '/agents'
        },
        {
            name: 'Territories',
            icon: () => <TerritoryIcon />,
            active: false,
            subMenus: [
                {
                    name: 'States',
                    active: false,
                    path: '/territories/states'
                },
                {
                    name: 'LGAs',
                    active: false,
                    path: '/territories/lgas'
                },
                {
                    name: 'Wards',
                    active: false,
                    path: '/territories/wards'
                },
                {
                    name: 'Polling Unit',
                    active: false,
                    path: '/territories/polling-units'
                }
            ],
            path: '/territories'
        },
        {
            name: 'Users',
            icon: () => <UserIcon />,
            active: false,
            subMenus: [],
            path: '/users'
        },
        {
            name: 'Parties',
            icon: () => <PartyIcon />,
            active: false,
            subMenus: [],
            path: '/parties'
        }
    ];

    const [menus, setMenus] = useState(defaultMenuList);
    const [top, setTop] = useState([]);
    const [bottom, setBottom] = useState(defaultMenuList.slice(1, defaultMenuList.length));
    const [activeMenu, setActiveMenu] = useState();

    const updateNav = () => {
            console.log('jhg', location.pathname)
        for(let i = 0; i < menus.length; ++i) {
            if(location.pathname === menus[i].path || location.pathname.indexOf(menus[i].path) === 0) {
                setTop(menus.slice(0, i));
                setActiveMenu({...menus[i], active : true});
                setBottom(menus.slice(i+1, menus.length))
            }
        };
    }

    const updateSubmenu = () => {
        console.log('sub', activeMenu)
        if(activeMenu?.subMenus.length > 0) {
            for(let i = 0; i < activeMenu.subMenus.length; ++i) {
                if(activeMenu.subMenus[i].path === location.pathname || location.pathname.indexOf(activeMenu.subMenus[i].path) === 0) {
                    activeMenu.subMenus[i] = {...activeMenu.subMenus[i], active:true}
                }   else  {
                    activeMenu.subMenus[i] = {...activeMenu.subMenus[i], active:false}
                }
            }
        }
    }

    useEffect(() => {
        updateNav();
    }, [location])

    useEffect(() => {
        updateSubmenu();
    }, [location, activeMenu])

    return (
        <div className="side-nav h-screen bg-white fixed text-sm text-primary">
            <div className="flex flex-col h-full">
                <div className="top pt-2.5 border-r border-b border-primary">
                    <div className="mt-24">
                        
                    </div>
                    <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
                        {top.map((item, index) => (
                            <li key={index} className="w-full border-t border-primary border-opacity-10">
                                <Link to={item.path} className="flex w-full items-center py-3.5 px-5">
                                    <span className="w-2.5/10">{item.icon()}</span>
                                    <span className="6/10 mr-2 ml-4">{item.name}</span>
                                    {item.subMenus.length > 0 && 
                                        <span className="1/10">&uarr;</span>
                                    }
                                </Link>
                                {/* {(item.active && item.subMenus.length > 0) && 
                                        <div className="w-full flex">
                                            <div className="w-4/10"></div>
                                            <ul className="list-reset flex flex-column md:flex-col text-center md:text-left w-6/10 text-xs">
                                                {item.subMenus.map((subMenu, idx) => (
                                                    <li key={idx} className="">
                                                        <a className="flex w-full items-center py-1.5">
                                                            <span className={`${subMenu.active ? "font-bold" : ""} mr-2 ml-4`}>{subMenu.name}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    } */}
                            </li>
                        ))}
                    </ul>
                </div>
                {activeMenu && <div>
                    <Link to={activeMenu.path} className="flex w-full items-center py-3.5 px-5">
                        <span className="w-3/10">{activeMenu.icon()}</span>
                        <span className="6/10 mr-2 ml-4">{activeMenu.name}</span>
                        {activeMenu.subMenus.length > 0 && 
                            <span className="1/10">&darr;</span>
                        }
                    </Link>
                    {activeMenu.subMenus.length > 0 && 
                        <div className="w-full flex mb-1">
                            <div className="w-4/10"></div>
                            <ul className="list-reset flex flex-column md:flex-col text-center md:text-left w-6/10 text-xs">
                                {activeMenu.subMenus.map((subMenu, idx) => (
                                    <li key={idx} className="">
                                        <Link to={subMenu.path} className="flex w-full items-center py-1.5">
                                            <span className={`${(subMenu.active || (subMenu.path === location.pathname || location.pathname.indexOf(subMenu.path) === 0)) ? "font-bold" : ""} mr-2 ml-4`}>{subMenu.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </div>}
                <div className="bottom border-r border-t border-primary flex-grow">
                    <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
                        {bottom.map((item, index) => (
                            <li key={index} className="w-full border-t border-primary border-opacity-10">
                                <Link to={item.path} className="flex w-full items-center py-3.5 px-5">
                                    <span className="w-2.5/10">{item.icon()}</span>
                                    <span className="6/10 mr-2 ml-4">{item.name}</span>
                                    {item.subMenus.length > 0 && 
                                        <span className="1/10">&uarr;</span>
                                    }
                                </Link>
                                {/* {(item.active && item.subMenus.length > 0) && 
                                        <div className="w-full flex">
                                            <div className="w-4/10"></div>
                                            <ul className="list-reset flex flex-column md:flex-col text-center md:text-left w-6/10 text-xs">
                                                {item.subMenus.map((subMenu, idx) => (
                                                    <li key={idx} className="">
                                                        <a className="flex w-full items-center py-1.5">
                                                            <span className={`mr-2 ml-4`}>{subMenu.name}</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    } */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* <div class="w-0 md:w-1/5 bg-gray-900 md:bg-gray-900 px-2 text-center fixed md:pt-8 top-0 md:left-0 h-16 md:h-screen md:border-r-4 md:border-gray-600">
                <div class="md:relative mx-auto lg:float-right lg:px-6">
                <ul class="list-reset flex flex-row md:flex-col text-center md:text-left">
                    <li class="mr-3 flex-1">
                        <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                        <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
                        </a>
                    </li>
                    <li class="mr-3 flex-1">
                        <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                        <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
                        </a>
                    </li>
                    <li class="mr-3 flex-1">
                        <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-pink-600">
                        <i class="fas fa-link pr-0 md:pr-3 text-pink-500"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-white md:font-bold block md:inline-block">Active Link</span>
                        </a>
                    </li>
                    <li class="mr-3 flex-1">
                        <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-gray-800 no-underline hover:text-pink-500 border-b-2 border-gray-800 md:border-gray-900 hover:border-pink-500">
                        <i class="fas fa-link pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Link</span>
                        </a>
                    </li>
                </ul>
                </div>
            </div> */}
         </div>
    );
}

export default SideNav;