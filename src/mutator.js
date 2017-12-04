// @flow
import { Subject } from './subject';
import { mutateSubject, eventOccured } from './utils';

type MutatorType = (subjects: Array<Subject>, chance: number) => Array<Subject>;

export const mutator: MutatorType = (subjects, chance) => subjects.map(subject => (
  eventOccured(chance) ? mutateSubject(subject) : subject
));

export default mutator;
