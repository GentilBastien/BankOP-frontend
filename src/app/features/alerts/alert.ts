export interface Alert {
  message: string;
  type: AlertType;
  icon: string;
  color: string;
  bg_color: string;
}

export const BUILD_ALERT = (message: string, type: AlertType): Alert => {
  const colors: string[] = findColors(type);
  return {
    message,
    type,
    icon: findIcon(type),
    color: colors[0],
    bg_color: colors[1],
  };
};

function findColors(type: AlertType): string[] {
  switch (type) {
    case AlertType.SUCCESS:
      return ['#56b92c', '#e2ffd7'];
    case AlertType.INFO:
      return ['#239fa4', '#dcf8ff'];
    case AlertType.WARN:
      return ['#ff9900', '#ffe7cf'];
    case AlertType.ERROR:
      return ['#dc3131', '#dc313126'];
  }
}

function findIcon(type: AlertType): string {
  switch (type) {
    case AlertType.SUCCESS:
      return 'done';
    case AlertType.INFO:
      return 'info';
    case AlertType.WARN:
      return 'priority_high';
    case AlertType.ERROR:
      return 'error';
  }
}

export enum AlertType {
  SUCCESS = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}
