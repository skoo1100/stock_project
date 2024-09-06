import { useNavigate } from 'react-router-dom';
import { device, nav } from '@styles/size';
import { z_index } from '@styles/z-index';
import styled from 'styled-components';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <S.NavContainer onClick={() => navigate('/')}>
      <S.NavLogo>양봉호</S.NavLogo>
      <S.NavSearchButton
        onClick={(e) => {
          e.stopPropagation();
          navigate('/search');
        }}
      >
        검색
      </S.NavSearchButton>
    </S.NavContainer>
  );
};

export default NavBar;

const S = {
  NavContainer: styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--red01);
    width: 100%;
    height: ${nav.height};
    z-index: ${z_index.nav};

    @media ${device.tablet} {
    }

    @media ${device.desktop} {
      margin-left: 22%;
      margin-right: 22%;
      width: 56%;
    }
  `,

  NavLogo: styled.div`
    text-align: center;
    background: var(--gray01);
    width: 4rem;
  `,

  NavSearchButton: styled.button`
    text-align: center;
    background: var(--gray01);
    width: 4rem;
  `,
};
