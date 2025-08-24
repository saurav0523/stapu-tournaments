import { ApiResponse, Sport } from '../types/tournament';

const BASE_URL = 'https://stapubox.com';
const DEMO_BASE_URL = 'https://mockly.me/custom';

export const API_ENDPOINTS = {
  SPORTS_LIST: `${BASE_URL}/sportslist`,
  TOURNAMENTS: `${BASE_URL}/tournament/demo`,
  DEMO_SPORTS_LIST: `${DEMO_BASE_URL}/sportslist`,
  DEMO_TOURNAMENTS: `${DEMO_BASE_URL}/tournament/demo`,
};

export class ApiService {
  static async fetchSportsList(): Promise<Sport[]> {
    try {
      console.log('Fetching sports from:', API_ENDPOINTS.SPORTS_LIST);
      const response = await fetch(API_ENDPOINTS.SPORTS_LIST);
      const data = await response.json();
      
      if (data.status === 'success' && data.data && data.data.length > 0) {
        console.log('Using StapuBox API data with', data.data.length, 'sports');
        return data.data;
      }
      
      throw new Error(data.msg || 'Failed to fetch from StapuBox API');
    } catch (error) {
      console.error('Error fetching from StapuBox API, trying demo API:', error);
      
      try {
        console.log('Trying demo API:', API_ENDPOINTS.DEMO_SPORTS_LIST);
        const demoResponse = await fetch(API_ENDPOINTS.DEMO_SPORTS_LIST);
        const demoData = await demoResponse.json();
        
        if (demoData.status === 'success' && demoData.data && demoData.data.length > 0) {
          console.log('Using demo API data with', demoData.data.length, 'sports');
          return demoData.data;
        }
        
        throw new Error('Demo API also failed');
      } catch (demoError) {
        console.error('Demo API failed, using mock data:', demoError);
        return [
          { sports_id: 1, sport_name: 'Football' },
          { sports_id: 2, sport_name: 'Cricket' },
          { sports_id: 3, sport_name: 'Badminton' },
          { sports_id: 4, sport_name: 'Table Tennis' },
          { sports_id: 5, sport_name: 'Basketball' },
        ];
      }
    }
  }

  static async fetchTournaments(): Promise<ApiResponse> {
    try {
      console.log('Fetching tournaments from:', API_ENDPOINTS.TOURNAMENTS);
      const response = await fetch(API_ENDPOINTS.TOURNAMENTS);
      const data = await response.json();
      console.log('StapuBox API Response:', data);
      
      if (data.status === 'success' && data.data && data.data.length > 0) {
        console.log('Using StapuBox API data with', data.data.length, 'sports');
        return data;
      }
      
      console.log('StapuBox API data invalid, trying demo API');
      throw new Error(data.msg || 'Failed to fetch from StapuBox API');
    } catch (error) {
      console.error('Error fetching from StapuBox API, trying demo API:', error);
      
      try {
        console.log('Trying demo API:', API_ENDPOINTS.DEMO_TOURNAMENTS);
        const demoResponse = await fetch(API_ENDPOINTS.DEMO_TOURNAMENTS);
        const demoData = await demoResponse.json();
        
        if (demoData.status === 'success' && demoData.data && demoData.data.length > 0) {
          console.log('Using demo API data with', demoData.data.length, 'sports');
          return demoData;
        }
        
        console.log('Demo API also failed, using mock data');
        throw new Error('Demo API also failed');
      } catch (demoError) {
        console.error('Demo API failed, using mock data:', demoError);
        return {
          status: 'success',
          msg: 'Data fetched successfully (mock data)',
          err: null,
          data: [
            {
              sports_id: 1,
              sport_name: 'Football',
              tournaments: [
                {
                  id: 1,
                  name: 'Durand Cup 2025',
                  tournament_img_url: 'https://example.com/durand.png',
                  level: 'Domestic',
                  start_date: '2025-08-17T00:00:00',
                  matches: [
                    {
                      id: 345,
                      stage: 'Quarter Final',
                      team_a: 'Jamshedpur (M)',
                      team_b: 'Hyderabad (M)',
                      start_time: '2025-08-17T19:10:00',
                      venue: 'Saket Sports Club',
                      status: 'upcoming',
                    },
                    {
                      id: 346,
                      stage: 'Quarter Final',
                      team_a: 'Mohun Bagan (M)',
                      team_b: 'East Bengal (M)',
                      start_time: '2025-08-18T20:00:00',
                      venue: 'Salt Lake Stadium',
                      status: 'upcoming',
                    },
                  ],
                },
              ],
            },
            {
              sports_id: 2,
              sport_name: 'Cricket',
              tournaments: [
                {
                  id: 2,
                  name: 'IPL 2025',
                  tournament_img_url: 'https://example.com/ipl.png',
                  level: 'International',
                  start_date: '2025-08-20T00:00:00',
                  matches: [
                    {
                      id: 347,
                      stage: 'Group Stage',
                      team_a: 'Mumbai Indians',
                      team_b: 'Chennai Super Kings',
                      start_time: '2025-08-20T19:30:00',
                      venue: 'Wankhede Stadium',
                      status: 'upcoming',
                    },
                  ],
                },
              ],
            },
            {
              sports_id: 3,
              sport_name: 'Badminton',
              tournaments: [
                {
                  id: 3,
                  name: 'Indian Badminton Sports',
                  tournament_img_url: 'https://example.com/badminton.png',
                  level: 'National',
                  start_date: '2025-08-23T00:00:00',
                  matches: [
                    {
                      id: 348,
                      stage: 'First Round',
                      team_a: 'PV Sindhu',
                      team_b: 'Saina Nehwal',
                      start_time: '2025-08-23T15:00:00',
                      venue: 'Indira Gandhi Stadium',
                      status: 'upcoming',
                    },
                  ],
                },
              ],
            },
            {
              sports_id: 4,
              sport_name: 'Table Tennis',
              tournaments: [
                {
                  id: 4,
                  name: 'European Smash-Sweden 2025',
                  tournament_img_url: 'https://example.com/tabletennis.png',
                  level: 'International',
                  start_date: '2025-08-20T00:00:00',
                  matches: [
                    {
                      id: 349,
                      stage: 'Group Stage',
                      team_a: 'Sweden A',
                      team_b: 'Germany A',
                      start_time: '2025-08-20T14:00:00',
                      venue: 'Stockholm Arena',
                      status: 'upcoming',
                    },
                  ],
                },
              ],
            },
          ],
        };
      }
    }
  }
}
