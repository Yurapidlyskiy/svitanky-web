// Texts live in the messages under `news.campProgram`. Day themes are `d1`…`d10`
// (labelled "День {day}"); schedule rows are keyed by activity, with the time kept here.
export const CAMP_DAYS = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10'] as const;

export const CAMP_SCHEDULE = [
  { id: 'wakeUp', time: '7:30' },
  { id: 'getReady', time: '7:50' },
  { id: 'liturgy', time: '8:30' },
  { id: 'breakfast', time: '9:30' },
  { id: 'opening', time: '10:30' },
  { id: 'tidyRooms', time: '10:45' },
  { id: 'bigGame', time: '11:00' },
  { id: 'clips', time: '13:00' },
  { id: 'rest', time: '13:30' },
  { id: 'lunch', time: '14:00' },
  { id: 'siesta', time: '14:30' },
  { id: 'artTherapy', time: '16:00' },
  { id: 'sports', time: '18:15' },
  { id: 'dinner', time: '19:00' },
  { id: 'dayClosing', time: '20:00' },
  { id: 'rosary', time: '21:00' },
  { id: 'snack', time: '21:45' },
  { id: 'candle', time: '22:00' },
  { id: 'lightsOut', time: '22:30' },
] as const;
