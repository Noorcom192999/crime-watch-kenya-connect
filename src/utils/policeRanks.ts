
export const KENYA_POLICE_RANKS = [
  'Constable',
  'Corporal',
  'Sergeant',
  'Senior Sergeant',
  'Inspector',
  'Chief Inspector',
  'Assistant Superintendent',
  'Superintendent',
  'Senior Superintendent',
  'Commissioner of Police',
  'Assistant Inspector-General',
  'Senior Assistant Inspector-General',
  'Deputy Inspector-General',
  'Inspector-General of Police'
] as const;

export type PoliceRank = typeof KENYA_POLICE_RANKS[number];

export const getRankHierarchy = (rank: PoliceRank): number => {
  return KENYA_POLICE_RANKS.indexOf(rank) + 1;
};

export const getRankAbbreviation = (rank: PoliceRank): string => {
  const abbreviations: Record<PoliceRank, string> = {
    'Constable': 'PC',
    'Corporal': 'CPL',
    'Sergeant': 'SGT',
    'Senior Sergeant': 'SSGT',
    'Inspector': 'INSP',
    'Chief Inspector': 'CI',
    'Assistant Superintendent': 'ASP',
    'Superintendent': 'SP',
    'Senior Superintendent': 'SSP',
    'Commissioner of Police': 'CP',
    'Assistant Inspector-General': 'AIG',
    'Senior Assistant Inspector-General': 'SAIG',
    'Deputy Inspector-General': 'DIG',
    'Inspector-General of Police': 'IGP'
  };
  
  return abbreviations[rank];
};

export const getRankSalaryGrade = (rank: PoliceRank): string => {
  const salaryGrades: Record<PoliceRank, string> = {
    'Constable': 'Job Group D',
    'Corporal': 'Job Group E',
    'Sergeant': 'Job Group F',
    'Senior Sergeant': 'Job Group G',
    'Inspector': 'Job Group H',
    'Chief Inspector': 'Job Group J',
    'Assistant Superintendent': 'Job Group K',
    'Superintendent': 'Job Group L',
    'Senior Superintendent': 'Job Group M',
    'Commissioner of Police': 'Job Group N',
    'Assistant Inspector-General': 'Job Group P',
    'Senior Assistant Inspector-General': 'Job Group Q',
    'Deputy Inspector-General': 'Job Group R',
    'Inspector-General of Police': 'Job Group S'
  };
  
  return salaryGrades[rank];
};

export const getSupervisionLevel = (rank: PoliceRank): string => {
  if (['Constable'].includes(rank)) return 'Operational Level';
  if (['Corporal', 'Sergeant', 'Senior Sergeant'].includes(rank)) return 'Supervisory Level';
  if (['Inspector', 'Chief Inspector'].includes(rank)) return 'Management Level';
  if (['Assistant Superintendent', 'Superintendent', 'Senior Superintendent'].includes(rank)) return 'Command Level';
  return 'Executive Level';
};
