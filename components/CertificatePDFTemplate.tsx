import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface CertificatePDFTemplateProps {
  awardLevel: 'GRAND_GOLD' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE';
  productName: string;
  producerName: string;
  categoryName: string;
  score: number;
  issueDate: string;
  certificateNumber: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 30,
  },
  awardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    marginTop: 20,
    textAlign: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  producerName: {
    fontSize: 14,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
  },
  score: {
    fontSize: 14,
    marginBottom: 30,
  },
  footer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#666666',
  },
  certificateNumber: {
    fontFamily: 'Courier',
  },
});

export default function CertificatePDFTemplate({
  awardLevel,
  productName,
  producerName,
  categoryName,
  score,
  issueDate,
  certificateNumber,
}: CertificatePDFTemplateProps) {
  const getAwardTitle = () => {
    switch (awardLevel) {
      case 'GRAND_GOLD':
        return 'GRAND GOLD AWARD';
      case 'GOLD':
        return 'GOLD AWARD';
      case 'SILVER':
        return 'SILVER AWARD';
      case 'BRONZE':
        return 'BRONZE AWARD';
      case 'NONE':
        return 'CERTIFICATE OF RECOGNITION';
      default:
        return 'GOLD AWARD';
    }
  };

  const formattedDate = new Date(issueDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Tastecert</Text>
          <Text style={styles.subtitle}>International Food Quality Awards</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.awardTitle}>Certificate of</Text>
          <Text style={styles.awardTitle}>{getAwardTitle()}</Text>

          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.producerName}>by {producerName}</Text>
          <Text style={styles.categoryName}>{categoryName}</Text>

          <Text style={styles.score}>Score: {score.toFixed(1)}/10</Text>

          <Text style={{ fontSize: 12, marginTop: 20 }}>
            In recognition of exceptional quality and excellence in artisan food production.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Issue Date: {formattedDate}</Text>
          <Text style={styles.certificateNumber}>ID: {certificateNumber}</Text>
        </View>
      </Page>
    </Document>
  );
}

