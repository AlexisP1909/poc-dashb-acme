import { DailyCallData } from "../interface/types";
const MOCK_DAILY_DATA: DailyCallData = {
  startDate: "2025-12-31T00:00:00Z",
  endDate: "2025-12-31T23:59:59Z",
  calls: [
    {
      id: "call-001",
      caller: "John Doe Trucking LLC",
      duration: "8 minutes",
      timestamp: "2025-12-31T09:30:00Z",
      client_sentiment: "positive",
      most_relevant_data: {
        load_id: "LD-78421",
        origin: "Dallas, TX",
        destination: "Atlanta, GA",
        equipment_type: "Dry Van",
        negotiation_summary:
          "Carrier countered initial offer; agreement reached after second counter",
        load_rate: {
          currency: "USD",
          amount: 1850
        }
      }
    },
    {
      id: "call-002",
      caller: "Smith Logistics Inc.",
      duration: "14 minutes",
      timestamp: "2025-12-31T12:10:00Z",
      client_sentiment: "neutral",
      most_relevant_data: {
        load_id: "LD-78455",
        origin: "Chicago, IL",
        destination: "Memphis, TN",
        equipment_type: "Reefer",
        negotiation_summary:
          "Carrier requested higher rate due to fuel costs; partial increase accepted",
        load_rate: {
          currency: "USD",
          amount: 2200
        }
      }
    },
    {
      id: "call-003",
      caller: "Brown Freight Services",
      duration: "6 minutes",
      timestamp: "2025-12-31T17:45:00Z",
      client_sentiment: "negative",
      most_relevant_data: {
        load_id: "LD-78488",
        origin: "Phoenix, AZ",
        destination: "Los Angeles, CA",
        equipment_type: "Flatbed",
        negotiation_summary:
          "Carrier declined load after rate ceiling was reached",
        load_rate: {
          currency: "USD",
          amount: 0
        }
      }
    }
  ]
};

export default MOCK_DAILY_DATA;