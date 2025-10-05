import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportPDF from "./ReportPDF";

const DownloadButton = ({ company }) => {
  if (!company) {
    return <p className="text-gray-500">No data available</p>;
  }

  return (
    <PDFDownloadLink
      document={<ReportPDF company={company} />}
      fileName={`${company?.name || "report"}_energy_report.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <button className="bg-gray-400 text-white px-4 py-2 rounded">
            Preparing...
          </button>
        ) : (
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Download PDF
          </button>
        )
      }
    </PDFDownloadLink>
  );
};

export default DownloadButton;
