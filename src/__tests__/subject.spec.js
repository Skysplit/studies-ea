import 'jest';
import { Subject } from '../subject';

describe('Subject', () => {
  test('should create subject from binary string', () => {
    const { value } = Subject.fromBinaryString('101');
    expect(value).toEqual(5);
  });
});
