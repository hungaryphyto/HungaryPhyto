import { Box, styled } from '@mui/material';
import logo from '../assets/HPTNBG.png'
import Menu from './Menu';

const Header = () => {
    return (
        <HeaderContainer>
            <img src={logo} alt="HungaryPhyto" />
            <h1>HungaryPhyto</h1>
            <Menu />
        </HeaderContainer>
    );
};

const HeaderContainer = styled(Box)`
    width: 100dvw;
    height: 150px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #555;
    img {
        width: 130px;
        height: 130px;
    }
    * {
        margin: 10px;
    }
    h1 {
        color: white;
        font-family: 'Fasthand', cursive;
        font-size: 80px;
    }
`

export default Header;