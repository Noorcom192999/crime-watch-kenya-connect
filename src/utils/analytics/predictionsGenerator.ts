
import { CrimeIncident } from './types';

export const generatePredictions = (incidents: CrimeIncident[]) => {
  return [
    {
      type: "High Risk Period",
      time: "6:00 PM - 9:00 PM",
      confidence: "92%",
      area: "Nairobi CBD",
      crimes: ["Theft", "Robbery"]
    },
    {
      type: "Medium Risk",
      time: "12:00 PM - 3:00 PM", 
      confidence: "78%",
      area: "Eastlands",
      crimes: ["Burglary", "Vandalism"]
    },
    {
      type: "Emerging Pattern",
      time: "Weekend Nights",
      confidence: "85%",
      area: "Westlands",
      crimes: ["Assault", "Domestic Violence"]
    }
  ];
};
