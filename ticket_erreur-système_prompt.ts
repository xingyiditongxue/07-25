2771-Refonte-des-messages-d-erreur-systeme
----------------------------------------------------------------------------------------------
Dans mon projet il y a plusieurs endroits où l'on lève un OxaErrorCode.GENERIC_ERROR, I would like to replace all of these generic_error by other specific error type; Each time tht there is not a specific error type appropriate in oxaerrorcode.enum, we would create one.
And for every newly created oxaerror type, we would like to introduce it into en-GB.json, fr-FR.json to make the i18n message.
----------------------------------------------------------------------------------------------
Votre demande de refonte des erreurs OxaErrorCode.GENERIC_ERROR est très pertinente pour améliorer la clarté et la maintenabilité du code. Pour m'assurer de proposer les modifications les plus justes, j'ai besoin de quelques clarifications.

J'ai identifié plusieurs endroits où une erreur plus spécifique serait bénéfique. Pourriez-vous valider les propositions suivantes ?

Dans le fichier src/background/bridge/Bridge.service.ts, l'erreur générique est utilisée comme un joker pour des erreurs inconnues. Proposer de la remplacer par BRIDGE_UNKNOWN_ERROR vous semblerait-il plus approprié ?

Dans le contrôleur src/background/controllers/Autoxa.controller.ts:

Pour le cas "Interlocutor not found", l'utilisation de OxaErrorCode.NOT_FOUND est-elle suffisante ou préférez-vous une nouvelle erreur plus spécifique ?

Pour les échecs d'ouverture de la sidebar ou de fenêtre, est-ce que SIDEBAR_NOT_OPENED et NO_NORMAL_WINDOW_FOUND sont des noms qui vous conviennent ?

Pour les erreurs liées à l'envoi de messages à l'utilisateur, AUTOXA_MESSAGE_TO_USER_FAILED vous semble-t-il adéquat ?

Dans le service src/common/internal/services/Runner.service.ts, qui orchestre l'exécution des assistants, RUNNER_EXECUTION_FAILED serait-il un bon remplacement pour l'erreur générique actuelle ?

Enfin, dans src/content-script/content/services/ScrappingOutput.service.ts, où des erreurs de format de réponse sont actuellement génériques, seriez-vous d'accord avec la création de codes comme INVALID_LLM_RESPONSE_FORMAT ou INVALID_YOUTUBE_RESPONSE_FORMAT ?

Vos réponses me permettront de vous fournir une liste exhaustive et précise des modifications à apporter, y compris la création des nouveaux types d'erreur et leurs traductions pour l'internationalisation.
