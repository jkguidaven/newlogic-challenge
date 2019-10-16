/*
 * We will need to store language metadata here for later processing of consent's responses
*/
export const Languages = {
    "en-US": {
        code: "en-US",
        label: "English",
        translation: {
            yes: "Yes",
            no: "No"
        }
    },
    "fr": {
        code: "fr",
        label: "French",
        translation: {
            yes: "Oui",
            no: "Non"
        }
    }
};

/*
 * We set 'en-US' as our default Language
*/
export const DefaultLanguage = Languages["en-US"];
