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

___________________________________________________________________________________________________________________________________________________________________________________________________________________________

Veuillez valider votre demande reformulée par l'IA avec "OK" si elle vous parait claire ou rajoutez des éléments si besoin : 
VRAIFIN
QUOI : Remplacer les usages du code d'erreur générique OxaErrorCode.GENERIC_ERROR par des codes d'erreur plus spécifiques, créer ces nouveaux codes et leurs traductions correspondantes.

OÙ & COMMENT :

Fichier : src/background/bridge/Bridge.service.ts

Localisation : Dans la méthode handleNativeMessage, au sein du bloc catch.

Modification : Remplacer new OxaError(OxaErrorCode.GENERIC_ERROR, 'Unknown error') par new OxaError(OxaErrorCode.BRIDGE_UNKNOWN_ERROR, 'Unknown error').

Fichier : src/background/controllers/Autoxa.controller.ts

Localisation 1 : Dans la méthode handleAutoxaRunInterlocutor, pour le cas "Interlocutor not found".

Modification 1 : Remplacer buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, '[@vue/chat]: Interlocutor not found') par buildErrorMessageResponse(OxaErrorCode.INTERLOCUTOR_NOT_FOUND, '[@vue/chat]: Interlocutor not found').

Localisation 2 : Dans les méthodes askQuestionTextToUserFromAutoxa et sendMessageToUserFromAutoxa, pour l'erreur "Oops".

Modification 2 : Remplacer buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Oops') par buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'Oops').

Localisation 3 : Dans la méthode openSidebar, pour les erreurs "No normal window open" et "Sidebar was not opened".

Modification 3 : Remplacer buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'No normal window open') par buildErrorMessageResponse(OxaErrorCode.NO_NORMAL_WINDOW_FOUND, 'No normal window open') et remplacer buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Sidebar was not opened') par buildErrorMessageResponse(OxaErrorCode.SIDEBAR_NOT_OPENED, 'Sidebar was not opened').

Fichier : src/common/internal/services/Runner.service.ts

Localisation : Dans la méthode run, au sein du bloc catch.

Modification : Remplacer new OxaError(OxaErrorCode.GENERIC_ERROR, 'An error occurred while running the interlocutor.') par new OxaError(OxaErrorCode.RUNNER_EXECUTION_FAILED, 'An error occurred while running the interlocutor.').

Fichier : src/content-script/content/services/ScrappingOutput.service.ts

Localisation 1 : Dans la méthode sendMessageToChatBot.

Modification 1 : Remplacer throw new OxaError(OxaErrorCode.GENERIC_ERROR, 'Invalid LLM response'); par throw new OxaError(OxaErrorCode.INVALID_LLM_RESPONSE_FORMAT, 'Invalid LLM response');.

Localisation 2 : Dans la méthode sendMessageToYoutube.

Modification 2 : Remplacer throw new OxaError(OxaErrorCode.GENERIC_ERROR, 'Invalid Youtube response'); par throw new OxaError(OxaErrorCode.INVALID_YOUTUBE_RESPONSE_FORMAT, 'Invalid Youtube response');.

Fichier : src/common/shared/errors/OxaErrorCode.enum.ts

Localisation : Dans l'énumération OxaErrorCode.

Modification : Ajouter les nouvelles clés : BRIDGE_UNKNOWN_ERROR, INTERLOCUTOR_NOT_FOUND, AUTOXA_MESSAGE_TO_USER_FAILED, NO_NORMAL_WINDOW_FOUND, SIDEBAR_NOT_OPENED, RUNNER_EXECUTION_FAILED, INVALID_LLM_RESPONSE_FORMAT, INVALID_YOUTUBE_RESPONSE_FORMAT.

Fichiers : src/common/shared/i18n/en-GB.json et src/common/shared/i18n/fr-FR.json

Localisation : Dans l'objet chat.errors.

Modification : Ajouter les entrées de traduction pour chaque nouveau code d'erreur créé à l'étape 5.

____________________________________________________________________________________________________________

Veuillez valider le plan créé par l'IA par "OK" si il vous parait clair ou rajoutez des éléments si besoin : 
Plan d'Action

Mise à jour de l'énumération des codes d'erreur

Dans src/common/shared/errors/OxaErrorCode.enum.ts, ajoutez les nouvelles clés suivantes à l'énumération OxaErrorCode en respectant l'ordre alphabétique :

AUTOXA_MESSAGE_TO_USER_FAILED

BRIDGE_UNKNOWN_ERROR

INTERLOCUTOR_NOT_FOUND

INVALID_LLM_RESPONSE_FORMAT

INVALID_YOUTUBE_RESPONSE_FORMAT

NO_NORMAL_WINDOW_FOUND

RUNNER_EXECUTION_FAILED

SIDEBAR_NOT_OPENED

Recherche exhaustive des usages restants

Effectuez une recherche globale dans l'ensemble du projet pour l'utilisation de OxaErrorCode.GENERIC_ERROR.

Analysez chaque occurrence trouvée pour déterminer si elle doit être remplacée par un des nouveaux codes spécifiques ou si un autre code d'erreur plus pertinent existe déjà. Si une occurrence ne correspond à aucun cas spécifique, laissez-la en l'état mais documentez la décision.

Refactoring des services et contrôleurs

3.1. src/background/bridge/Bridge.service.ts

Dans la méthode handleNativeMessage, au sein du bloc catch, remplacez new OxaError(OxaErrorCode.GENERIC_ERROR, 'Unknown error') par new OxaError(OxaErrorCode.BRIDGE_UNKNOWN_ERROR, 'Unknown error').

3.2. src/background/controllers/Autoxa.controller.ts

Dans la méthode handleAutoxaRunInterlocutor, remplacez buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, '[@vue/chat]: Interlocutor not found') par buildErrorMessageResponse(OxaErrorCode.INTERLOCUTOR_NOT_FOUND, '[@vue/chat]: Interlocutor not found').

Dans la méthode askQuestionTextToUserFromAutoxa, remplacez buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Oops') par buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'Oops').

Dans la méthode sendMessageToUserFromAutoxa, remplacez les deux occurrences de buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Oops') par buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'Oops').

Dans la méthode openSidebar, remplacez buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'No normal window open') par buildErrorMessageResponse(OxaErrorCode.NO_NORMAL_WINDOW_FOUND, 'No normal window open').

Dans la même méthode openSidebar, remplacez buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Sidebar was not opened') par buildErrorMessageResponse(OxaErrorCode.SIDEBAR_NOT_OPENED, 'Sidebar was not opened').

3.3. src/background/services/Runner.service.ts

Dans la méthode run, au sein du bloc catch, remplacez new OxaError(OxaErrorCode.GENERIC_ERROR, 'An error occurred while running the interlocutor.') par new OxaError(OxaErrorCode.RUNNER_EXECUTION_FAILED, 'An error occurred while running the interlocutor.').

3.4. src/content-script/content/services/ScrappingOutput.service.ts

Dans la méthode sendMessageToChatBot, remplacez throw new OxaError(OxaErrorCode.GENERIC_ERROR, 'Invalid LLM response'); par throw new OxaError(OxaErrorCode.INVALID_LLM_RESPONSE_FORMAT, 'Invalid LLM response');.

Dans la méthode sendMessageToYoutube, remplacez throw new OxaError(OxaErrorCode.GENERIC_ERROR, 'Invalid Youtube response'); par throw new OxaError(OxaErrorCode.INVALID_YOUTUBE_RESPONSE_FORMAT, 'Invalid Youtube response');.

Mise à jour des fichiers de traduction (i18n)

4.1. Dans src/common/shared/i18n/fr-FR.json, ajoutez les traductions pour les nouveaux codes d'erreur dans l'objet chat.errors.

4.2. Dans src/common/shared/i18n/en-GB.json, ajoutez les traductions correspondantes pour les nouveaux codes d'erreur dans l'objet chat.errors.

Mise à jour des tests unitaires et d'intégration

Pour chaque fichier fonctionnel modifié, localisez le fichier de test correspondant (.spec.ts).

Si un fichier de test existe, modifiez les assertions qui vérifiaient OxaErrorCode.GENERIC_ERROR pour qu'elles vérifient les nouveaux codes d'erreur spécifiques.

Si aucun fichier de test n'existe pour un service ou un contrôleur modifié, créez un nouveau fichier de test pour couvrir au minimum les nouvelles logiques d'erreur.

Nettoyage et vérification finale

6.1. Suppression des commentaires : Parcourez les fichiers modifiés et supprimez tout commentaire faisant référence à l'ancien code GENERIC_ERROR.

6.2. Vérification du typage : Assurez-vous que l'utilisation des nouveaux codes d'erreur respecte le typage explicite dans toute l'application, conformément aux bonnes pratiques du projet.

6.3. Validation Manuelle : Lancez l'application et déclenchez manuellement les scénarios d'erreur modifiés pour confirmer que les nouveaux messages d'erreur (traduits) s'affichent correctement dans l'interface utilisateur.

Fichiers à Modifier ou vérifier

src/common/shared/errors/OxaErrorCode.enum.ts

src/background/bridge/Bridge.service.ts

src/background/controllers/Autoxa.controller.ts

src/background/services/Runner.service.ts

src/content-script/content/services/ScrappingOutput.service.ts

src/common/shared/i18n/en-GB.json

src/common/shared/i18n/fr-FR.json

src/background/bridge/Bridge.service.spec.ts (à créer si non existant)

src/background/controllers/Autoxa.controller.spec.ts (à créer si non existant)

src/background/services/Runner.service.spec.ts (à créer si non existant)

src/content-script/content/services/ScrappingOutput.service.spec.ts (à créer si non existant)
