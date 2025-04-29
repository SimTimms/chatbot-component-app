enum EscalationStatus {
  ESCALATE = 'ESCALATE',
}
const hasBeenEscalated = (input: string): boolean => {
  if (input === EscalationStatus.ESCALATE) {
    return true;
  }
  return false;
};

export default hasBeenEscalated;
