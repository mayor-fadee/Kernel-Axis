const fs = require('fs');
const path = require('path');

const draftPath = path.join(__dirname, 'test_text.txt');
let draftContent = fs.readFileSync(draftPath, 'utf8');

// Apply minor word shaves
draftContent = draftContent.replace(
  'Managing your digital footprint is about taking control of your personal digital journey.',
  'Managing your footprint is about taking control of your digital journey.'
);
draftContent = draftContent.replace(
  'remember convenient details like login status or cart items.',
  'remember details like login status or cart items.'
);
draftContent = draftContent.replace(
  'collected quietly in the background as you browse',
  'collected in the background as you browse'
);

const filePath = path.join(__dirname, 'src/components/LearnPage.tsx');
let fileContent = fs.readFileSync(filePath, 'utf8');

const startIndex = fileContent.indexOf("id: 8,");
if (startIndex === -1) {
  console.error("Could not find article id 8!");
  process.exit(1);
}

const contentKeyword = "content: `";
const contentIndex = fileContent.indexOf(contentKeyword, startIndex);
if (contentIndex === -1) {
  console.error("Could not find content keyword for id 8!");
  process.exit(1);
}

const startOfLiteral = contentIndex + contentKeyword.length;
const endOfLiteralMatch = fileContent.indexOf("`\n    },\n    {\n      id: 1,", startOfLiteral);
if (endOfLiteralMatch === -1) {
  console.error("Could not find the closing of the template literal!");
  process.exit(1);
}

const before = fileContent.substring(0, startOfLiteral);
const after = fileContent.substring(endOfLiteralMatch);

const updatedContent = before + draftContent + after;
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log("Successfully updated article content with final streamlined text!");
