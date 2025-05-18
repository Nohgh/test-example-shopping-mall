import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';
/**
 * 1. Arrange - 테스트를 위한 환경 만들기
 * -> className을 지닌 컴포넌트 렌더링
 *
 * 2. Act - 테스트할 동작 발생
 * -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
 * -> 클릭이나 메서드 호출, prop변경 등등에 대한 작업이 여기에 해당
 *
 * 3. Assert - 올바른 동작이 실행되었는지 검증
 * -> 렌더링 후 DOM에 해당 class가 존재하는지 검증
 */
describe('className', () => {
  //it: test의 alias, it은 should... / test는 if ...로 보통 작성
  it('className prop으로 설정한 css class가 적용된다.', async () => {
    //Arrange
    //render api를 호출하게 되면, 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM구조가 반영됨
    await render(<TextField className="my-class" />);

    // Assert
    // className이란 내부 prop이나 state값을 검증(x)
    // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인(o) -> 최종적으로 사용자가 보는 결과는 dom
    // vitest의 expect 함수를 사용해 기대 결과를 검증
    // toHaveClass: css class가 올바른지 검증
    expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
      'my-class',
    );
  });
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    // it: 기대결과를 정의한다.
    // 기대결과 === 실제 결과 -> 성공
    // 기대결과 !== 실제 결과 -> 실패
    //it 함수 하나가 테스트의 단위가 된다.
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
    // expect를 실행하면 여러 단언을 실행할 수 있다.
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행
    // macther - 기대결과를 검증하기 위해 사용되는 일종의 api 집합
    // vitest에서는 돔 관련한 매처를 제공하지 않기 때문에, jest-dom을 사용한다
  });

  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});
