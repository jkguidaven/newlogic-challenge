/*
 * We will need to store language metadata here for later processing of consent's responses
*/
export const Languages = {
    "en-US": {
        code: "en-US",
        label: "English",
        translation: {
            yes: "Yes",
            no: "No",
            message:
                `You understand that by using this site or site services, you agree to be bound
                by this agreement. If you do not accept this agreement in its entirety, you must
                not access or use the site or the site services.`,
            instruction:
                `Do you agree to this agreement? Please response by saying "Yes" or "No".`
        }
    },
    "fr-FR": {
        code: "fr-FR",
        label: "French",
        translation: {
            yes: "Oui",
            no: "Non",
            message:
                `Vous comprenez qu'en utilisant ce site ou les services du site, vous acceptez d'être lié par cet accord.
                Si vous n'acceptez pas cet accord dans son intégralité, vous ne devez pas accéder au site ni aux services du site.`,
            instruction:
                `Acceptez-vous cet accord? Veuillez répondre en disant "Oui" ou "Non".`
        }
    }
};

/*
 * We set 'en-US' as our default Language
*/
export const DefaultLanguage = Languages["en-US"];
