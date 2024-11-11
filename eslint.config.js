const typescriptParser = require('@typescript-eslint/parser');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const react = require('eslint-plugin-react');
const globals = require('globals');
module.exports = [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            react,
            '@typescript-eslint': typescriptPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'react/jsx-props-no-spreading': 'off',
            'react/jsx-filename-extension': [
                'warn',
                { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
            ],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'double'],
            semi: ['error', 'always'],
            'comma-dangle': 'off',
            'max-len': ['error', { code: 120 }],
        },
    },
    {
        files: ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'],
        rules: {
        },
    },
];
