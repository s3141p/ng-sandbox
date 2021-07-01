import { LibDescriptor } from '../types/lib-descriptor';
import { generateDiscoveryLibImportName } from './generate-lib-import-name';

function generateImports(libs: LibDescriptor[]) {
  return libs.map((item, index) => generateImport(item.libName, index));
}

function generateImport(libName: string, index) {
  return `import { library as Library${index} } from '${generateDiscoveryLibImportName(
    libName
  )}';\n`;
}

function generateExport(libs: LibDescriptor[]) {
  const result: string[] = [];
  result.push(`export const libraries = [\n`);

  for (let i = 0; i < libs.length; i++) {
    result.push(`  Library${i},\n`);
  }

  result.push(`]`);

  return result;
}

export function generateDiscoveryTs(libs: LibDescriptor[]) {
  const imports = generateImports(libs).join('');
  const exports = generateExport(libs).join('');

  return imports + '\n' + exports;
}
