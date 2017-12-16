// @flow
import { Subject } from './subject';
import { eventOccured } from './utils';

type MutatorType = (subjects: Array<Subject>, chance: number) => Array<Subject>;

export const mutator: MutatorType = (subjects, chance) => subjects.map((subject) => {
  const binaryValue = subject.binaryValue.split('').map(gene => (
    // eslint-disable-next-line no-bitwise
    eventOccured(chance) ? parseInt(gene, 10) ^ 1 : gene
  ));
  return Subject.fromBinaryString(binaryValue.join(''));
});

export default mutator;
