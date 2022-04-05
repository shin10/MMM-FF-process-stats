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

  getDom() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `<ul>
  <li>
    <span class="icon">
      <i class="fa fa-bell"></i>
    </span>
    <span class="key">${this.translate("CPU_USAGE_WAKEUPS_PER_SECOND")}</span>
    <span class="val">${
      this.stats.CPUUsage.idleWakeupsPerSecond
    } ${this.translate("PER_SECOND")}</span>
  </li>
  <li>
    <span class="icon">
      <i class="fa fa-microchip"></i>
    </span>
    <span class="key">${this.translate("CPU_USAGE_PERCENT")}</span>
    <span class="val">${this.stats.CPUUsage.percentCPUUsage.toFixed(2)} %</span>
  </li>
  <li>
    <span class="icon">
      <i class="fa fa-tachometer"></i>
    </span>
    <span class="key">${this.translate("MEMORY")}</span>
    <span class="val">${(
      (1 -
        this.stats.systemMemoryInfo.free / this.stats.systemMemoryInfo.total) *
      100
    ).toFixed(1)} %</span>
  </li>
  <li>
    <span class="icon">
      <i class="fa fa-shuffle"></i>
    </span>
    <span class="key">${this.translate("SWAP")}</span>
    <span class="val">${(
      (1 -
        this.stats.systemMemoryInfo.swapFree /
          this.stats.systemMemoryInfo.swapTotal) *
      100
    ).toFixed(1)} %</span>
  </li>

  <li>
    <span class="icon">
      <i class="fa fa-clock-o"></i>
    </span>
    <span class="key">${this.translate("UPTIME")}</span>
    <span class="val">${this.stats.uptime}</span>
  </li>
</ul>`;

    return wrapper;
  }
});
