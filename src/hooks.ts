export async function onStartup() {
  Zotero.debug("Annotation Font Plugin: onStartup");

  const stylesheetPath = rootURI + "content/style.css";

  try {
    // Cast Components.classes to any to avoid indexing errors
    const Cc = Components.classes as any;
    const Ci = Components.interfaces;

    const io = Cc["@mozilla.org/network/io-service;1"]
      .getService(Ci.nsIIOService);
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"]
      .getService(Ci.nsIStyleSheetService);
    const uri = io.newURI(stylesheetPath);

    if (!sss.sheetRegistered(uri, sss.USER_SHEET)) {
      sss.loadAndRegisterSheet(uri, sss.USER_SHEET);
      Zotero.debug("Annotation Font Plugin: CSS Registered via SSS: " + stylesheetPath);
    }
  } catch (e) {
    Zotero.debug("Annotation Font Plugin: CSS Injection Error: " + e);
  }
}

export function onShutdown() {
  Zotero.debug("Annotation Font Plugin: onShutdown");
  try {
    const Cc = Components.classes as any;
    const Ci = Components.interfaces;
    const io = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    const uri = io.newURI(rootURI + "content/style.css");

    if (sss.sheetRegistered(uri, sss.USER_SHEET)) {
      sss.unregisterSheet(uri, sss.USER_SHEET);
    }
  } catch (e) {
    Zotero.debug("Annotation Font Plugin: Shutdown Cleanup Error: " + e);
  }
}

export async function onMainWindowLoad(window: Window) { }
export async function onMainWindowUnload(window: Window) { }