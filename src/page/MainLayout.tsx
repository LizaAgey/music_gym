import {Link, Outlet} from 'react-router-dom';
import * as React from 'react';
import {Menu, MenuProps} from "antd";
import {MenuItem} from "@mui/material";
import {CalendarOutlined, ControlOutlined, SmileOutlined,} from '@ant-design/icons';
import {HOME, SETTINGS, TEST} from "../constants/routes";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/">Home</Link>, '1', <SmileOutlined/>),
    getItem(<Link to="private/settings">Settings</Link>, '2', <CalendarOutlined/>),
    getItem(<Link to="test">Test</Link>, '3', <CalendarOutlined/>),
    getItem('Properties', '4', <ControlOutlined/>, [
        getItem(<Link to="/props/job">Job</Link>, '5'),
        getItem(<Link to="/props/meeting">Meeting</Link>, '6'),
    ]),

];

function MainLayout() {
    const [current, setCurrent] = React.useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div>
            <header>
                <Menu onClick={onClick}
                      selectedKeys={[current]}
                      mode="horizontal"
                      items={items}/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default MainLayout;