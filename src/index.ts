import { BasicTool } from "zotero-plugin-toolkit";
import Addon from "./addon";
import { config } from "../package.json";
import * as hooks from "./hooks";

const basicTool = new BasicTool();

const addonInstance = new Addon();
(addonInstance as any).hooks = hooks;

// Set this globally first!
(globalThis as any).addon = addonInstance;

if (!Zotero[config.addonInstance]) {
  Zotero[config.addonInstance] = addonInstance;
}

export default addonInstance;