const envUtils = Object.freeze({
  get tenantId(): string {
    // let tenantId = (window.env?.tenantId || "").trim();
    // if (tenantId.length > 0 && tenantId.indexOf("${") === -1) {
    //   return tenantId;
    // }
    return "tenant-id";
  },
});

export const useEnvUtils = () => {
  return envUtils;
};
