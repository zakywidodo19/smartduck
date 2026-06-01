import { useState, useEffect, useCallback } from "react";

// Simulate sensor readings for a given kandang
function generateSensorData(kandangName, prevData) {
  // Add realistic variance to previous values (or start with defaults)
  const baseTemp = prevData?.suhu ?? 28;
  const baseHumidity = prevData?.kelembapan ?? 70;
  const baseAirQuality = prevData?.kualitasUdara ?? 75;
  const baseWaterLevel = prevData?.ketinggianAir ?? 60;

  // Random walk with bounds
  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
  const vary = (base, range, min, max) =>
    clamp(base + (Math.random() - 0.5) * range, min, max);

  const suhu = Math.round(vary(baseTemp, 4, 22, 40) * 10) / 10;
  const kelembapan = Math.round(vary(baseHumidity, 8, 30, 95));
  const kualitasUdara = Math.round(vary(baseAirQuality, 10, 20, 100));
  const ketinggianAir = Math.round(vary(baseWaterLevel, 6, 10, 100));

  // Determine status for each sensor
  const getStatus = (type, value) => {
    switch (type) {
      case "suhu":
        if (value >= 35) return "Bahaya";
        if (value >= 32) return "Warning";
        return "Normal";
      case "kelembapan":
        if (value < 40 || value > 90) return "Bahaya";
        if (value < 50 || value > 80) return "Warning";
        return "Normal";
      case "kualitasUdara":
        if (value < 30) return "Bahaya";
        if (value < 50) return "Warning";
        return "Normal";
      case "ketinggianAir":
        if (value < 20) return "Bahaya";
        if (value < 35) return "Warning";
        return "Normal";
      default:
        return "Normal";
    }
  };

  const suhuStatus = getStatus("suhu", suhu);
  const kelembapanStatus = getStatus("kelembapan", kelembapan);
  const kualitasUdaraStatus = getStatus("kualitasUdara", kualitasUdara);
  const ketinggianAirStatus = getStatus("ketinggianAir", ketinggianAir);

  // Overall status = worst among all sensors
  const statuses = [suhuStatus, kelembapanStatus, kualitasUdaraStatus, ketinggianAirStatus];
  let overallStatus = "Normal";
  if (statuses.includes("Bahaya")) overallStatus = "Bahaya";
  else if (statuses.includes("Warning")) overallStatus = "Warning";

  return {
    kandang: kandangName,
    suhu,
    suhuStatus,
    kelembapan,
    kelembapanStatus,
    kualitasUdara,
    kualitasUdaraStatus,
    ketinggianAir,
    ketinggianAirStatus,
    overallStatus,
    lastUpdate: new Date().toLocaleTimeString("id-ID"),
  };
}

export function useRealtimeMonitoring(intervalMs = 3000) {
  // Get active kandangs from localStorage
  const getKandangList = () => {
    const savedData = localStorage.getItem("kandangData");
    const kandangs = savedData ? JSON.parse(savedData) : [];
    return kandangs.map(k => k.nama);
  };

  const [sensorData, setSensorData] = useState(() =>
    getKandangList().map((name) => generateSensorData(name, null))
  );
  
  const [isRunning, setIsRunning] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  const updateData = useCallback(() => {
    const currentList = getKandangList();
    
    setSensorData((prev) => {
      // Create new sensor data array based on current kandang list
      return currentList.map((name) => {
        const existingData = prev.find(p => p.kandang === name);
        return generateSensorData(name, existingData || null);
      });
    });
    setUpdateCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(updateData, intervalMs);
    return () => clearInterval(timer);
  }, [isRunning, intervalMs, updateData]);

  const toggleRunning = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // Computed averages (handle empty array gracefully)
  const averages = {
    suhu: sensorData.length ? Math.round((sensorData.reduce((sum, d) => sum + d.suhu, 0) / sensorData.length) * 10) / 10 : 0,
    kelembapan: sensorData.length ? Math.round(sensorData.reduce((sum, d) => sum + d.kelembapan, 0) / sensorData.length) : 0,
    kualitasUdara: sensorData.length ? Math.round(sensorData.reduce((sum, d) => sum + d.kualitasUdara, 0) / sensorData.length) : 0,
    ketinggianAir: sensorData.length ? Math.round(sensorData.reduce((sum, d) => sum + d.ketinggianAir, 0) / sensorData.length) : 0,
  };

  // Count warnings/dangers
  const alertCount = sensorData.filter(
    (d) => d.overallStatus !== "Normal"
  ).length;

  return {
    sensorData,
    averages,
    alertCount,
    isRunning,
    toggleRunning,
    updateCount,
    updateData,
  };
}
