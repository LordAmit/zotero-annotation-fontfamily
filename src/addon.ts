import { ZoteroPluginToolkit } from "zotero-plugin-toolkit";

export default class Addon {
  constructor() {
    Zotero.debug("Annotation Font Style Addon Initialized");
  }

  log(msg: string) {
    Zotero.debug(`[Annotation Font]: ${msg}`);
  }

  // This provides the toolkit instance to our hooks
  get data() {
    return {
      ztoolkit: (globalThis as any).ztoolkit as ZoteroPluginToolkit,
    };
  }
}