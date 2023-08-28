module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'jest/globals': true,
        'node': true,
    },
    'extends': [
        'plugin:vue/recommended',
    ],
    'plugins': [
        'html',
        'jest',
        'vue',
    ],
    'rules': {
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
        ],
        'semi': [
            'error',
            'always',
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                'attribute': 1,
                'baseIndent': 1,
                'closeBracket': 0,
                'alignAttributesVertically': true,
                'ignores': [],
            },
        ],
        'vue/script-indent': [
            'error',
            4,
            {
                'switchCase': 1,
                'baseIndent': 1,
                'ignores': [],
            },
        ],
    },
};
