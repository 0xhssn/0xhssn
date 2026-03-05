export const mockLogger = () => {
  let lastLog: any = null;
  return {
    info: (message: string, metadata: object) => {
      lastLog = {
        level: 'info',
        message,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
        },
      };
    },
    get lastLog() {
      return lastLog;
    },
  };
};

export const mockCloudResource = () => {
  return {
    getMetrics: async () => ({
      cpu: Math.random() * 100,
      memory: Math.random() * 1024,
      network: Math.random() * 1000,
    }),
  };
};

export const mockJotaiStore = () => {
  const changeLog: any[] = [];
  return {
    set: (atom: string, value: any) => {
      changeLog.push({
        atom,
        oldValue: undefined,
        newValue: value,
        timestamp: new Date().toISOString(),
      });
    },
    getChangeLog: () => changeLog,
  };
};

export const mockTransaction = (shouldFail: boolean = false) => {
  return {
    execute: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Transaction failed'));
        } else {
          resolve({
            duration: Math.random() * 100,
            status: 'success',
          });
        }
      }, Math.random() * 50);
    }),
  };
};