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
