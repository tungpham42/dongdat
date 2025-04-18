import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    appTitle: "Earthquake Monitor",
    recentEarthquakes: "Recent Earthquakes",
    lastDay: "Last Day",
    lastMonth: "Last Month",
    filters: "Filters",
    minMagnitude: "Minimum Magnitude",
    maxMagnitude: "Maximum Magnitude",
    timeRange: "Time Range",
    pastDay: "Past Day",
    pastMonth: "Past Month",
    applyFilters: "Apply Filters",
    magnitude: "Magnitude",
    time: "Time",
    depth: "Depth",
    location: "Location",
    locationDetails: "Location Details",
    date: "Date",
    loading: "Loading...",
  },
  vi: {
    appTitle: "Theo dõi động đất",
    recentEarthquakes: "Động đất gần đây",
    lastDay: "Ngày cuối",
    lastMonth: "Tháng cuối",
    filters: "Bộ lọc",
    minMagnitude: "Cường độ tối thiểu",
    maxMagnitude: "Cường độ tối đa",
    timeRange: "Khoảng thời gian",
    pastDay: "Ngày qua",
    pastMonth: "Tháng qua",
    applyFilters: "Áp dụng bộ lọc",
    magnitude: "Cường độ",
    time: "Thời gian",
    depth: "Độ sâu",
    location: "Vị trí",
    locationDetails: "Chi tiết vị trí",
    date: "Ngày",
    loading: "Đang tải...",
  },
  fr: {
    appTitle: "Moniteur de Séismes",
    recentEarthquakes: "Séismes Récents",
    lastDay: "Dernier Jour",
    lastMonth: "Dernier Mois",
    filters: "Filtres",
    minMagnitude: "Magnitude Minimale",
    maxMagnitude: "Magnitude Maximale",
    timeRange: "Période",
    pastDay: "Dernières 24 Heures",
    pastMonth: "Dernier Mois",
    applyFilters: "Appliquer les Filtres",
    magnitude: "Magnitude",
    time: "Heure",
    depth: "Profondeur",
    location: "Emplacement",
    locationDetails: "Détails de l'emplacement",
    date: "Date",
    loading: "Chargement...",
  },
  es: {
    appTitle: "Monitor de Terremotos",
    recentEarthquakes: "Terremotos Recientes",
    lastDay: "Último Día",
    lastMonth: "Último Mes",
    filters: "Filtros",
    minMagnitude: "Magnitud Mínima",
    maxMagnitude: "Magnitud Máxima",
    timeRange: "Rango de Tiempo",
    pastDay: "Último Día",
    pastMonth: "Último Mes",
    applyFilters: "Aplicar Filtros",
    magnitude: "Magnitud",
    time: "Hora",
    depth: "Profundidad",
    location: "Ubicación",
    locationDetails: "Detalles de la ubicación",
    date: "Fecha",
    loading: "Cargando...",
  },
  pt: {
    appTitle: "Monitor de Terremotos",
    recentEarthquakes: "Terremotos Recentes",
    lastDay: "Último Dia",
    lastMonth: "Último Mês",
    filters: "Filtros",
    minMagnitude: "Magnitude Mínima",
    maxMagnitude: "Magnitude Máxima",
    timeRange: "Período de Tempo",
    pastDay: "Último Dia",
    pastMonth: "Último Mês",
    applyFilters: "Aplicar Filtros",
    magnitude: "Magnitude",
    time: "Hora",
    depth: "Profundidade",
    location: "Localização",
    locationDetails: "Detalhes da localização",
    date: "Data",
    loading: "Carregando...",
  },
  de: {
    appTitle: "Erdbeben Monitor",
    recentEarthquakes: "Aktuelle Erdbeben",
    lastDay: "Letzter Tag",
    lastMonth: "Letzter Monat",
    filters: "Filter",
    minMagnitude: "Minimale Stärke",
    maxMagnitude: "Maximale Stärke",
    timeRange: "Zeitraum",
    pastDay: "Letzter Tag",
    pastMonth: "Letzter Monat",
    applyFilters: "Filter anwenden",
    magnitude: "Stärke",
    time: "Zeit",
    depth: "Tiefe",
    location: "Standort",
    locationDetails: "Standortdetails",
    date: "Datum",
    loading: "Laden...",
  },
  it: {
    appTitle: "Monitor Terremoti",
    recentEarthquakes: "Terremoti Recenti",
    lastDay: "Ultimo Giorno",
    lastMonth: "Ultimo Mese",
    filters: "Filtri",
    minMagnitude: "Magnitudo Minima",
    maxMagnitude: "Magnitudo Massima",
    timeRange: "Intervallo di Tempo",
    pastDay: "Ultimo Giorno",
    pastMonth: "Ultimo Mese",
    applyFilters: "Applica Filtri",
    magnitude: "Magnitudo",
    time: "Ora",
    depth: "Profondità",
    location: "Posizione",
    locationDetails: "Dettagli della posizione",
    date: "Data",
    loading: "Caricamento...",
  },
  ru: {
    appTitle: "Монитор Землетрясений",
    recentEarthquakes: "Недавние Землетрясения",
    lastDay: "Последний День",
    lastMonth: "Последний Месяц",
    filters: "Фильтры",
    minMagnitude: "Минимальная Магнитуда",
    maxMagnitude: "Максимальная Магнитуда",
    timeRange: "Временной Промежуток",
    pastDay: "Последний День",
    pastMonth: "Последний Месяц",
    applyFilters: "Применить Фильтры",
    magnitude: "Магнитуда",
    time: "Время",
    depth: "Глубина",
    location: "Местоположение",
    locationDetails: "Детали Местоположения",
    date: "Дата",
    loading: "Загрузка...",
  },
  ja: {
    appTitle: "地震モニター",
    recentEarthquakes: "最近の地震",
    lastDay: "過去1日",
    lastMonth: "過去1ヶ月",
    filters: "フィルター",
    minMagnitude: "最小マグニチュード",
    maxMagnitude: "最大マグニチュード",
    timeRange: "時間範囲",
    pastDay: "過去1日",
    pastMonth: "過去1ヶ月",
    applyFilters: "フィルターを適用",
    magnitude: "マグニチュード",
    time: "時間",
    depth: "深さ",
    location: "位置",
    locationDetails: "位置の詳細",
    date: "日付",
    loading: "読み込み中...",
  },
  ko: {
    appTitle: "지진 모니터",
    recentEarthquakes: "최근 지진",
    lastDay: "지난 1일",
    lastMonth: "지난 1개월",
    filters: "필터",
    minMagnitude: "최소 규모",
    maxMagnitude: "최대 규모",
    timeRange: "시간 범위",
    pastDay: "지난 1일",
    pastMonth: "지난 1개월",
    applyFilters: "필터 적용",
    magnitude: "규모",
    time: "시간",
    depth: "깊이",
    location: "위치",
    locationDetails: "위치 세부정보",
    date: "날짜",
    loading: "로딩 중...",
  },
  zh: {
    appTitle: "地震监测",
    recentEarthquakes: "近期地震",
    lastDay: "最近一天",
    lastMonth: "最近一月",
    filters: "筛选条件",
    minMagnitude: "最小震级",
    maxMagnitude: "最大震级",
    timeRange: "时间范围",
    pastDay: "过去一天",
    pastMonth: "过去一月",
    applyFilters: "应用筛选",
    magnitude: "震级",
    time: "时间",
    depth: "深度",
    location: "位置",
    locationDetails: "位置详情",
    date: "日期",
    loading: "加载中...",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage && translations[savedLanguage] ? savedLanguage : "vi";
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translate = (key) => {
    return translations[language][key] || key; // Return key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the Language Context
export const useLanguage = () => useContext(LanguageContext);
