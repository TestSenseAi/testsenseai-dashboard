import { useState, useEffect } from 'react';
import { CoverageData, RiskAssessment } from '../types/analytics';
import { mockCoverageData, mockRiskData } from '../mocks/analytics';

export function useAnalytics() {
  const [coverage, setCoverage] = useState<CoverageData>(mockCoverageData);
  const [risk, setRisk] = useState<RiskAssessment>(mockRiskData);

  useEffect(() => {
    // In a real app, fetch data from API
    const fetchAnalytics = async () => {
      // const response = await api.getAnalytics();
      // setCoverage(response.coverage);
      // setRisk(response.risk);
      setCoverage(mockCoverageData);
      setRisk(mockRiskData);
    };

    fetchAnalytics();
  }, []);

  return {
    coverage,
    risk,
  };
}
