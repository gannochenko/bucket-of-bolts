"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Settings {
    get(name, defaultValue = null) {
        if (window && window.__settings && name in window.__settings) {
            return window.__settings[name];
        }
        return defaultValue;
    }
    async set(name, value) { }
}
exports.Settings = Settings;
//# sourceMappingURL=settings.client.js.map