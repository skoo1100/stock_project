import { useSetAccessTokenCookie, useSetApprovalKeyCookie } from '@hooks/use-set-cookie';
import useWebSocket from '@hooks/web-socket/use-web-socket';
import { device, nav } from '@styles/size';
import styled from 'styled-components';

function Main() {
  //const accessToken = useSetAccessTokenCookie(); // 인증 토큰
  //const approvalKey = useSetApprovalKeyCookie(); // 웹소켓 접속 키

  //const { ws, error, messages } = useWebSocket('H0STNAV0', '069500');

  return <S.MainContent></S.MainContent>;
}

export default Main;

const S = {
  MainContent: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `,
};
