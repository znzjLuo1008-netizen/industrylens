/**
 * IndustryLens · 行业标杆三强数据库
 * 2026-04-24: 清空静态数据，全部走 AI 实时生成
 */
window.COMPANIES_DB = {};

/**
 * 通用兜底：返回 COMPANIES_DB 中动态写入的数据
 */
window.getCompaniesForIndustry = function(indId, indName) {
  if (window.COMPANIES_DB[indId] && window.COMPANIES_DB[indId].length > 0) {
    return window.COMPANIES_DB[indId];
  }
  return null;
};
