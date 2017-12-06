// @flow
import { padStart } from 'lodash';

// eslint-disable-next-line no-bitwise
const toBinary = (value: number): string => padStart(value.toString(2), 8, '0');

export class Subject {
  value: number;
  binaryValue: string;

  static fromBinaryString = (binary: string): Subject => {
    const value = parseInt(binary, 2);
    return new Subject(value);
  }

  constructor(value: number) {
    this.value = value;
    this.binaryValue = toBinary(value);
  }
}

export default Subject;
