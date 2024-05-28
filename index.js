#!/usr/bin/env node

const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

const projectPath = process.argv[2];

if (!projectPath) {
  console.error("Please specify the project path as an argument.");
  process.exit(1);
}

async function readDirectDependencies(projectPath) {
  try {
    const packageJsonPath = path.join(projectPath, "package.json");
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
    return Object.keys(packageJson.dependencies || {});
  } catch (error) {
    console.error("Error reading package.json:", error);
    process.exit(1);
  }
}

function formatReportLine([key, value]) {
  let packageName = key;
  let packageVersion = "N/A";

  const versionIndex = key.lastIndexOf("@");
  if (versionIndex > 0) {
    packageName = key.substring(0, versionIndex);
    packageVersion = key.substring(versionIndex + 1);
  }

  const repositoryUrl = value.repository || "URL not available";
  return `| ${packageName} | ${packageVersion} | ${value.licenses} | ${repositoryUrl} |`;
}

async function generateReport(
  packages,
  directDependencies,
  outputPath,
  reportType
) {
  try {
    const packageEntries = Object.entries(packages);
    const reportLines = packageEntries
      .filter(([key]) => {
        const packageName = key.startsWith("@")
          ? key.split(/(?<!^)@/)[0]
          : key.split("@")[0];
        return reportType === "direct"
          ? directDependencies.includes(packageName)
          : true;
      })
      .map(formatReportLine);

    const reportContent = `| Name | Version | License | URL |\n| --- | --- | --- | --- |\n${reportLines.join(
      "\n"
    )}`;
    await fs.writeFile(outputPath, reportContent);
    console.log(
      `Successfully generated ${reportType} dependencies license file: ${outputPath}`
    );
  } catch (error) {
    console.error(`Error generating ${reportType} report:`, error);
  }
}

async function main() {
  try {
    const directDependencies = await readDirectDependencies(projectPath);

    exec(
      `license-checker --start "${projectPath}" --json --production`,
      async (err, stdout, stderr) => {
        if (err) {
          console.error(`Error while executing license-checker: ${err}`);
          return;
        }
        if (stderr) {
          console.error(`Error: ${stderr}`);
          return;
        }

        try {
          const packages = JSON.parse(stdout);
          const currentDir = process.cwd();
          const directOutputPath = path.join(
            currentDir,
            "DIRECT_DEPENDENCIES_LICENSES_REPORT.md"
          );
          const allOutputPath = path.join(
            currentDir,
            "ALL_DEPENDENCIES_LICENSES_REPORT.md"
          );

          await generateReport(
            packages,
            directDependencies,
            directOutputPath,
            "direct"
          );
          await generateReport(
            packages,
            directDependencies,
            allOutputPath,
            "all"
          );
        } catch (error) {
          console.error("Error processing license information:", error);
        }
      }
    );
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
