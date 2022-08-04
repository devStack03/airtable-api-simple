import Airtable from 'airtable';

const API_KEY = 'key4CZ5X8UParOFne';
const API_BASE = 'app8ZbcPx7dkpOnP0';
export default new Airtable({ apiKey: API_KEY }).base(API_BASE);
