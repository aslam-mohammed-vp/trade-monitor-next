export const validateISIN = (isin: string, list: string[]) => {
  // DE000BASF111
  const regex = new RegExp("^[a-zA-Z]{2}[A-Za-z0-9]{10}");
  if (list.includes(isin)) {
    return "Stock already in the watchlist";
  }
  if (!regex.test(isin)) return "Enter a valid ISIN";

  return true;
};
