const env = open('../.env')
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('#'))
    .reduce((acc, line) => {
        const index = line.indexOf('=');

        if (index === -1) return acc;

        const key = line.slice(0, index).trim();
        const value = line.slice(index + 1).trim();

        acc[key] = value.replace(/^["']|["']$/g, '');

        return acc;
    }, {});

export default env;