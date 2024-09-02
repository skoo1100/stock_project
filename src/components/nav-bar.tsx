import { nav } from '@styles/size';
import styled from 'styled-components';

const NavBar = () => {
  return <S.NavContainer>검색</S.NavContainer>;
};

export default NavBar;

const S = {
  NavContainer: styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--red01);
    width: ${nav.width};
    height: ${nav.height};
    z-index: 10;
  `,
};
