export function safeurl(string) {
    string = string.normalize("NFD").replace(/\p{Diacritic}/gu, '');
    string = string.toLowerCase();
    string = string.replace(' ', '-');
    string = string.replace('--', '-');

    return string;
}