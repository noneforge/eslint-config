# @noneforge/eslint-config

Modern TypeScript/JavaScript ESLint configuration with strict type checking and comprehensive stylistic rules. Built for ESLint 9+ flat config with full TypeScript 5.5+ support.

## Features

- ✨ **ESLint 9 Flat Config** - Modern configuration format with better performance
- 🎯 **Strict Type Checking** - Comprehensive type-aware rules to catch errors at build time
- 🎨 **Built-in Formatting** - Replaces Prettier with @stylistic/eslint-plugin for unified tooling
- 🚀 **TypeScript 5.5+ Support** - Leverages latest TypeScript features and optimizations
- 📦 **Zero Config Philosophy** - Sensible defaults that work out of the box
- ⚡ **Performance Optimized** - Uses `projectService` for faster type checking
- 🔧 **Smart File Detection** - Different rules for tests, configs, and type definitions

## Installation

```bash
npm install --save-dev @noneforge/eslint-config eslint typescript
```

or with Yarn:

```bash
yarn add --dev @noneforge/eslint-config eslint typescript
```

## Requirements

- Node.js >=18.18.0
- ESLint >=9.22.0
- TypeScript >=5.5.0

## Usage

Create an `eslint.config.js` file in your project root:

```javascript
import config from '@noneforge/eslint-config';

export default [
  ...config,
  // Your custom rules here
];
```

### With Custom Rules

```javascript
import config from '@noneforge/eslint-config';

export default [
  ...config,
  {
    rules: {
      // Override or add custom rules
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  }
];
```

### For Monorepos

```javascript
import config from '@noneforge/eslint-config';

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: ['./packages/*/tsconfig.json'],
      }
    }
  }
];
```

## Rule Categories

### 🛡️ Core JavaScript Error Prevention
**Essential rules to catch common JavaScript errors:**
- **Syntax and Logic Errors**: `no-dupe-keys`, `no-unreachable`, `no-unsafe-negation`
- **Variable Issues**: `no-undef`, `no-unused-vars`, `no-redeclare`
- **Async/Control Flow**: `no-async-promise-executor`, `no-await-in-loop`, `for-direction`
- **Regex Safety**: `no-control-regex`, `no-invalid-regexp`, `no-regex-spaces`

### 🎯 TypeScript Type Safety
**Strict type checking for maximum safety:**
- **No Any Policy**: `@typescript-eslint/no-explicit-any`, all `no-unsafe-*` rules
- **Type Assertions**: Enforces consistent assertions, prevents unnecessary type operations
- **Nullish Handling**: `strict-boolean-expressions` with smart nullable object support
- **Promise/Async**: `no-floating-promises`, `no-misused-promises`, `promise-function-async`

```typescript
// ❌ Strict boolean expressions prevent errors
if (count) { }  // Error: number coercion
if (text) { }   // Error: string coercion

// ✅ Be explicit
if (count > 0) { }
if (text !== '') { }
if (user) { }  // OK: nullable object check
```

### 📦 Import/Export Management
**Automatic import organization:**
- **Sorting**: `simple-import-sort` for consistent ordering
- **Type Imports**: Enforces inline type imports (`import { type User }`)
- **No Side Effects**: Prevents `import type` with side effects
- **Module System**: No `require()` in TypeScript, ESM preferred

```typescript
// ✅ Auto-sorted and organized
import { type Config } from './config';
import { type User, type Product } from '@/types';
import { useState } from 'react';
import path from 'node:path';
```

### 🎨 Code Formatting (Prettier Replacement)
**Built-in formatting via @stylistic/eslint-plugin:**
- **Indentation**: 2 spaces, with detailed alignment rules
- **Quotes**: Single quotes with escape avoidance
- **Semicolons**: Always required
- **Line Length**: 120 chars (ignores URLs, strings, templates)
- **Spacing**: Comprehensive rules for consistency

### 🏗️ Code Quality & Best Practices
**Modern JavaScript/TypeScript patterns:**
- **ES6+ Features**: `prefer-const`, `no-var`, `prefer-spread`, `prefer-object-has-own`
- **Logical Operators**: `logical-assignment-operators` (use `??=`, `&&=`, `||=`)
- **String Methods**: `prefer-string-starts-ends-with` over regex/indexOf
- **Array Methods**: `prefer-find` over filter[0], `prefer-includes` over indexOf
- **Optional Chaining**: `prefer-optional-chain` over && chains

```typescript
// ❌ Old patterns
const first = array.filter(x => x.id === id)[0];
if (text.indexOf('prefix') === 0) { }
const value = obj && obj.nested && obj.nested.value;

// ✅ Modern patterns
const first = array.find(x => x.id === id);
if (text.startsWith('prefix')) { }
const value = obj?.nested?.value;
```

### 📝 Naming Conventions
**Consistent naming across the codebase:**
- **Variables**: `camelCase`, `PascalCase`, or `UPPER_CASE`
- **Functions**: `camelCase` or `PascalCase`
- **Types/Interfaces**: `PascalCase`
- **Enums**: `PascalCase`
- **Type Parameters**: `PascalCase` (generics)

### 🔄 Async/Promise Rules
**Comprehensive async code handling:**
- **Floating Promises**: Must be awaited or explicitly voided
- **Async Functions**: Must return promises (`promise-function-async`)
- **Await Usage**: `require-await` ensures async functions use await
- **Return Await**: Required in try-catch blocks for proper stack traces

```typescript
// ❌ Common async mistakes
async function bad() {
  fetchData();  // floating promise
  return await promise;  // unnecessary outside try-catch
}

// ✅ Proper async handling
async function good() {
  await fetchData();  // or void fetchData();
  try {
    return await promise;  // correct in try-catch
  } catch (e) {
    // handle error
  }
}
```

### 📚 JSDoc Documentation
**Smart documentation requirements:**
- **Public API**: Warns for undocumented public classes/methods
- **Interfaces & Types**: Requires JSDoc for type declarations
- **Alignment**: Enforces consistent JSDoc formatting
- **TypeScript Integration**: Disables type annotations in JSDoc

### 🧪 Test File Rules
**Relaxed rules for test files (`*.spec.ts`, `*.test.ts`):**
- `any` type allowed for test flexibility
- No JSDoc requirements
- Console statements permitted
- Higher callback nesting limit (10 levels)
- Magic numbers allowed

### 📁 Special File Handling
**Smart detection for different file types:**
- **Config Files** (`*.config.js/ts`): Allows `require()`, relaxed return types
- **Declaration Files** (`*.d.ts`): Minimal rules for ambient types
- **JavaScript Files**: Basic linting without type checking

## Additional Examples

### TypeScript Strictness
```typescript
// ❌ Unnecessary type operations
const value = data as unknown as string;  // double assertion
type Same<T> = T extends T ? T : never;   // unnecessary constraint
if (typeof x === 'string') {
  (x as string).length;  // unnecessary assertion after guard
}

// ✅ Clean type handling
const value = data as string;  // single assertion when needed
type Nullable<T> = T | null;   // simple and clear
if (typeof x === 'string') {
  x.length;  // TypeScript knows the type
}
```

### Template Expressions
```typescript
// ❌ Restricted template expressions
const msg = `Count: ${someObject}`;  // Error: object in template
const id = `ID: ${null}`;  // Error: null without handling

// ✅ Allowed template usage
const msg = `Count: ${count}`;  // numbers allowed
const debug = `Data: ${JSON.stringify(obj)}`;  // explicit conversion
const id = `ID: ${userId ?? 'unknown'}`;  // null handled
```

### Function Return Types
```typescript
// ❌ Missing return types
function calculate(a: number, b: number) {  // Error: needs return type
  return a + b;
}

// ✅ Explicit return types (with smart exceptions)
function calculate(a: number, b: number): number {
  return a + b;
}

// ✅ Exceptions that don't need explicit returns
const add = (a: number, b: number) => a + b;  // arrow function expressions
const handler = () => console.log('done');  // void returns
```

## VSCode Integration

Add to `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:debug": "eslint . --debug",
    "type-check": "tsc --noEmit"
  }
}
```

## Migration from ESLint 8

1. Remove `.eslintrc.*` files
2. Create `eslint.config.js` with flat config
3. Update VSCode settings for flat config
4. Remove Prettier (this config handles formatting)

## Performance Tips

- Use `projectService: true` for better TypeScript performance
- Enable ESLint cache: `eslint . --cache`
- Exclude build directories in your tsconfig.json
- Consider using `--max-warnings 0` in CI/CD

## Philosophy

This configuration prioritizes:

1. **Type Safety** - Catch errors at build time, not runtime
2. **Consistency** - Unified formatting without Prettier
3. **Performance** - Optimized for large TypeScript projects
4. **Developer Experience** - Clear errors with practical rules

## License

MIT

## Contributing

Issues and PRs welcome at [GitHub](https://github.com/noneforge/eslint-config)