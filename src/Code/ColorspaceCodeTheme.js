const CodeTheme = () => {
  return {
    "code[class*=\"language-\"]": {
      "color": "#f8f8f2",
      "background": "none",
      "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
      "fontFamily": "Work Sans, monospace",
      "textAlign": "left",
      "whiteSpace": "pre",
      "wordSpacing": "normal",
      "wordBreak": "normal",
      "wordWrap": "normal",
      "lineHeight": "1.5",
      "MozTabSize": "4",
      "OTabSize": "4",
      "tabSize": "4",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none"
    },
    "pre[class*=\"language-\"]": {
      "color": "#f8f8f2",
      "background": "#000",
      "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
      "fontFamily": "Work Sans, monospace",
      "textAlign": "left",
      "whiteSpace": "pre",
      "wordSpacing": "normal",
      "wordBreak": "normal",
      "wordWrap": "normal",
      "lineHeight": "1.5",
      "MozTabSize": "4",
      "OTabSize": "4",
      "tabSize": "4",
      "WebkitHyphens": "none",
      "MozHyphens": "none",
      "msHyphens": "none",
      "hyphens": "none",
      "padding": "1em",
      "margin": ".5em 0",
      "overflow": "auto",
      "borderRadius": "0.3em"
    },
    ":not(pre) > code[class*=\"language-\"]": {
      "background": "#000",
      "padding": ".1em",
      "borderRadius": ".3em",
      "whiteSpace": "normal"
    },
    "comment": {
      "color": "#6272a4"
    },
    "prolog": {
      "color": "#6272a4"
    },
    "doctype": {
      "color": "#6272a4"
    },
    "cdata": {
      "color": "#6272a4"
    },
    "punctuation": {
      "color": "#f8f8f2"
    },
    ".namespace": {
      "Opacity": ".7"
    },
    "property": {
      "color": "#ff0093"
    },
    "tag": {
      "color": "#ff0093"
    },
    "constant": {
      "color": "#ff0093"
    },
    "symbol": {
      "color": "#ff0093"
    },
    "deleted": {
      "color": "#ff0093"
    },
    "boolean": {
      "color": "#00ff90"
    },
    "number": {
      "color": "#00ff90"
    },
    "selector": {
      "color": "#50fa7b"
    },
    "attr-name": {
      "color": "#50fa7b"
    },
    "string": {
      "color": "#50fa7b"
    },
    "char": {
      "color": "#50fa7b"
    },
    "builtin": {
      "color": "#50fa7b"
    },
    "inserted": {
      "color": "#50fa7b"
    },
    "operator": {
      "color": "#f8f8f2"
    },
    "entity": {
      "color": "#f8f8f2",
      "cursor": "help"
    },
    "url": {
      "color": "#f8f8f2"
    },
    ".language-css .token.string": {
      "color": "#f8f8f2"
    },
    ".style .token.string": {
      "color": "#f8f8f2"
    },
    "variable": {
      "color": "#f8f8f2"
    },
    "atrule": {
      "color": "#00ffe5"
    },
    "attr-value": {
      "color": "#00ffe5"
    },
    "function": {
      "color": "#00ffe5"
    },
    "class-name": {
      "color": "#00ffe5"
    },
    "keyword": {
      "color": "#8be9fd"
    },
    "regex": {
      "color": "#ffb86c"
    },
    "important": {
      "color": "#ffb86c",
      "fontWeight": "bold"
    },
    "bold": {
      "fontWeight": "bold"
    },
    "italic": {
      "fontStyle": "italic"
    }
  }
}

export default CodeTheme;