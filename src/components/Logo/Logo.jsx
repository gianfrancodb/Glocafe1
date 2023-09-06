import React from 'react';
import {
    DesktopLogo,
    MobileLogo,
    NavLogo
} from '../../components/Navigation/Style';
import Data from '../../Data';

const split = Data.home.name.split(" ");
const initials = split.length > 1 ? split[0].charAt(0) + split[1].charAt(0) : split[0].charAt(0);

const Logo = (props) => (
    <NavLogo href="/home">
        <img src="/Glocafe (3).svg" alt="Logo" style={{ marginRight: '10px' , maxHeight: '2vw'}} />
        <DesktopLogo>
            {Data.home.name}
        </DesktopLogo>
        <MobileLogo>
            {initials}
        </MobileLogo>
    </NavLogo> 
);

export default Logo;
