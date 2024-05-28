# License Checker Script

This script generates license reports for the direct and all dependencies of a Node.js project. It can be run using `npm` or `yarn`, and pre-built executables are also available for Windows, macOS, and Linux.

## Features

- Generates a markdown report for direct dependencies.
- Generates a markdown report for all dependencies.
- Supports running via `npm`, `yarn`, or as a standalone executable.

## Prerequisites

- Node.js (if running with `npm` or `yarn`)
- `npm` or `yarn` installed globally

## Installation

You can install this package globally using npm:

```sh
npm install -g license-report-generator-md
# or
yarn global add license-report-generator-md
```

## Usage

### Running with `node`

1. **Clone the repository:**

   ```sh
   git clone https://github.com/LichiBruno/license-report-generator
   cd license-checker-script

   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the script:**

   ```sh
   node index.js <path-to-project>
   ```

   Replace `<path-to-project>` with the path to your project directory.

### Running as a Global Package

If you installed the package globally using npm or yarn, you can run it directly from the command line:

```sh
license-report-generator-md <path-to-project>
```

Replace `<path-to-project>` with the path to your project directory.

### Running with pre-built executables

Pre-built executables are available for Windows, macOS, and Linux. You can download the appropriate executable for your system from the Releases page.

1. **Download the executable:**

   - Windows: https://github.com/LichiBruno/license-report-generator/releases/download/1.0.0/license-report-generator-win.exe
   - macOS: https://github.com/LichiBruno/license-report-generator/releases/download/1.0.0/license-report-generator-macos
   - Linux: https://github.com/LichiBruno/license-report-generator/releases/download/1.0.0/license-report-generator-linux

2. **Make the executable file runnable (Linux and macOS):**

   ```sh
   chmod +x license-checker-script-darwin-x64
   # or
   chmod +x license-checker-script-linux-x64
   ```

3. **Run the executable:**

   ```sh
   ./license-checker-script-darwin-x64 <path-to-project>
   # or
   ./license-checker-script-linux-x64 <path-to-project>
   # or for Windows
   license-checker-script-win32.exe <path-to-project>
   ```

## Output

The script will generate two markdown files in the directory where the script is executed:

- `DIRECT_DEPENDENCIES_LICENSES_REPORT.md`: This file contains a list of all direct dependencies of the project, along with their licenses and copyright information.
- `ALL_DEPENDENCIES_LICENSES_REPORT.md`: This file contains a list of all dependencies of the project, along with their licenses and copyright information.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/LichiBruno/license-report-generator/blob/main/LICENSE) file for details.
