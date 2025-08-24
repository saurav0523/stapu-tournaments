export interface Sport {
  sports_id: number;
  sport_name: string;
}

export interface Match {
  id: number;
  stage: string;
  team_a: string;
  team_b: string;
  start_time: string;
  venue: string;
  status: string;
}

export interface Tournament {
  id: number;
  name: string;
  tournament_img_url: string;
  level: string;
  start_date: string;
  end_date?: string;
  sport_name?: string;
  matches: Match[];
}

export interface SportWithTournaments {
  sports_id: number;
  sport_name: string;
  tournaments: Tournament[];
}

export interface ApiResponse {
  status: string;
  msg: string;
  err: string | null;
  data: SportWithTournaments[];
}

export interface CalendarDate {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}
