import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}']
    },

    globalIgnores([
        '**/dist/**',
        '**/dist-ssr/**',
        '**/coverage/**',
        'src/plugins/iconify/*.js',
        '*.d.ts',
        'vendor'
    ]),

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*']
    },

    {
        rules: {
            semi: ['error', 'always'],
            'vue/html-indent': [
                'error',
                4,
                {
                    attribute: 1,
                    baseIndent: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                    ignores: []
                }
            ],
            'no-multi-spaces': 'error',
            'no-redeclare': 'error',
            'no-unused-expressions': 'error',
            indent: ['error', 4],
            quotes: ['error', 'single', { avoidEscape: true }],
            'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'keyword-spacing': ['error', { before: true, after: true }],
            'space-before-blocks': 'error',
            'space-before-function-paren': ['error', 'always'],
            'block-spacing': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
            'comma-dangle': 'error',
            'vue/no-unused-vars': 'error',
            'vue/multi-word-component-names': 'off'
        }
    }
);
