2771-Refonte-des-messages-d-erreur-systeme  ; oxaflow/2771-Refonte-des-messages-d-erreur-systeme_20250716_122732  ;
 oxaflow/2771-Refonte-des-messages-d-erreur-systeme_20250716_174553
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

__________________________________________________________________________________________________________________

Votre demande est assez large. Pour m'assurer de la comprendre correctement, confirmons les points suivants :

Pour chaque OxaErrorCode.GENERIC_ERROR que vous avez identifié, je dois analyser le contexte et le remplacer par un code d'erreur plus spécifique.

Si un code d'erreur approprié n'existe pas dans l'énumération OxaErrorCode, je devrai en proposer un nouveau.

Pour chaque nouveau code créé, je devrai également définir un message d'erreur correspondant dans les fichiers de traduction fr-FR.json et en-GB.json.

Par exemple, pour le cas dans ScrappingOutput.service.ts où l'erreur est new OxaError(OxaErrorCode.GENERIC_ERROR, 'Invalid LLM response'), je pourrais créer le code INVALID_LLM_RESPONSE et ajouter les traductions associées.

Est-ce que cette approche vous convient ? Souhaitez-vous que je commence par vous lister toutes les modifications que je propose (nouveaux codes d'erreur et remplacements) pour validation avant de générer la spécification finale ?

--------------------------------------------------------------------------------------------------------------------

  QUOI : Remplacer les usages du code d'erreur OxaErrorCode.GENERIC_ERROR par des codes d'erreur plus spécifiques. Créer de nouveaux codes d'erreur dans OxaErrorCode.enum.ts si nécessaire, et ajouter les traductions correspondantes dans les fichiers en-GB.json et fr-FR.json.

OÙ & COMMENT :

Fichier : src/common/shared/errors/OxaErrorCode.enum.ts

COMMENT : Ajouter les nouveaux codes d'erreur suivants à l'énumération OxaErrorCode :

INVALID_LLM_RESPONSE

ASSISTANT_NOT_PINNED

UNEXPECTED_ERROR

INVALID_RESPONSE_FROM_CONTENT_SCRIPT

PENPOT_SEND_MESSAGE_ERROR

INVALID_CHATBOT_RESPONSE

INVALID_TAB_REQUEST_BODY

Fichier : src/common/shared/i18n/fr-FR.json (et en-GB.json de manière équivalente)

COMMENT : Ajouter les nouvelles clés de traduction pour les erreurs créées. Par exemple pour le français :

"invalid_llm_response": "Réponse invalide du LLM"

"assistant_not_pinned": "L'assistant {assistantUuid} n'est pas épinglé"

"unexpected_error": "Une erreur inattendue est survenue"

"invalid_response_from_content_script": "Réponse invalide du content script"

"penpot_send_message_error": "Erreur lors de l'envoi du message à Penpot"

"invalid_chatbot_response": "Réponse invalide du chatbot"

"invalid_tab_request_body": "Corps de la requête de l'onglet invalide"

Fichier : src/content-script/content/services/ScrappingOutput.service.ts

OÙ : Dans la méthode scrapeAnswer, au niveau du throw new OxaError(...).

COMMENT : Remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.INVALID_LLM_RESPONSE.

Fichier : src/sidebar/front/services/Pin.service.ts

OÙ : Dans la méthode getPinAssistant, au niveau du throw new OxaError(...).

COMMENT : Remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.ASSISTANT_NOT_PINNED.

Fichier : src/common/shared/decorator/HandleControllerError.decorator.ts

OÙ : Dans le bloc catch, pour le cas error instanceof Error.

COMMENT : Remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.UNEXPECTED_ERROR.

Fichier : src/common/shared/models/MessageResponse.model.ts

OÙ : Dans la fonction buildErrorMessageResponseFromError, pour le cas générique.

COMMENT : Remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.UNEXPECTED_ERROR.

Fichier : src/content-script/content/services/Scrapping.service.ts

OÙ : Dans la méthode scrapeChatBot, au niveau du response.send(buildErrorMessageResponse(...)).

COMMENT : Remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.INVALID_CHATBOT_RESPONSE.

Fichier : src/sidebar/controllers/ChatTab.controller.ts

OÙ : Dans la méthode handleMessageToUser, au niveau du response.send(buildErrorMessageResponse(...)).

COMMENT : Remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.INVALID_TAB_REQUEST_BODY.

  _______________________________________________________________________________________________________

Veuillez valider le plan créé par l'IA par "OK" si il vous parait clair ou rajoutez des éléments si besoin : 
Plan d'Action

Pré-requis : Vérification des fichiers

Avant de commencer, vérifier la présence de tous les fichiers listés dans la section "Fichiers à Modifier ou vérifier". Si un fichier est introuvable, ne pas continuer et créer un ticket pour signaler l'anomalie.

Étape 1 : Ajout des nouveaux codes d'erreur

Dans le fichier src/common/shared/errors/OxaErrorCode.enum.ts, ajouter les nouvelles valeurs à l'énumération OxaErrorCode :

INVALID_LLM_RESPONSE

ASSISTANT_NOT_PINNED

UNEXPECTED_ERROR

INVALID_RESPONSE_FROM_CONTENT_SCRIPT

PENPOT_SEND_MESSAGE_ERROR

INVALID_CHATBOT_RESPONSE

INVALID_TAB_REQUEST_BODY

Étape 2 : Ajout des traductions i18n

2.1. Dans src/common/shared/i18n/fr-FR.json, ajouter les clés de traduction pour les nouvelles erreurs :

Generated json
"invalid_llm_response": "Réponse invalide du LLM",
"assistant_not_pinned": "L'assistant {assistantUuid} n'est pas épinglé",
"unexpected_error": "Une erreur inattendue est survenue",
"invalid_response_from_content_script": "Réponse invalide du content script",
"penpot_send_message_error": "Erreur lors de l'envoi du message à Penpot",
"invalid_chatbot_response": "Réponse invalide du chatbot",
"invalid_tab_request_body": "Corps de la requête de l'onglet invalide"

2.2. Dans src/common/shared/i18n/en-GB.json, ajouter les clés de traduction anglaises en s'assurant que la structure et les clés sont identiques au fichier fr-FR.json :

Generated json
"invalid_llm_response": "Invalid LLM response",
"assistant_not_pinned": "Assistant {assistantUuid} is not pinned",
"unexpected_error": "An unexpected error occurred",
"invalid_response_from_content_script": "Invalid response from content script",
"penpot_send_message_error": "Error sending message to Penpot",
"invalid_chatbot_response": "Invalid chatbot response",
"invalid_tab_request_body": "Invalid tab request body"
Use code with caution.
Json

Étape 3 : Remplacement des codes d'erreur spécifiques

4.1. Dans src/content-script/content/services/ScrappingOutput.service.ts, méthode scrapeAnswer, remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.INVALID_LLM_RESPONSE.

4.2. Dans src/common/internal/services/Pin.service.ts, méthode getPinAssistant, remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.ASSISTANT_NOT_PINNED.

4.3. Dans src/common/shared/decorator/HandleControllerError.decorator.ts, dans le bloc catch, remplacer les deux occurrences de OxaErrorCode.GENERIC_ERROR par OxaErrorCode.UNEXPECTED_ERROR.

4.4. Dans src/common/shared/models/MessageResponse.model.ts, fonction buildErrorMessageResponseFromError, remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.UNEXPECTED_ERROR dans le cas else final.

4.5. Dans src/content-script/content/services/Scrapping.service.ts, méthode scrapeChatBot, remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.INVALID_CHATBOT_RESPONSE.

4.6. Dans src/sidebar/controllers/ChatTab.controller.ts, méthode handleMessageToUser, remplacer OxaErrorCode.GENERIC_ERROR par OxaErrorCode.INVALID_TAB_REQUEST_BODY.

Étape 4 : Analyse d'Impact Globale

Effectuer une recherche globale (sensible à la casse) de OxaErrorCode.GENERIC_ERROR dans l'ensemble du projet.

Pour chaque occurrence trouvée non listée ci-dessus, analyser le contexte. Si un code d'erreur plus spécifique peut être utilisé, le remplacer. Sinon, valider que OxaErrorCode.UNEXPECTED_ERROR est le code le plus approprié.

Étape 5 : Mise à Jour des Tests Unitaires

Identifier tous les fichiers de test (.spec.ts) associés aux fichiers modifiés.

Mettre à jour les assertions pour qu'elles attendent les nouveaux codes d'erreur (OxaErrorCode.INVALID_LLM_RESPONSE, OxaErrorCode.ASSISTANT_NOT_PINNED, etc.) au lieu de OxaErrorCode.GENERIC_ERROR.

Vérifier les mocks et les stubs qui pourraient utiliser OxaErrorCode et les mettre à jour si nécessaire.

Étape 6 : Validation Finale et respect des guidelines

7.1. Vérifier que les modifications respectent les guidelines du projet (typage explicite, imports absolus et ordonnés, etc.).

7.2. Lancer l'intégralité de la suite de tests en local et s'assurer qu'ils passent tous.

7.3. Après avoir poussé les modifications, vérifier que le pipeline d'intégration continue (CI/CD) s'exécute avec succès.

Fichiers à Modifier ou vérifier

src/common/shared/errors/OxaErrorCode.enum.ts

src/common/shared/i18n/fr-FR.json

src/common/shared/i18n/en-GB.json

src/content-script/content/services/ScrappingOutput.service.ts

src/common/internal/services/Pin.service.ts

src/common/shared/decorator/HandleControllerError.decorator.ts

src/common/shared/models/MessageResponse.model.ts

src/content-script/content/services/Scrapping.service.ts

src/sidebar/controllers/ChatTab.controller.ts

src/content-script/content/services/ScrappingOutput.service.spec.ts (à vérifier/créer)

src/common/internal/services/Pin.service.spec.ts (à vérifier/créer)

src/common/shared/decorator/HandleControllerError.decorator.spec.ts (à vérifier/créer)

src/common/shared/models/MessageResponse.model.spec.ts (à vérifier/créer)

src/content-script/content/services/Scrapping.service.spec.ts (à vérifier/créer)

src/sidebar/controllers/ChatTab.controller.spec.ts (à vérifier/créer)
