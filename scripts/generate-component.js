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
const componentName = path.basename(fullPath);
const targetDir = path.join(process.cwd(), fullPath);

const files = [
  {
    name: `${componentName}.tsx`,
    content: `import { View } from "react-native";
import use${componentName}Service from "./${componentName}.service"; 
import styles from "./${componentName}.style";

export default function ${componentName}() {
  const service = use${componentName}Service();
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

if (fullPath.toLowerCase().includes("pages")) {
  files.push({
    name: `${componentName.toLowerCase()}.tsx`,
    content: `import ${componentName}Page from "@/Pages/${componentName}/${componentName}";

export default function ${componentName}() {
  return <${componentName}Page />;
}
    `,
    targetDir: "/app",
  });
}

try {
  // Create the folder
  fs.mkdirSync(targetDir, { recursive: true });

  // Create each file with its respective content
  files.forEach((file) => {
    const filePath = path.join(
      file.targetDir ? path.join(process.cwd(), file.targetDir) : targetDir,
      file.name
    );
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content);
    }
  });

  console.log(`Component ${componentName} created at ${fullPath}`);
} catch (error) {
  console.error("Error creating component:", error.message);
}
