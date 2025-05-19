import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

beforeEach(() => {
  console.log('root - beforeEach');
});

beforeAll(() => {
  console.log('root - beforeAll');
});

afterEach(() => {
  console.log('root - afterEach');
});

afterAll(() => {
  console.log('root - afterAll');
});
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
  beforeEach(() => {
    console.log('placeholder - beforeEach');
  });
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

  it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
    // vi.fn() - spy 함수를 만드는데 사용된다.
    // spy 함수 - 테스트 코드에서 특정 함수가 호출되었는지,
    // 함수의 인자로 어떤것이 넘어왔는지 어떤 값을 반환하는지 등 다양한 값을 저장
    const spy = vi.fn();

    const { user } = await render(<TextField onChange={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test'); //type api 사용하여 실제 텍스트 입력 시뮬레이션
    // type 함수 -  내부적으로 킷다운 이벤트를 발생시킨다.

    //입력한 값이 onChange이벤트 핸들러에 제대로 전달되는지 확인 -> vi.fn 사용

    expect(spy).toHaveBeenCalledWith('test');
    // - 스파이 함수가 내가 원하는 'test'란 문자열과 함께 올바르게 호출되었는지 단원할 수 있다.
  });

  it('엔터키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();

    const { user } = await render(<TextField onEnter={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test{Enter}'); //중괄호 내부에 Enter를 작성해 엔터키 입력 이벤트를 발생

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
    // 포커스 활성화 방법
    // 1. 탭 키로 인풋 요소로 포커스 이동
    // 2. 인풋 요소를 클릭
    // 3. textInput.focus()로 직접 발생
    const spy = vi.fn();

    const { user } = await render(<TextField onFocus={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);

    expect(spy).toHaveBeenCalled();
  });

  it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
    const spy = vi.fn();

    const { user } = await render(<TextField onFocus={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);

    expect(textInput).toHaveStyle({
      borderWidth: 2,
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
