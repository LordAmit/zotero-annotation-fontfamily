import { ZoteroToolkit } from "zotero-plugin-toolkit";

export default class Addon {
  constructor() {
    Zotero.debug("Annotation Font Style Addon Initialized");
  }

  get data() {
    return {
      // This retrieves the toolkit instance that the template initializes
      ztoolkit: (globalThis as any).ztoolkit as ZoteroToolkit,
    };
  }
}