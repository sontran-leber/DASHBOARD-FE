export interface DoctorActionWeeklyData {
  consultation_response_speed_weekly: string;
  continuous_response_rate: string;
  designated_consultation_response_speed_weekly: string;
  doctor_response_speed_weekly: string;
  end_date: string;
  favorite_consultation_response_speed_weekly: string;
  first_response_rate: string;
  general_consultation_response_speed_weekly: string;
  start_date: string;
}

export interface DoctorActionResponse {
  data: DoctorActionWeeklyData[];
}
