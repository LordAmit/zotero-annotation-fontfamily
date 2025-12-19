import Addon from "./addon";
import { config } from "../package.json";
import * as hooks from "./hooks";

const addonInstance = new Addon();
(addonInstance as any).hooks = hooks;
(globalThis as any).addon = addonInstance;

if (!Zotero[config.addonInstance]) {
  Zotero[config.addonInstance] = addonInstance;
}

export default addonInstance;