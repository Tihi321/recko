export type TTableLetter = {
  letter: string;
  success: boolean;
  exist: boolean;
};

export type TTableLetters = Array<TTableLetter[]>;

export type TWordleData = {
  table: TTableLetters;
  currentRow: number;
  success: boolean;
};
