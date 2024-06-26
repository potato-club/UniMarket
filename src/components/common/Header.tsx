import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useGetAuthUser, useLogout } from '../../hooks/query/useAuth';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const { data } = useGetAuthUser();
  const { mutate: logoutMutate } = useLogout();

  return (
    <Wrapper>
      <LogoBox>
        <img src="./UniLogo.png" width={90} height={90} alt="" />
      </LogoBox>
      <TypoWrapper>
        <TypoBox>UNI-MARKET</TypoBox>
        {data && <SchoolName>{data?.user?.univ_name}</SchoolName>}
      </TypoWrapper>
      <MenuBox>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ color: 'white' }}
        >
          <MenuIcon fontSize="large" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{ zIndex: 999999 }}
        >
          <MenuItem onClick={() => navigate('/')}>메인페이지</MenuItem>
          <MenuItem onClick={() => navigate('/list')}>상품 게시판</MenuItem>
          <MenuItem onClick={() => navigate('/myPage')}>마이페이지</MenuItem>
          {data && <MenuItem onClick={() => logoutMutate()}>로그아웃</MenuItem>}
        </Menu>
      </MenuBox>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  height: 90px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
`;

const LogoBox = styled.div`
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TypoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;
const TypoBox = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 600;
  font-family: Georgia, 'Times New Roman', Times, serif;
`;
const SchoolName = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
`;

const MenuBox = styled.div`
  width: 20%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;
