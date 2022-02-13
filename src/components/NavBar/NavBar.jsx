import React from 'react';
import s from './NavBar.module.css'
import {NavLink} from "react-router-dom";
import {HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuOutlined} from '@ant-design/icons'

const NavBar = () =>{
    return (
        <>
            <div className={s.section_navBar}>
                    <div className={s.title_and_logo}>
                        <div className={s.logo}><img src="https://linuxreviews.org/images/8/8b/Bitcoin-BTC-fancy-coin-logo.png" alt=""/></div>
                        <div className={s.title}><h1>Cryptocurrencies</h1></div>
                    </div>

                    <div className={s.navigation}>
                        <ul>
                            <NavLink className={s.linkNav} to='/home'><li><HomeOutlined/><span>Home</span></li></NavLink>
                            <NavLink className={s.linkNav} to='/cryptocurrencies'><li><BulbOutlined/><span>Cryptocurrencies</span></li></NavLink>
                            <NavLink className={s.linkNav} to='/exchanges'><li><MoneyCollectOutlined/><span>Exchanges</span></li></NavLink>
                            <NavLink className={s.linkNav} to='/cryptoNews'><li><FundOutlined/><span>News</span></li></NavLink>
                        </ul>
                    </div>
            </div>
        </>
    )
}

export default NavBar;