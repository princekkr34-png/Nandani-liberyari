// Simple phonetic mapping helper for English to Hindi character approximation
const PHONETIC_MAP: Record<string, string> = {
  "PRINCE": "प्रिंस",
  "KUMAR": "कुमार",
  "PREMSHILA": "प्रेमशिला",
  "DEVI": "देवी",
  "SHARMA": "शर्मा",
  "MADDHESHIYA": "मद्धेशिया",
  "MADHESIYA": "मद्धेशिया",
  "SINGH": "सिंह",
  "YADAV": "यादव",
  "ANANYA": "अनन्या",
  "AMIT": "अमित",
  "RAHUL": "राहुल",
  "POOJA": "पूजा",
  "PRIYA": "प्रिया",
  "VIKAS": "विकास",
  "ANIKET": "अनिकेत",
  "SUNITA": "सुनीता",
  "RAJESH": "राजेश",
  "RAMESH": "रमेश",
  "GEETA": "गीता",
  "SURESH": "सुरेश",
  "GUPTA": "गुप्ता",
  "VERMA": "वर्मा",
  "PANDEY": "पांडेय",
  "MISHRA": "मिश्रा",
  "TIWARI": "तिवारी",
  "CHOUDHARY": "चौधरी",
  "KUSHINAGAR": "कुशीनगर",
  "DUDAHI": "दुदही",
  "UP": "उत्तर प्रदेश"
};

export function transliterateEnglishToHindi(text: string): string {
  if (!text) return '';
  const words = text.trim().toUpperCase().split(/\s+/);
  const convertedWords = words.map(w => {
    if (PHONETIC_MAP[w]) return PHONETIC_MAP[w];
    // Basic fallback phonetic converter
    return phoneticFallback(w);
  });
  return convertedWords.join(' ');
}

function phoneticFallback(word: string): string {
  // Simple basic character mapper if exact match isn't in dictionary
  const charMap: Record<string, string> = {
    'A': 'ा', 'AA': 'ा', 'I': 'ि', 'EE': 'ी', 'U': 'ु', 'OO': 'ू',
    'E': 'े', 'AI': 'ै', 'O': 'ो', 'AU': 'ौ',
    'K': 'क', 'KH': 'ख', 'G': 'ग', 'GH': 'घ',
    'CH': 'च', 'CHH': 'छ', 'J': 'ज', 'JH': 'झ',
    'T': 'ट', 'TH': 'ठ', 'D': 'ड', 'DH': 'ढ', 'N': 'न',
    'P': 'प', 'PH': 'फ', 'B': 'ब', 'BH': 'भ', 'M': 'म',
    'Y': 'य', 'R': 'र', 'L': 'ल', 'V': 'व', 'W': 'व',
    'SH': 'श', 'SHH': 'ष', 'S': 'स', 'H': 'ह'
  };

  let res = '';
  let i = 0;
  while (i < word.length) {
    if (i + 2 < word.length && charMap[word.substring(i, i + 3)]) {
      res += charMap[word.substring(i, i + 3)];
      i += 3;
    } else if (i + 1 < word.length && charMap[word.substring(i, i + 2)]) {
      res += charMap[word.substring(i, i + 2)];
      i += 2;
    } else if (charMap[word[i]]) {
      res += charMap[word[i]];
      i += 1;
    } else {
      res += word[i];
      i += 1;
    }
  }
  return res || word;
}
