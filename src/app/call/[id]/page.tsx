"use client"
import React from 'react'
import Sidebar from '@/components/ui/Sidebar';


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

    return (
      <div className="grid min-h-screen pb-20 gap-16  font-(family-name:--font-geist-sans)">
      <main>
          <Sidebar />
          <div className="pl-60 pt-10">
                <nav>
                    Call Details
                </nav>
                <h3>
                    {callDetails.caller} - {callDetails.duration} - {new Date(callDetails.timestamp).toLocaleString()}
                </h3>
                <h3>Call Status</h3>
                    <h3>Call Sentiment</h3>
        </div>
            </main>
            </div>
  )
}
