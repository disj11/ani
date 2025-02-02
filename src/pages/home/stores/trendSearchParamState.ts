import { create } from "zustand";
import { TrendSearchParams } from "../types/home.type";
import {
  getCurrentSeason,
  getCurrentSeasonYear,
  getNextSeason,
  getNextSeasonYear,
} from "../utils/season";

interface TrendSearchParamState {
  searchParams: TrendSearchParams;
  setSearchParams: (params: TrendSearchParams) => void;
  initializeSearchParams: () => void;
}

const initialState: TrendSearchParams = {
  season: getCurrentSeason(),
  seasonYear: getCurrentSeasonYear(),
  nextSeason: getNextSeason(),
  nextYear: getNextSeasonYear(),
};

const useTrendSearchParamState = create<TrendSearchParamState>((set) => ({
  searchParams: initialState,
  setSearchParams: (params) => set({ searchParams: params }),
  initializeSearchParams: () => set({ searchParams: initialState }),
}));

export default useTrendSearchParamState;
