import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

// 특정 모듈을 원하는 형태로 대체, 항상 import된 모듈을 가져오기 전에 실행
// 실제 모듈을 모킹한 모듈로 대체하여 테스트를 실행할 수 있다.
// useNavigate 훅으로 받은 navigate함수가 올바르게 호출되었는가 -> 스파이 함수

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return { ...original, useNavigate: () => navigateFn };
}); //useNavigate훅만 모킹을 원함 -> vi.importactual이라는 함수를 사용해 진행가능

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  await user.click(screen.getByText('홈으로 가기')); // 시뮬레이션

  // toHaveBeenNthCalledWith - 원하는 루트패스 경로를 한 번만 호출하는지 확인가능하다.
  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
});
