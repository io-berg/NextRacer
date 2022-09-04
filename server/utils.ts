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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisi eu consectetur consectetur, nisi nisi consectetur nisi, ismod nisi.",
  ];

  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
};

const getUserProgress = (input: string, paragraph: string) => {
  const complete = paragraph.length;
  let progress = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === paragraph[i]) {
      progress++;
    }
  }
  return (progress / complete) * 100;
};

export { generateSmallGuid, getParagraph, getUserProgress };
