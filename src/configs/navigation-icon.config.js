import React from 'react'
import {
    HiOutlineColorSwatch, 
	HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlinePresentationChartLine,
    HiOutlineUserCircle,
    HiTemplate,
    HiOutlineUserAdd,
    HiOutlineUserGroup,
    HiShieldCheck,
    HiOutlineViewGrid,
    HiOutlineClipboardCheck,
    HiOutlineUser,  
    HiOutlineTruck  ,
    HiUser,
    HiTicket,
    HiInformationCircle,
    HiTag,
    HiPhone
} from 'react-icons/hi';

const navigationIcon = {
    home: <HiOutlineHome />,
    project: <HiOutlinePresentationChartLine />,
    account: <HiOutlineUserCircle />,
    apps: <HiTemplate />,
    add_user: <HiOutlineUserAdd />,
    users: <HiOutlineUserGroup />,
    verify: <HiShieldCheck />,
    products: <HiOutlineViewGrid />,
    quotation: <HiOutlineClipboardCheck  />,
    agents: <HiUser />,
    supplier: <HiOutlineTruck />,
    client: <HiOutlineUser />,
    info: <HiInformationCircle />,
    booking: <HiTicket />,
    offers: <HiTag />,
    contact: <HiPhone />
}

export default navigationIcon