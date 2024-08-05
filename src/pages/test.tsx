import { useSetAccessTokenCookie, useSetApprovalKeyCookie } from '@hooks/use-set-cookie';

function test() {
  const accessToken = useSetAccessTokenCookie();
  const approvalKey = useSetApprovalKeyCookie();

  return <div></div>;
}

export default test;
