2771-Refonte-des-messages-d-erreur-systeme
----------------------------------------------------------------------------------------------
Dans mon projet il y a plusieurs endroits où l'on lève un OxaErrorCode.GENERIC_ERROR, I would like to replace all of these generic_error by other specific error type; Each time tht there is not a specific error type appropriate in oxaerrorcode.enum, we would create one.
And for every newly created oxaerror type, we would like to introduce it into en-GB.json, fr-FR.json to make the i18n message.
