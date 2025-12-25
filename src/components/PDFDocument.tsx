import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2px solid #3b82f6",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    backgroundColor: "#f3f4f6",
    padding: 8,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    width: "48%",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  cardTrend: {
    fontSize: 10,
    marginTop: 4,
  },
  trendPositive: {
    color: "#10b981",
  },
  trendNegative: {
    color: "#ef4444",
  },
  trendNeutral: {
    color: "#6b7280",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: "#9ca3af",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 10,
  },
});

interface MetricData {
  value: string;
  trend: number;
}

interface PDFDocumentProps {
  userName: string;
  date: string;
  metrics: {
    // Doctor Actions
    firstResponseRate: MetricData;
    continuousResponseRate: MetricData;
    designatedConsultationResponseSpeedWeekly: MetricData;
    favoriteConsultationResponseSpeedWeekly: MetricData;
    generalConsultationResponseSpeedWeekly: MetricData;
    // Consultations
    totalConsultation: MetricData;
    // Consultation Unique Users
    cumulativePatientConsultations: MetricData;
    cumulativeUserConsultations: MetricData;
    // Company Care Facility Counts
    careFacilityCount: MetricData;
    careFacilityUserCount: MetricData;
    companyCount: MetricData;
    companyUserCount: MetricData;
    // Billing
    billingAmountWeekly: MetricData;
    billingUsersWeekly: MetricData;
    designatedConsultationUsersWeekly: MetricData;
    favoriteConsultationUsersWeekly: MetricData;
    generalConsultationUsersWeekly: MetricData;
    // Doctor Ratings
    doctorRatingSinceStart: MetricData;
    doctorRatingWeekly: MetricData;
    // Paid Member Consultations
    premiumConsultations: MetricData;
    superPremiumConsultations: MetricData;
    totalPaidMemberConsultations: MetricData;
    // Pool Consultation
    mentalCheckCount: MetricData;
    poolConsultationCount: MetricData;
    schoolCount: MetricData;
    // Premium Subscription
    paidMemberAdditionsTotal: MetricData;
    paidMemberAdditionsWeekly: MetricData;
    paidMembers: MetricData;
    premiumAdditionsWeekly: MetricData;
    superPremiumAdditionsWeekly: MetricData;
    trialAdditionsWeekly: MetricData;
    trialUsersTotal: MetricData;
    // School Accounts
    schoolAccountsTotal: MetricData;
    schoolAccountsType3: MetricData;
    schoolAccountsType4: MetricData;
    // User Statistics
    doctorCount: MetricData;
    patientAccounts: MetricData;
    personalUsers: MetricData;
    schoolUsersCompanyGovernment: MetricData;
    schoolUsersPremium: MetricData;
    schoolUsersStarter: MetricData;
    schoolUsersSuperPremium: MetricData;
    schoolUsersTotal: MetricData;
    schoolUsersTrial: MetricData;
    totalUsers: MetricData;
    // User Type Consultations
    companyGovernmentConsultations: MetricData;
    personalConsultations: MetricData;
    schoolConsultations: MetricData;
  };
}

const MetricCard = ({
  title,
  value,
  trend,
}: {
  title: string;
  value: string;
  trend: number;
}) => {
  const trendStyle =
    trend > 0
      ? styles.trendPositive
      : trend < 0
      ? styles.trendNegative
      : styles.trendNeutral;

  const trendText =
    trend > 0
      ? `↑ +${trend.toFixed(2)}`
      : trend < 0
      ? `↓ ${trend.toFixed(2)}`
      : "→ 0";

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={[styles.cardTrend, trendStyle]}>{trendText}</Text>
    </View>
  );
};

const DashboardPDFDocument = ({
  userName,
  date,
  metrics,
}: PDFDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard Report</Text>
          <Text style={styles.subtitle}>
            Generated for {userName} on {date}
          </Text>
        </View>

        {/* Doctor Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor Actions</Text>
          <View style={styles.grid}>
            <MetricCard
              title="First Response Rate"
              value={metrics.firstResponseRate.value}
              trend={metrics.firstResponseRate.trend}
            />
            <MetricCard
              title="Continuous Response Rate"
              value={metrics.continuousResponseRate.value}
              trend={metrics.continuousResponseRate.trend}
            />
            <MetricCard
              title="Designated Consultation Response Speed"
              value={metrics.designatedConsultationResponseSpeedWeekly.value}
              trend={metrics.designatedConsultationResponseSpeedWeekly.trend}
            />
            <MetricCard
              title="Favorite Consultation Response Speed"
              value={metrics.favoriteConsultationResponseSpeedWeekly.value}
              trend={metrics.favoriteConsultationResponseSpeedWeekly.trend}
            />
            <MetricCard
              title="General Consultation Response Speed"
              value={metrics.generalConsultationResponseSpeedWeekly.value}
              trend={metrics.generalConsultationResponseSpeedWeekly.trend}
            />
          </View>
        </View>

        {/* Consultations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultations</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Total Consultation"
              value={metrics.totalConsultation.value}
              trend={metrics.totalConsultation.trend}
            />
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Dashboard Report - Generated by Healthcare Analytics System
        </Text>
      </Page>

      {/* Page 2 - Consultation Unique Users */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultation Unique Users</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Cumulative Patient Consultations"
              value={metrics.cumulativePatientConsultations.value}
              trend={metrics.cumulativePatientConsultations.trend}
            />
            <MetricCard
              title="Cumulative User Consultations"
              value={metrics.cumulativeUserConsultations.value}
              trend={metrics.cumulativeUserConsultations.trend}
            />
          </View>
        </View>

        {/* Company Care Facility Counts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company Care Facility Counts</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Care Facility Count"
              value={metrics.careFacilityCount.value}
              trend={metrics.careFacilityCount.trend}
            />
            <MetricCard
              title="Care Facility User Count"
              value={metrics.careFacilityUserCount.value}
              trend={metrics.careFacilityUserCount.trend}
            />
            <MetricCard
              title="Company Count"
              value={metrics.companyCount.value}
              trend={metrics.companyCount.trend}
            />
            <MetricCard
              title="Company User Count"
              value={metrics.companyUserCount.value}
              trend={metrics.companyUserCount.trend}
            />
          </View>
        </View>

        <Text style={styles.footer}>Dashboard Report - Page 2</Text>
      </Page>

      {/* Page 3 - Billing Referrals */}
      <Page size="A4" style={styles.page}>
        {/* Billing Referrals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billing Referrals</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Billing Amount Weekly"
              value={metrics.billingAmountWeekly.value}
              trend={metrics.billingAmountWeekly.trend}
            />
            <MetricCard
              title="Billing Users Weekly"
              value={metrics.billingUsersWeekly.value}
              trend={metrics.billingUsersWeekly.trend}
            />
            <MetricCard
              title="Designated Consultation Users Weekly"
              value={metrics.designatedConsultationUsersWeekly.value}
              trend={metrics.designatedConsultationUsersWeekly.trend}
            />
            <MetricCard
              title="Favorite Consultation Users Weekly"
              value={metrics.favoriteConsultationUsersWeekly.value}
              trend={metrics.favoriteConsultationUsersWeekly.trend}
            />
            <MetricCard
              title="General Consultation Users Weekly"
              value={metrics.generalConsultationUsersWeekly.value}
              trend={metrics.generalConsultationUsersWeekly.trend}
            />
          </View>
        </View>

        <Text style={styles.footer}>Dashboard Report - Page 3</Text>
      </Page>

      {/* Page 4 - Doctor Ratings & Paid Member Consultations */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctor Ratings</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Doctor Rating Since Start"
              value={metrics.doctorRatingSinceStart.value}
              trend={metrics.doctorRatingSinceStart.trend}
            />
            <MetricCard
              title="Doctor Rating Weekly"
              value={metrics.doctorRatingWeekly.value}
              trend={metrics.doctorRatingWeekly.trend}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paid Member Consultations</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Premium Consultations"
              value={metrics.premiumConsultations.value}
              trend={metrics.premiumConsultations.trend}
            />
            <MetricCard
              title="Super Premium Consultations"
              value={metrics.superPremiumConsultations.value}
              trend={metrics.superPremiumConsultations.trend}
            />
            <MetricCard
              title="Total Paid Member Consultations"
              value={metrics.totalPaidMemberConsultations.value}
              trend={metrics.totalPaidMemberConsultations.trend}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pool Consultation</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Mental Check Count"
              value={metrics.mentalCheckCount.value}
              trend={metrics.mentalCheckCount.trend}
            />
            <MetricCard
              title="Pool Consultation Count"
              value={metrics.poolConsultationCount.value}
              trend={metrics.poolConsultationCount.trend}
            />
            <MetricCard
              title="School Count"
              value={metrics.schoolCount.value}
              trend={metrics.schoolCount.trend}
            />
          </View>
        </View>

        <Text style={styles.footer}>Dashboard Report - Page 4</Text>
      </Page>

      {/* Page 5 - Premium Subscription */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Subscription</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Paid Member Additions Total"
              value={metrics.paidMemberAdditionsTotal.value}
              trend={metrics.paidMemberAdditionsTotal.trend}
            />
            <MetricCard
              title="Paid Member Additions Weekly"
              value={metrics.paidMemberAdditionsWeekly.value}
              trend={metrics.paidMemberAdditionsWeekly.trend}
            />
            <MetricCard
              title="Paid Members"
              value={metrics.paidMembers.value}
              trend={metrics.paidMembers.trend}
            />
            <MetricCard
              title="Premium Additions Weekly"
              value={metrics.premiumAdditionsWeekly.value}
              trend={metrics.premiumAdditionsWeekly.trend}
            />
            <MetricCard
              title="Super Premium Additions Weekly"
              value={metrics.superPremiumAdditionsWeekly.value}
              trend={metrics.superPremiumAdditionsWeekly.trend}
            />
            <MetricCard
              title="Trial Additions Weekly"
              value={metrics.trialAdditionsWeekly.value}
              trend={metrics.trialAdditionsWeekly.trend}
            />
            <MetricCard
              title="Trial Users Total"
              value={metrics.trialUsersTotal.value}
              trend={metrics.trialUsersTotal.trend}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>School Account Registrations</Text>
          <View style={styles.grid}>
            <MetricCard
              title="School Accounts Total"
              value={metrics.schoolAccountsTotal.value}
              trend={metrics.schoolAccountsTotal.trend}
            />
            <MetricCard
              title="School Accounts Type 3"
              value={metrics.schoolAccountsType3.value}
              trend={metrics.schoolAccountsType3.trend}
            />
            <MetricCard
              title="School Accounts Type 4"
              value={metrics.schoolAccountsType4.value}
              trend={metrics.schoolAccountsType4.trend}
            />
          </View>
        </View>

        <Text style={styles.footer}>Dashboard Report - Page 5</Text>
      </Page>

      {/* Page 6 - User Statistics */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Statistics</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Doctor Count"
              value={metrics.doctorCount.value}
              trend={metrics.doctorCount.trend}
            />
            <MetricCard
              title="Patient Accounts"
              value={metrics.patientAccounts.value}
              trend={metrics.patientAccounts.trend}
            />
            <MetricCard
              title="Personal Users"
              value={metrics.personalUsers.value}
              trend={metrics.personalUsers.trend}
            />
            <MetricCard
              title="School Users Company Government"
              value={metrics.schoolUsersCompanyGovernment.value}
              trend={metrics.schoolUsersCompanyGovernment.trend}
            />
            <MetricCard
              title="School Users Premium"
              value={metrics.schoolUsersPremium.value}
              trend={metrics.schoolUsersPremium.trend}
            />
            <MetricCard
              title="School Users Starter"
              value={metrics.schoolUsersStarter.value}
              trend={metrics.schoolUsersStarter.trend}
            />
            <MetricCard
              title="School Users Super Premium"
              value={metrics.schoolUsersSuperPremium.value}
              trend={metrics.schoolUsersSuperPremium.trend}
            />
            <MetricCard
              title="School Users Total"
              value={metrics.schoolUsersTotal.value}
              trend={metrics.schoolUsersTotal.trend}
            />
            <MetricCard
              title="School Users Trial"
              value={metrics.schoolUsersTrial.value}
              trend={metrics.schoolUsersTrial.trend}
            />
            <MetricCard
              title="Total Users"
              value={metrics.totalUsers.value}
              trend={metrics.totalUsers.trend}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Type Consultations</Text>
          <View style={styles.grid}>
            <MetricCard
              title="Company Government Consultations"
              value={metrics.companyGovernmentConsultations.value}
              trend={metrics.companyGovernmentConsultations.trend}
            />
            <MetricCard
              title="Personal Consultations"
              value={metrics.personalConsultations.value}
              trend={metrics.personalConsultations.trend}
            />
            <MetricCard
              title="School Consultations"
              value={metrics.schoolConsultations.value}
              trend={metrics.schoolConsultations.trend}
            />
          </View>
        </View>

        <Text style={styles.footer}>Dashboard Report - Page 6</Text>
      </Page>
    </Document>
  );
};

export default DashboardPDFDocument;
