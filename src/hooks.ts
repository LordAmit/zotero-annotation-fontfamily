export async function onStartup() {
  Zotero.debug("annotationFontStyle: Starting in Config-only mode");

  updateStyles();

  // Watch the new key name
  Zotero.Prefs.registerObserver("extensions.zotero.fontstyle.annotationFontFamily", updateStyles, true);
}

export function updateStyles() {
  try {
    const Cc = Components.classes as any;
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
    const io = Cc["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);

    // Pull both preferences
    const fontName = Zotero.Prefs.get("extensions.zotero.fontstyle.annotationFontFamily", true) || "Shantell Sans";
    const fontSize = Zotero.Prefs.get("extensions.zotero.fontstyle.annotationFontSize", true) || "13";

    Zotero.debug(`annotationFontStyle: Applying ${fontName} at ${fontSize}px`);

    const css = `
      textarea.textAnnotation,
      .textAnnotation,
      .annotation-text,
      .annotation-row :is(.description, .comment, .description-text) {
          font-family: "${fontName}", sans-serif !important;
          font-size: ${fontSize}px !important;
          overflow: visible !important;
          white-space: pre-wrap !important;
          line-height: 1.3 !important;
          box-sizing: border-box !important;
      }

      /* Help the container stay flexible */
      section.textWidgetAnnotation,
      .textWidgetAnnotation {
          width: auto !important;
          min-width: 50px !important;
      }
    `.replace(/\n/g, "");

    const uri = io.newURI("data:text/css," + encodeURIComponent(css));

    if ((globalThis as any).currentFontURI) {
      try { sss.unregisterSheet((globalThis as any).currentFontURI, sss.AGENT_SHEET); } catch (e) { }
    }

    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
    (globalThis as any).currentFontURI = uri;
  } catch (e) {
    Zotero.debug("annotationFontStyle Error: " + e);
  }
}

export function onShutdown() {
  // Update unregister to match
  Zotero.Prefs.unregisterObserver("extensions.zotero.fontstyle.annotationFontFamily", updateStyles);
}

export async function onMainWindowLoad() { }
export async function onMainWindowUnload() { }