import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ElevatorState {
  numberOfFloors: number;
  floorHeights: number[];
  acceleration: number;
  deceleration: number;
  maxSpeed: number;
  startFloor: number;
  endFloor: number;
  travelTime: number | null;
  peakSpeed: number | null;
}

const initialState: ElevatorState = {
  numberOfFloors: 3,
  floorHeights: [3, 3, 3],
  acceleration: 1,
  deceleration: 1,
  maxSpeed: 2,
  startFloor: 0,
  endFloor: 0,
  travelTime: null,
  peakSpeed: null,
};

const elevatorSlice = createSlice({
  name: "elevator",
  initialState,
  reducers: {
    setNumberOfFloors(state, action: PayloadAction<number>) {
      state.numberOfFloors = action.payload;
      state.floorHeights = new Array(action.payload).fill(3);
    },
    setFloorHeight(
      state,
      action: PayloadAction<{ index: number; height: number }>
    ) {
      state.floorHeights[action.payload.index] = action.payload.height;
    },
    setAcceleration(state, action: PayloadAction<number>) {
      state.acceleration = action.payload;
    },
    setDeceleration(state, action: PayloadAction<number>) {
      state.deceleration = action.payload;
    },
    setMaxSpeed(state, action: PayloadAction<number>) {
      state.maxSpeed = action.payload;
    },
    setStartFloor(state, action: PayloadAction<number>) {
      state.startFloor = action.payload;
    },
    setEndFloor(state, action: PayloadAction<number>) {
      state.endFloor = action.payload;
    },
    setTravelData(
      state,
      action: PayloadAction<{ travelTime: number; peakSpeed: number }>
    ) {
      state.travelTime = action.payload.travelTime;
      state.peakSpeed = action.payload.peakSpeed;
    },
  },
});

export const {
  setNumberOfFloors,
  setFloorHeight,
  setAcceleration,
  setDeceleration,
  setMaxSpeed,
  setStartFloor,
  setEndFloor,
  setTravelData,
} = elevatorSlice.actions;

export default elevatorSlice.reducer;
