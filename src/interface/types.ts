type LoadRate = {
  currency: string;
  amount: number;
};

type MostRelevantData = {
  load_id: string;
  origin: string;
  destination: string;
  equipment_type: string;
  negotiation_summary: string;
  load_rate: LoadRate;
};

type Call = {
  id: string;
  caller: string;
  duration: string;
  timestamp: string;
  client_sentiment: "positive" | "neutral" | "negative";
  most_relevant_data: MostRelevantData;
};

type DailyCallData = {
  startDate: string;
  endDate: string;
  calls: Call[];
};
export type { Call, DailyCallData, MostRelevantData, LoadRate };