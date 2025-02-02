import { create } from "zustand";
import { TrendingSearchParams } from "../types/trending.type";
import {
  getCurrentSeason,
  getCurrentSeasonYear,
  getNextSeason,
  getNextSeasonYear,
} from "../utils/season";

interface TrendingSearchParamState {
  searchParams: TrendingSearchParams;
  setSearchParams: (params: TrendingSearchParams) => void;
  initializeSearchParams: () => void;
}

const initialState: TrendingSearchParams = {
  season: getCurrentSeason(),
  seasonYear: getCurrentSeasonYear(),
  nextSeason: getNextSeason(),
  nextYear: getNextSeasonYear(),
};

const useTrendSearchParamState = create<TrendingSearchParamState>((set) => ({
  searchParams: initialState,
  setSearchParams: (params) => set({ searchParams: params }),
  initializeSearchParams: () => set({ searchParams: initialState }),
}));

export default useTrendSearchParamState;
