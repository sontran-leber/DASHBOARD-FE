import type { ChartConfig } from "@/components/ui/chart";
import { getAllData } from "./apiService";

const generalWeeklyData = async () => {
  const allData = await getAllData();
  const allDataArray = allData.data;
  const data = [];
  for (let i = 13; i >= 0; i--) {
    data.push({
      week: `${allDataArray[i].end_date}`,
      // doctor actions
      firstResponseRate: parseFloat(
        allDataArray[i].doctor_actions.first_response_rate.replace("%", "")
      ),
      continuousResponseRate: parseFloat(
        allDataArray[i].doctor_actions.continuous_response_rate.replace("%", "")
      ),
      designatedConsultationResponseSpeedWeekly: parseFloat(
        allDataArray[i].doctor_actions
          .designated_consultation_response_speed_weekly
      ),
      favoriteConsultationResponseSpeedWeekly: parseFloat(
        allDataArray[i].doctor_actions
          .favorite_consultation_response_speed_weekly
      ),
      generalConsultationResponseSpeedWeekly: parseFloat(
        allDataArray[i].doctor_actions
          .general_consultation_response_speed_weekly
      ),
      // consultations
      totalConsultation: allDataArray[i].consultations.total_consultations,
      // consultation unique users
      cumulativePatientConsultations:
        allDataArray[i].consultation_unique_users
          .cumulative_patient_consultations,
      cumulativeUserConsultations:
        allDataArray[i].consultation_unique_users.cumulative_user_consultations,
      // company care facility counts
      careFacilityCount:
        allDataArray[i].company_care_facility_counts.care_facility_count,
      careFacilityUserCount:
        allDataArray[i].company_care_facility_counts.care_facility_user_count,
      companyCount: allDataArray[i].company_care_facility_counts.company_count,
      companyUserCount:
        allDataArray[i].company_care_facility_counts.company_user_count,
      // billing referals
      billingAmountWeekly:
        allDataArray[i].billing_referrals.billing_amount_weekly,
      billingUsersWeekly:
        allDataArray[i].billing_referrals.billing_users_weekly,
      designatedConsultationUsersWeekly:
        allDataArray[i].billing_referrals.designated_consultation_users_weekly,
      favoriteConsultationUsersWeekly:
        allDataArray[i].billing_referrals.favorite_consultation_users_weekly,
      generalConsultationUsersWeekly:
        allDataArray[i].billing_referrals.general_consultation_users_weekly,
      // doctor ratings
      doctorRatingSinceStart:
        allDataArray[i].doctor_ratings.doctor_rating_since_start,
      doctorRatingWeekly: allDataArray[i].doctor_ratings.doctor_rating_weekly,
      // paid member consultation
      premiumConsultations:
        allDataArray[i].paid_member_consultations.premium_consultations,
      superPremiumConsultations:
        allDataArray[i].paid_member_consultations.super_premium_consultations,
      totalPaidMemberConsultations:
        allDataArray[i].paid_member_consultations
          .total_paid_member_consultations,
      // pool consultation
      mentalCheckCount: allDataArray[i].pool_consultations.mental_check_count,
      poolConsultationCount:
        allDataArray[i].pool_consultations.pool_consultation_count,
      schoolCount: allDataArray[i].pool_consultations.school_count,
      // premium subscription
      paidMemberAdditionsTotal:
        allDataArray[i].premium_subscriptions.paid_member_additions_total,
      paidMemberAdditionsWeekly:
        allDataArray[i].premium_subscriptions.paid_member_additions_weekly,
      paidMembers: allDataArray[i].premium_subscriptions.paid_members,
      premiumAdditionsWeekly:
        allDataArray[i].premium_subscriptions.premium_additions_weekly,
      superPremiumAdditionsWeekly:
        allDataArray[i].premium_subscriptions.super_premium_additions_weekly,
      trialAdditionsWeekly:
        allDataArray[i].premium_subscriptions.trial_additions_weekly,
      trialUsersTotal: allDataArray[i].premium_subscriptions.trial_users_total,
      // school account registrations
      schoolAccountsTotal:
        allDataArray[i].school_account_registration.school_accounts_total,
      schoolAccountsType3:
        allDataArray[i].school_account_registration.school_accounts_type_3,
      schoolAccountsType4:
        allDataArray[i].school_account_registration.school_accounts_type_4,
      // user statistics
      doctorCount: allDataArray[i].user_statistics.doctor_count,
      patientAccounts: allDataArray[i].user_statistics.patient_accounts,
      personalUsers: allDataArray[i].user_statistics.personal_users,
      schoolUsersCompanyGovernment:
        allDataArray[i].user_statistics.school_users_company_government,
      schoolUsersPremium: allDataArray[i].user_statistics.school_users_premium,
      schoolUsersStarter: allDataArray[i].user_statistics.school_users_starter,
      schoolUsersSuperPremium:
        allDataArray[i].user_statistics.school_users_super_premium,
      schoolUsersTotal: allDataArray[i].user_statistics.school_users_total,
      schoolUsersTrial: allDataArray[i].user_statistics.school_users_trial,
      totalUsers: allDataArray[i].user_statistics.total_users,
      // user type consultations
      companyGovernmentConsultations:
        allDataArray[i].user_type_consultations
          .company_government_consultations,
      personalConsultations:
        allDataArray[i].user_type_consultations.personal_consultations,
      schoolConsultations:
        allDataArray[i].user_type_consultations.school_consultations,
    });
  }
  return data;
};
export const chartAllData = generalWeeklyData();

// Configuration for the chart

export default function chartConfig(name: string, color?: string) {
  const config = {
    generalConfig: {
      label: name,
      color: color || "#3b82f6",
    },
  } satisfies ChartConfig;
  return config;
}
