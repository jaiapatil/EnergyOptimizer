import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, fontFamily: "Helvetica" },
  heading: { fontSize: 16, marginBottom: 8, fontWeight: "bold" },
  text: { marginBottom: 4 },
});

const ReportPDF = ({ company }) => {
  const metrics = company?.energyMetrics || {};
  const equipments = company?.equipments || [];

  const difference =
    metrics?.actualConsumption && metrics?.idealConsumption
      ? metrics?.actualConsumption - metrics?.idealConsumption
      : "N/A";

  const potentialSavings =
    metrics?.actualCost && metrics?.idealCost
      ? metrics?.actualCost - metrics?.idealCost
      : "N/A";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Overview */}
        <Text style={styles.heading}>Overview</Text>
        <Text style={styles.text}>
          Total Consumption: {metrics?.actualConsumption ?? "N/A"}
        </Text>
        <Text style={styles.text}>
          Total Cost: ${metrics?.actualCost ?? "N/A"}
        </Text>

        {/* Consumption */}
        <Text style={styles.heading}>Consumption Details</Text>
        <Text style={styles.text}>
          Ideal Consumption: {metrics?.idealConsumption ?? "N/A"}
        </Text>
        <Text style={styles.text}>Difference: {difference}</Text>

        {/* Cost */}
        <Text style={styles.heading}>Cost Details</Text>
        <Text style={styles.text}>
          Actual Cost: ${metrics?.actualCost ?? "N/A"}
        </Text>
        <Text style={styles.text}>
          Ideal Cost: ${metrics?.idealCost ?? "N/A"}
        </Text>
        <Text style={styles.text}>
          Savings can be made of: ${potentialSavings}
        </Text>

        {/* Equipment */}
        <Text style={styles.heading}>Equipment Details</Text>
        {equipments.length > 0 ? (
          equipments.map((eq, i) => (
            <Text key={i} style={styles.text}>
              {`Name: ${eq?.name}, Status: ${eq?.status}, Efficiency: ${
                eq?.efficiency
              }%, PF: ${eq?.powerFactor}`}
            </Text>
          ))
        ) : (
          <Text>No equipment data</Text>
        )}

        {/* Alerts */}
        <Text style={styles.heading}>Action & Alerts</Text>
        {equipments.some((eq) => eq.alerts?.length > 0) ? (
          equipments.map(
            (eq, i) =>
              eq.alerts?.length > 0 && (
                <Text key={i} style={styles.text}>
                  {eq?.name}: {eq?.alerts.join(", ")}
                </Text>
              )
          )
        ) : (
          <Text>No active alerts</Text>
        )}
      </Page>
    </Document>
  );
};

export default ReportPDF;

