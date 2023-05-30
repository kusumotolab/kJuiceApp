export class DateFormatter {
  public static convertDateFormat(dateAsString: string) {
    return new Date(dateAsString).toLocaleString();
  }
}
