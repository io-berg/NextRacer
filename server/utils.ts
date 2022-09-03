const generateSmallGuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
};

const getParagraph = () => {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, euismod nisi nisi euismod nisi.",
  ];

  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
};

export { generateSmallGuid, getParagraph };
