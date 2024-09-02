import { Outlet } from 'react-router-dom';
import NavBar from '@components/nav-bar';
import GlobalStyle from '@styles/global';
import { nav } from '@styles/size';
import styled from 'styled-components';

function Root() {
  return (
    <>
      <GlobalStyle />
      <S.Main>
        <NavBar />
        <Outlet />
      </S.Main>
    </>
  );
}

export default Root;

const S = {
  Main: styled.main`
    margin-top: ${nav.height};
  `,
};
