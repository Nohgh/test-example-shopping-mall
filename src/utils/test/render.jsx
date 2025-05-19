import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * useEvent -  click, mouse등 브라우저의 동작과 유사하게 시뮬레이션 할 수 있는 라이브러리
 * setup - 이벤트를 시뮬레이션을 하기 위한 함수, 반환받은 인스턴스로 api를 사용할 수 있다.
 */
export default async component => {
  const user = userEvent.setup();

  return {
    user, //user의 api를 통해 사용자의 동작을 시뮬레이션
    ...render(component),
  };
};
