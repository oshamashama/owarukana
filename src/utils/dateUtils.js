// Utility function to convert JST date components to a Date object
// Treats input year/month/day/hour/minute as JST (UTC+9) and returns proper Date object
export const createJSTDate = (year, month, day, hour, minute) => {
  // JST is UTC+9, so we need to create a date at UTC time that corresponds to the JST time
  // We do this by subtracting 9 hours from the input time
  const jstOffset = 9 * 60; // JST offset in minutes
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
  // Subtract JST offset to get the correct UTC timestamp
  return new Date(date.getTime() - jstOffset * 60 * 1000);
};
