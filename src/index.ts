import Addon from "./addon";
import { config } from "../package.json";
import * as hooks from "./hooks";

const addonInstance = new Addon();
(addonInstance as any).hooks = hooks;

// Attach to Zotero global so bootstrap.js can find it
if (!(Zotero as any)[config.addonInstance]) {
  (Zotero as any)[config.addonInstance] = addonInstance;
}

// Global variable for internal plugin use
(globalThis as any).addon = addonInstance;

export default addonInstance;