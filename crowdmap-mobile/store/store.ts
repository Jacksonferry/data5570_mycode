import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Location = {
  id: string;
  name: string;
  category: string;
  crowdLevel: number;
};

const initialState: { locations: Location[] } = {
  locations: [
    {
      id: '1',
      name: 'USU Recreation Center',
      category: 'Gym',
      crowdLevel: 3,
    },
    {
      id: '2',
      name: 'Merrill-Cazier Library',
      category: 'Library',
      crowdLevel: 2,
    },
    {
      id: '3',
      name: 'Taggart Student Center',
      category: 'Student Center',
      crowdLevel: 4,
    },
  ],
};

const crowdSlice = createSlice({
  name: 'crowd',
  initialState,
  reducers: {
    updateCrowdLevel: (
      state,
      action: PayloadAction<{ id: string; crowdLevel: number }>
    ) => {
      const location = state.locations.find(
        (item) => item.id === action.payload.id
      );

      if (location) {
        location.crowdLevel = Math.max(
          1,
          Math.min(5, action.payload.crowdLevel)
        );
      }
    },
  },
});

export const { updateCrowdLevel } = crowdSlice.actions;

export const store = configureStore({
  reducer: {
    crowd: crowdSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;