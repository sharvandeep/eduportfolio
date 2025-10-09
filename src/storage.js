// storage.js
const LS_PREFIX = "portfolio:";
export const getPortfolio = (studentId) => {
  if (!studentId) return null;
  try {
    const raw = localStorage.getItem(LS_PREFIX + String(studentId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const savePortfolio = (studentId, data) => {
  if (!studentId) throw new Error("studentId required");
  localStorage.setItem(LS_PREFIX + String(studentId), JSON.stringify(data));
  return true;
};

// optional: ask browser for persistent storage to reduce eviction risk
export const requestPersistence = async () => {
  if (navigator.storage?.persist) {
    try {
      return await navigator.storage.persist();
    } catch {
      return false;
    }
  }
  return false;
};
