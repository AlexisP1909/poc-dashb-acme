"use client";

import React from 'react';

interface ExportButtonProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    filename?: string;
    className?: string;
}

export default function ExportButton({
    data,
    filename = 'dashboard-export',
    className = ''
}: ExportButtonProps) {
    const [isExporting, setIsExporting] = React.useState(false);

    const convertToCSV = (objArray: any): string => {
        if (!Array.isArray(objArray) || objArray.length === 0) {
            return '';
        }

        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '\uFEFF'; // Add BOM for Excel compatibility

        // Get headers
        const headers = Object.keys(array[0]);
        str += headers.join(',') + '\r\n';

        // Get data rows
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (const index in headers) {
                if (line !== '') line += ',';
                const header = headers[index];
                const value = array[i][header];

                // Handle values that might contain commas or newlines
                let formattedValue = value === null || value === undefined ? '' : String(value);
                if (formattedValue.includes(',') || formattedValue.includes('\n') || formattedValue.includes('"')) {
                    formattedValue = `"${formattedValue.replace(/"/g, '""')}"`;
                }

                line += formattedValue;
            }
            str += line + '\r\n';
        }
        return str;
    };

    const handleExportCSV = () => {
        setIsExporting(true);

        try {
            if (!data || !Array.isArray(data) || data.length === 0) {
                console.warn('No data to export');
                setIsExporting(false);
                return;
            }

            // Convert data to CSV
            const csv = convertToCSV(data);

            // Create blob and download
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setTimeout(() => setIsExporting(false), 500);
        }
    };

    const handleExportJSON = () => {
        setIsExporting(true);

        try {
            if (!data) {
                console.warn('No data to export');
                setIsExporting(false);
                return;
            }

            const jsonStr = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);

            link.setAttribute('href', url);
            link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setTimeout(() => setIsExporting(false), 500);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={handleExportCSV}
                disabled={isExporting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isExporting ? (
                    <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Exporting...</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Export CSV</span>
                    </>
                )}
            </button>

            {/* Optional: Add dropdown for multiple export formats */}
            <button
                onClick={handleExportJSON}
                className="ml-2 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Export JSON</span>
            </button>
        </div>
    );
}
