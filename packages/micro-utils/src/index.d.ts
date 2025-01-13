interface Window {
  __MICRO_APP_ENVIRONMENT__: boolean;
  __MICRO_APP_NAME__: string;
  __MICRO_APP_THEME__: Record<string, any>;
  rawWindow: Window;
  microApp: {
    dispatch: (data: any) => void;
    forceDispatch: (data: any) => void;
    addDataListener: (callback: (opt: any) => any) => void;
  };
}
