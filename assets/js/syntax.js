function setSyntaxDark(isDark) {
    const lightSheet = getStyleSheet("syntax-light");
    const darkSheet = getStyleSheet("syntax-dark");
    
    if (lightSheet && darkSheet) {
      lightSheet.disabled = isDark;
      darkSheet.disabled = !isDark;
    }
  }
  
  function getStyleSheet(id) {
    for (let i = 0; i < document.styleSheets.length; i++) {
      const sheet = document.styleSheets[i];
      if (sheet.ownerNode.id === id) {
        return sheet.ownerNode;
      }
    }
    return null;
  }
  