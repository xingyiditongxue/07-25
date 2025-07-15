Remarque: Pas besoin de générer de fichiers tests associés.
Attention: Use code comments like // === Incoming Change === or diff-like markers (-, +) to indicate modifications
_______________________________________________________
2791-Gestion-centralisée-des-erreurs-invalid_key
______________________________________________________
Dans GeminiApi.executor.ts, on a beacoup de execute fonctions qui tappent sur l'endpoint "https://generativelanguage.googleapis.com/v1beta/models". Quand on offre une clé api invalide à Gemin, on reçoit une errue 400 avec cet objet d'erreur:
{
  "error": {
    "code": 400,
    "message": "API key not valid. Please pass a valid API key.",
    "status": "INVALID_ARGUMENT",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "API_KEY_INVALID",
        "domain": "googleapis.com",
        "metadata": {
          "service": "generativelanguage.googleapis.com"
        }
      },
      {
        "@type": "type.googleapis.com/google.rpc.LocalizedMessage",
        "locale": "en-US",
        "message": "API key not valid. Please pass a valid API key."
      }
    ]
  }
}

Du coup il ne faut pas traiter ça comme un 400 normal, on doit pouvoir identifier "API_KEY_INVALID" depuis le message d'erreur, et lever un OxaError "invalid_api_key"
------------------------------------------------------

QUOI : Gérer l'erreur spécifique de clé API invalide retournée par l'API Gemini.
OÙ : Dans la méthode handleApiError de la classe BaseApiExecutor (située dans src/background/models/steps/BaseApiExecutor.ts) et dans l'énumération OxaErrorCode (située dans src/common/shared/errors/OxaErrorCode.enum.ts).
COMMENT :

Ajouter une nouvelle valeur INVALID_API_KEY à l'énumération OxaErrorCode.

Dans la méthode handleApiError, intercepter les AxiosError avec un statut 400.

Analyser le corps de la réponse d'erreur (error.response.data.error).

Si le tableau details contient un objet où la propriété reason est égale à API_KEY_INVALID, alors lancer une nouvelle OxaError avec le code OxaErrorCode.INVALID_API_KEY.

S'assurer que la gestion des autres erreurs 400 n'est pas affectée.

---------------------------------------------------------------------------------------------

Plan d'Action

Ajouter le nouveau code d'erreur INVALID_API_KEY

Dans le fichier src/common/shared/errors/OxaErrorCode.enum.ts, ajouter une nouvelle entrée INVALID_API_KEY à l'énumération OxaErrorCode.

Exemple : INVALID_API_KEY = 'invalid_api_key'

Mettre à jour la gestion des erreurs dans BaseApiExecutor

Dans le fichier src/background/models/steps/BaseApiExecutor.ts, localiser la méthode handleApiError.

Ajouter une condition pour intercepter les AxiosError avec un statut 400 (BAD_REQUEST).

À l'intérieur de cette condition, vérifier la structure du corps de la réponse d'erreur (error.response.data).

Si error.response.data.error.details est un tableau et contient un objet avec la propriété reason égale à 'API_KEY_INVALID', lancer une nouvelle OxaError avec le code OxaErrorCode.INVALID_API_KEY.

S'assurer que la gestion existante pour TOO_MANY_REQUESTS et les autres erreurs est conservée.

Logique détaillée pour handleApiError :
2.1. Dans la méthode handleApiError, à l'intérieur du bloc if (axios.isAxiosError(error) && error.response), ajouter une nouvelle vérification pour le statut 400.

Generated typescript
if (error.response.status === StatusCodes.BAD_REQUEST) {
  const data: unknown = error.response.data;
  if (
    data &&
    typeof data === 'object' &&
    'error' in data &&
    data.error &&
    typeof data.error === 'object' &&
    'details' in data.error &&
    Array.isArray(data.error.details)
  ) {
    const isApiKeyInvalid = data.error.details.some(
      (detail: unknown) =>
        detail && typeof detail === 'object' && 'reason' in detail && detail.reason === 'API_KEY_INVALID'
    );
    if (isApiKeyInvalid) {
      throw new OxaError(
        OxaErrorCode.INVALID_API_KEY,
        'Invalid API Key provided for Gemini API.'
      );
    }
  }
}

2.2. Placer cette nouvelle logique avant la gestion de StatusCodes.TOO_MANY_REQUESTS pour une priorisation correcte.

Fichiers à Modifier ou vérifier

src/common/shared/errors/OxaErrorCode.enum.ts

src/background/models/steps/BaseApiExecutor.ts
