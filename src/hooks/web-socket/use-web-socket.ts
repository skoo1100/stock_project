import { aes256Decode } from '@utils/decode';
import { getCookie } from '@utils/cookie';
import { useState, useEffect } from 'react';

const useWebSocket = (stockId: string, stockCode: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  let iv = '';
  let encryptKey = '';

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
            tr_id: stockId, // 실시간 주식 체결가 요청 ID
            tr_key: stockCode, // 종목 코드
          },
        },
      };

      socket.send(JSON.stringify(requestData));
    };

    socket.onmessage = (e) => {
      const receiveData = e.data;
      console.log('서버로부터 받은 메시지:', receiveData);

      // 암호화 데이터 복호화시에 사용
      if (e.data.includes('header')) {
        iv = JSON.parse(receiveData).body.output.iv;
        encryptKey = JSON.parse(receiveData).body.output.key;
      }

      const strArray = receiveData.split('|');
      const trId = strArray[1];
      const bodyData = strArray[3];

      // 암호화된 데이터일 경우
      if (strArray[0] === '1') {
        const decodeData = aes256Decode(iv, encryptKey, bodyData);

        // 주식체결통보, 모의투자체결통보
        if (trId == 'H0STCNI0' || trId == 'H0STCNI9') {
        }
      }
      // 암호화되지 않은 데이터일 경우
      else if (strArray[0] === '0') {
        const resultData = bodyData.split('^');

        // 주식호가
        if (trId == 'H0STASP0') {
        }

        // 주식 체결가
        if (trId == 'H0STCNT0') {
        }

        //실시간 nav 추이
        if (trId == 'H0STNAV0') {
          console.log(resultData[1]);
        }
      }
      // 첫데이터가 암호화 구분값이 아닌 데이터는 요청에 대한 응답데이터 이거나 heartbeat 데이터
      else {
        //const data = JSON.parse(e.data);
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
};

export default useWebSocket;
