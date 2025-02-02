import { Season } from "../types/trending.type";

export const getCurrentSeason = () => {
  const currentMonth = new Date().getMonth() + 1;
  switch (currentMonth) {
    case 1:
    case 2:
    case 3:
      return Season.WINTER;
    case 4:
    case 5:
    case 6:
      return Season.SPRING;
    case 7:
    case 8:
    case 9:
      return Season.SUMMER;
    case 10:
    case 11:
    case 12:
      return Season.FALL;
    default:
      throw new Error("Invalid month");
  }
};

export const getCurrentSeasonYear = () => {
  return new Date().getFullYear();
};

export const getNextSeason = () => {
  const season = getCurrentSeason();
  switch (season) {
    case Season.SPRING:
      return Season.SUMMER;
    case Season.SUMMER:
      return Season.FALL;
    case Season.FALL:
      return Season.WINTER;
    case Season.WINTER:
      return Season.SPRING;
    default:
      throw new Error("Invalid season");
  }
};

export const getNextSeasonYear = () => {
  const season = getCurrentSeason();
  const year = getCurrentSeasonYear();
  if (season === Season.WINTER) {
    return year + 1;
  }
  return year;
};
