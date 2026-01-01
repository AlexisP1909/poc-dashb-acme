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
    },
    {
      id: "call-004",
      caller: "Eagle Transport Co.",
      duration: "11 minutes",
      timestamp: "2025-12-31T08:15:00Z",
      client_sentiment: "positive",
      most_relevant_data: {
        load_id: "LD-78502",
        origin: "Houston, TX",
        destination: "Orlando, FL",
        equipment_type: "Dry Van",
        negotiation_summary:
          "Accepted posted rate with quick confirmation",
        load_rate: {
          currency: "USD",
          amount: 1950
        }
      }
    },
    {
      id: "call-005",
      caller: "NorthStar Carriers",
      duration: "9 minutes",
      timestamp: "2025-12-31T10:50:00Z",
      client_sentiment: "neutral",
      most_relevant_data: {
        load_id: "LD-78518",
        origin: "Minneapolis, MN",
        destination: "Omaha, NE",
        equipment_type: "Reefer",
        negotiation_summary:
          "Discussed appointment times; rate accepted without changes",
        load_rate: {
          currency: "USD",
          amount: 1600
        }
      }
    },
    {
      id: "call-006",
      caller: "Rapid Route Express",
      duration: "5 minutes",
      timestamp: "2025-12-31T13:35:00Z",
      client_sentiment: "positive",
      most_relevant_data: {
        load_id: "LD-78533",
        origin: "Nashville, TN",
        destination: "Louisville, KY",
        equipment_type: "Dry Van",
        negotiation_summary:
          "Same-day load booked at asking rate",
        load_rate: {
          currency: "USD",
          amount: 1100
        }
      }
    },
    {
      id: "call-007",
      caller: "Pacific Haulage",
      duration: "16 minutes",
      timestamp: "2025-12-31T14:40:00Z",
      client_sentiment: "negative",
      most_relevant_data: {
        load_id: "LD-78547",
        origin: "Oakland, CA",
        destination: "Reno, NV",
        equipment_type: "Flatbed",
        negotiation_summary:
          "Carrier requested detention pay upfront; no agreement reached",
        load_rate: {
          currency: "USD",
          amount: 0
        }
      }
    },
    {
      id: "call-008",
      caller: "Summit Logistics Group",
      duration: "12 minutes",
      timestamp: "2025-12-31T16:05:00Z",
      client_sentiment: "positive",
      most_relevant_data: {
        load_id: "LD-78561",
        origin: "Denver, CO",
        destination: "Salt Lake City, UT",
        equipment_type: "Dry Van",
        negotiation_summary:
          "Minor rate bump approved due to weather concerns",
        load_rate: {
          currency: "USD",
          amount: 1750
        }
      }
    },
    {
      id: "call-009",
      caller: "Liberty Freight Lines",
      duration: "7 minutes",
      timestamp: "2025-12-31T18:20:00Z",
      client_sentiment: "neutral",
      most_relevant_data: {
        load_id: "LD-78579",
        origin: "Columbus, OH",
        destination: "Indianapolis, IN",
        equipment_type: "Dry Van",
        negotiation_summary:
          "Confirmed capacity; awaiting final paperwork",
        load_rate: {
          currency: "USD",
          amount: 1250
        }
      }
    }
  ]
};

export default MOCK_DAILY_DATA;