// @flow
import leftPad from 'left-pad';

export class Subject {
  value: number;
  binaryValue: string;

  constructor(value: number) {
    this.value = value;
    this.binaryValue = leftPad(value.toString(2), 8, '0');
  }
}

export default Subject;
