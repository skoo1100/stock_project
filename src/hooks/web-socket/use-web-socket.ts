import { useState, useEffect } from 'react';

function useWebSocket(url: string) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('웹소켓 연결 성공');
      setError(null);
    };

    socket.onmessage = (event) => {
      console.log('서버로부터 받은 메시지:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onerror = (event) => {
      console.error('웹소켓 오류:', event);
      setError('웹소켓 오류 발생');
    };

    socket.onclose = () => {
      console.log('웹소켓 연결 종료');
      setError('웹소켓 연결이 종료되었습니다.');
    };

    setWs(socket);

    return () => {
      if (socket) {
        socket.close();
        console.log('웹소켓 연결 종료');
      }
    };
  }, [url]);

  return { ws, error, messages };
}

export default useWebSocket;
