export async function onStartup() {
  Zotero.debug("Annotation Font Plugin: Startup");

  try {
    const toolkit = (globalThis as any).addon.data.ztoolkit;

    // Zotero 7 Preference Pane Registration
    toolkit.preference.registerPane({
      pluginID: "font-style@example.com",
      src: rootURI + "content/preferences.xhtml",
      label: "Annotation Font",
      // Adding an ID helps Zotero track the pane
      id: "fontstyle-pane"
    });

    Zotero.debug("Annotation Font Plugin: Pane Registered");
  } catch (e) {
    Zotero.debug("Annotation Font Plugin: Pane Error: " + e);
  }

  updateStyles();
  // Ensure we observe the exact preference key
  Zotero.Prefs.registerObserver("fontstyle.fontFamily", updateStyles);
}

function updateStyles() {
  try {
    const Cc = Components.classes as any;
    const Ci = Components.interfaces;
    const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
    const io = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);

    // Now that package.json is fixed, this will return "Shantell Sans"
    const fontName = Zotero.Prefs.get("extensions.zotero.fontstyle.fontFamily") || "Shantell Sans";

    const css = `
      textarea.textAnnotation,
      .customAnnotationLayer textarea,
      .pdfViewer .textAnnotation,
      .annotation-text,
      .annotation-row :is(.description, .comment, .description-text) {
          font-family: "${fontName}", sans-serif !important;
      }
    `.replace(/\n/g, "");

    const uri = io.newURI("data:text/css," + encodeURIComponent(css));

    if ((globalThis as any).currentFontURI) {
      sss.unregisterSheet((globalThis as any).currentFontURI, sss.AGENT_SHEET);
    }

    sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
    (globalThis as any).currentFontURI = uri;

    Zotero.debug("Annotation Font Plugin: Applied " + fontName);
  } catch (e) {
    Zotero.debug("Annotation Font Plugin: CSS Error: " + e);
  }
}


export function onShutdown() {
  // Use a try-catch to ignore errors if the observer isn't there
  try { Zotero.Prefs.unregisterObserver("fontstyle.fontFamily", updateStyles); } catch (e) { }

  const Cc = Components.classes as any;
  const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);
  if ((globalThis as any).currentFontURI) {
    try {
      sss.unregisterSheet((globalThis as any).currentFontURI, sss.AGENT_SHEET);
    } catch (e) { }
  }
}

export async function onMainWindowLoad() { }
export async function onMainWindowUnload() { }