/* Magic Mirror
 * Module: MMM-FF-process-stats
 *
 * By Michael Trenkler
 * ISC Licensed.
 */

Module.register("MMM-FF-process-stats", {
  defaults: {
    updateInterval: 1000,
    animationSpeed: 0,
    language: config.language,
    units: config.units
  },

  getStyles() {
    return ["font-awesome.css", this.file("./styles/MMM-FF-process-stats.css")];
  },

  getTranslations() {
    return {
      de: "translations/de.json",
      en: "translations/en.json"
    };
  },

  start() {
    Log.log("Starting module: " + this.name);
    this.stats = {
      CPUUsage: {
        idleWakeupsPerSecond: 0,
        percentCPUUsage: 0
      },
      systemMemoryInfo: {
        free: 0,
        total: 0,
        swapFree: 0,
        swapTotal: 0
      },
      uptime: 0
    };
    this.sendSocketNotification("CONFIG", this.config);
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "STATS") {
      this.stats = payload;
      this.updateDom(this.config.animationSpeed);
    }
  },

  getHeader() {
    return this.stats?.systemVersion || "process stats";
  },

  getTemplateData: function () {
    const t = new Date((this.stats.uptime ?? 0) * 1000);
    const days = Math.floor(this.stats.uptime / (24 * 60 * 60));
    this.stats.uptime = days ? days + " " : "";
    this.stats.uptime += t.toISOString().substr(11, 8);

    this.stats.systemMemoryInfo.total |= 1;
    this.stats.systemMemoryInfo.swapTotal |= 1;

    return {
      stats: this.stats
    };
  },

  getTemplate() {
    return "templates/stats.njk";
  }
});
