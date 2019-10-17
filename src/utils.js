import { format } from "date-fns";

export const formatDate = (date) => format(date, "dd/mm/yyyy hh:mma")
