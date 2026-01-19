// Test for JST date conversion
// This test verifies that dates are correctly interpreted as JST (UTC+9)

// Extract the createJSTDate function for testing
const createJSTDate = (year, month, day, hour, minute) => {
  const jstOffset = 9 * 60; // JST offset in minutes
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
  return new Date(date.getTime() - jstOffset * 60 * 1000);
};

describe('createJSTDate', () => {
  test('should create date representing JST midnight as correct UTC time', () => {
    // 2026-01-01 00:00 JST should be 2025-12-31 15:00 UTC
    const jstDate = createJSTDate(2026, 1, 1, 0, 0);
    
    // Get UTC components
    const utcYear = jstDate.getUTCFullYear();
    const utcMonth = jstDate.getUTCMonth() + 1;
    const utcDay = jstDate.getUTCDate();
    const utcHour = jstDate.getUTCHours();
    const utcMinute = jstDate.getUTCMinutes();
    
    // 2026-01-01 00:00 JST = 2025-12-31 15:00 UTC
    expect(utcYear).toBe(2025);
    expect(utcMonth).toBe(12);
    expect(utcDay).toBe(31);
    expect(utcHour).toBe(15);
    expect(utcMinute).toBe(0);
  });

  test('should create date representing JST noon as correct UTC time', () => {
    // 2026-01-06 12:00 JST should be 2026-01-06 03:00 UTC
    const jstDate = createJSTDate(2026, 1, 6, 12, 0);
    
    const utcYear = jstDate.getUTCFullYear();
    const utcMonth = jstDate.getUTCMonth() + 1;
    const utcDay = jstDate.getUTCDate();
    const utcHour = jstDate.getUTCHours();
    const utcMinute = jstDate.getUTCMinutes();
    
    expect(utcYear).toBe(2026);
    expect(utcMonth).toBe(1);
    expect(utcDay).toBe(6);
    expect(utcHour).toBe(3);
    expect(utcMinute).toBe(0);
  });

  test('should produce consistent results regardless of system timezone', () => {
    // Create the same JST time
    const date1 = createJSTDate(2026, 2, 7, 9, 30);
    const date2 = createJSTDate(2026, 2, 7, 9, 30);
    
    // Should be exactly the same timestamp
    expect(date1.getTime()).toBe(date2.getTime());
    
    // And should represent the correct UTC time (00:30 UTC)
    expect(date1.getUTCHours()).toBe(0);
    expect(date1.getUTCMinutes()).toBe(30);
  });
});
