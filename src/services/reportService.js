const API_BASE_URL = "http://localhost:8000/api/v1";

export const saveAnalysisHistory = async (userId, veritasReport) => {
  if (!userId || !veritasReport) return null;

  try {
    const payload = {
      userId,
      reportId: veritasReport.report_id || `rep_${Date.now()}`,
      title: veritasReport.metadata?.article_title || "Untitled Analysis",
      classification: veritasReport.final_verdict?.classification || "Unknown",
      credibilityScore: veritasReport.final_verdict?.credibility_score || 0,
      biasScore: veritasReport.final_verdict?.bias_score || 0,
      reportData: veritasReport,
      tags: [],
    };

    const response = await fetch(`${API_BASE_URL}/history/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to save analysis history");
    }

    return await response.json();
  } catch (error) {
    console.error("Report save error:", error);
    return null;
  }
};

export const getUserHistory = async (userId) => {
  if (!userId) return [];
  
  try {
    const response = await fetch(`${API_BASE_URL}/history/user/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch history");
    return await response.json();
  } catch (error) {
    console.error("Fetch history error:", error);
    return [];
  }
};

export const getReportById = async (reportId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/history/report/${reportId}`);
    if (!response.ok) throw new Error("Failed to fetch report");
    return await response.json();
  } catch (error) {
    console.error("Fetch report error:", error);
    return null;
  }
};

export const updateReport = async (reportId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/history/report/${reportId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    if (!response.ok) throw new Error("Failed to update report");
    return await response.json();
  } catch (error) {
    console.error("Update report error:", error);
    return null;
  }
};
