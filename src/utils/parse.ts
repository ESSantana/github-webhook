import moment from "moment";

export const parseDate = (source: string): string => {
  moment.locale("pt-br");
  return moment(source).format("LLLL");
};
