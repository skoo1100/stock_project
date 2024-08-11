import { filterUnicode, aes256Decode } from '@utils/decode';
import { getCookie } from '@utils/cookie';
import { useState, useEffect } from 'react';

function useWebSocket() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://ops.koreainvestment.com:21000');

    socket.onopen = () => {
      console.log('웹소켓 연결 성공');

      const requestData = {
        header: {
          approval_key: getCookie('approvalKey'), // 승인 키 설정
          custtype: 'P', // 개인 고객
          tr_type: '1', // 등록 타입
          'content-type': 'utf-8',
        },
        body: {
          input: {
            tr_id: 'H0STCNT0', // 실시간 주식 체결가 요청 ID
            tr_key: '005930', // 종목 코드
          },
        },
      };

      socket.send(JSON.stringify(requestData));
    };

    socket.onmessage = (e) => {
      const receiveData = e.data;
      console.log('서버로부터 받은 메시지:', receiveData);

      // 첫데이터가 0이나 1일경우 수신된 실시간 데이터 이므로 다음 단계를 통해 처리한다.
      if (receiveData?.body?.rt_cd === '0' || receiveData?.body?.rt_cd === '1') {
        const trId = receiveData.header.tr_id; // Tr ID
        const realTimeData = ''; // 수신받은 데이터 중 실시간데이터 부분
        if (trId == 'H0STCNT0') {
          console.log(realTimeData);
        }
      }
    };

    socket.onerror = (e) => {
      console.error('웹소켓 오류:', e);
    };

    socket.onclose = () => {
      console.log('웹소켓 연결 종료');
    };

    setWs(socket);

    return () => {
      if (socket) {
        socket.close();
        console.log('웹소켓 연결 종료');
      }
    };
  }, []);

  return { ws, error, messages };
}

export default useWebSocket;
