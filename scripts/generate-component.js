const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error(
    "Usage: node createComponent.js <path/to/folder/ComponentName>"
  );
  process.exit(1);
}

const fullPath = args[0];
var prefixToAdd = "Page";
if (fullPath.toLowerCase().includes("components/")) {
  prefixToAdd = "Component";
}
const componentName = path.basename(fullPath) + prefixToAdd;
const targetDir = path.join(process.cwd(), fullPath + prefixToAdd);

const files = [
  {
    name: `${componentName}.tsx`,
    content: `import { View } from "react-native";
import use${componentName}Service from "./${componentName}.service"; 
import styles from "./${componentName}.style";

export default function ${componentName}() {
  const ${componentName}Service = use${componentName}Service();
  return (
    <View></View>
  );
}`,
  },
  {
    name: `${componentName}.style.ts`,
    content: `import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

});

export default styles;`,
  },
  {
    name: `${componentName}.service.ts`,
    content: `export default function use${componentName}Service() {}`,
  },
];

try {
  // Create the folder
  fs.mkdirSync(targetDir, { recursive: true });

  // Create each file with its respective content
  files.forEach((file) => {
    const filePath = path.join(targetDir, file.name);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content);
    }
  });

  console.log(`Component ${componentName} created at ${fullPath}`);
} catch (error) {
  console.error("Error creating component:", error.message);
}
