"use client"
import { Button } from '@/components/LineChart/ui/Button';
import React from 'react'
import { useRouter } from 'next/navigation';


function getCallDetails(id: string) {

    // Simulate fetching call details
    return {
        id,
        caller: "John Doe",
        duration: "5 minutes",
        timestamp: "2024-06-15T10:00:00Z"
    };
}

export default function CallDetails({ params }: { params: { id: string } }) {
    const callDetails = getCallDetails(params.id);
    const router = useRouter();

    const goBack = () => {
        router.back();
    };
  return (
      <main>
        <Button variant="light" onClick={goBack}>Back</Button>
          <nav>
              Call Details
          </nav>
          <h3>
              {callDetails.caller} - {callDetails.duration} - {new Date(callDetails.timestamp).toLocaleString()}
          </h3>
          <h3>Call Status</h3>
          <h3>Call Sentiment</h3>
    </main>
  )
}
