2771-Refonte-des-messages-d-erreur-systeme
-------------------------------------------------------------------------
Dans src/background/controllers/Autoxa.controller.ts, j'ai 2 fonctions: 'sendMessageToUserFromAutoxa' et 'askQuestionTextToUserFromAutoxa'. 

Je voudrais d'abord être expliqué en détail comment je peux produire la "AUTOXA_MESSAGE_TO_USER_FAILED" erreur avec ces 2 fonctions. Veuillez rajouter cette explication en tant que commentaires sur le fichier "src/background/controllers/Autoxa.controller.ts"
 
En suite je voudrais avoir les tests unitaires qui vérifient "AUTOXA_MESSAGE_TO_USER_FAILED" erreur s'affichent correctement avec ces 2 fonctions: `sendMessageToUserFromAutoxa` et `askQuestionTextToUserFromAutoxa`
-----------------------------------------------------------------------------

QUOI :

Ajouter des commentaires explicatifs dans le fichier src/background/controllers/Autoxa.controller.ts pour les fonctions sendMessageToUserFromAutoxa et askQuestionTextToUserFromAutoxa. Ces commentaires décriront les scénarios précis qui déclenchent l'erreur AUTOXA_MESSAGE_TO_USER_FAILED.

Créer des tests unitaires pour ces deux mêmes fonctions afin de vérifier que l'erreur AUTOXA_MESSAGE_TO_USER_FAILED est bien retournée lorsque le chromeMessageSenderService.sendRuntimeMessage renvoie une MessageResponse avec un statut SUCCESS mais un corps de réponse malformé.

OÙ :

Pour les commentaires : Directement au-dessus des blocs else correspondant dans les fonctions sendMessageToUserFromAutoxa et askQuestionTextToUserFromAutoxa du fichier src/background/controllers/Autoxa.controller.ts.

Pour les tests unitaires : Le code sera fourni ci-dessous, destiné à être placé dans un fichier de test dédié, par exemple src/background/controllers/Autoxa.controller.spec.ts.

COMMENT :

Commentaires : Des blocs de commentaires seront ajoutés pour expliquer que l'erreur est levée lorsque la réponse du sendRuntimeMessage n'est ni une erreur explicite (result === ResultResponse.ERROR), ni une réponse de succès avec la structure de corps attendue.

Tests unitaires : Utiliser un framework de test (type Jest) avec des mocks pour les services dépendants. Les tests simuleront des appels où chromeMessageSenderService.sendRuntimeMessage retourne des objets MessageResponse qui déclenchent les conditions d'erreur ciblées. Les tests vérifieront ensuite que la réponse finale contient bien le code d'erreur OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED.

Voici les modifications à appliquer :

1. Ajout des commentaires explicatifs dans src/background/controllers/Autoxa.controller.ts
Generated typescript
// ===== src/background/controllers/Autoxa.controller.ts =====
// ... (début du fichier inchangé)

// ...
      const requestQuestionToUser: () => Promise<void> = async () => {
        const chatTabResponse: MessageResponse = await this.chromeMessageSenderService.sendRuntimeMessage(chatTabRequest);
        if (chatTabResponse.result === ResultResponse.SUCCESS && isUserResponseAndConversationUuidDto(chatTabResponse)) {
          response.sendAsSuccessMessageResponse({ text: chatTabResponse.body.response.text, images: chatTabResponse.body.response.attachments, conversationUuid: chatTabResponse.body.conversationUuid });
        } else if (chatTabResponse.result === ResultResponse.ERROR) {
          response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
        } else {
          // EXPLICATION: L'erreur AUTOXA_MESSAGE_TO_USER_FAILED est déclenchée ici dans les cas suivants :
          // 1. Le `chatTabResponse.result` n'est ni `SUCCESS` ni `ERROR`.
          // 2. Le `chatTabResponse.result` est `SUCCESS`, mais le corps de la réponse (`chatTabResponse`)
          //    ne passe pas la validation de la fonction `isUserResponseAndConversationUuidDto`.
          //    Cela se produit si le corps est nul, n'est pas un objet, ou n'a pas la structure attendue
          //    (ex: `body.response.text` ou `body.conversationUuid` manquant).
          response.send(buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'The response status is unknown, malformed, or we get a "success" result but the body does not match the required structure.'));
        }
      };
// ... (partie de la fonction inchangée)

// ...
      try {
        const chatTabResponse: MessageResponse = await this.chromeMessageSenderService.sendRuntimeMessage(chatTabRequest);
        if (chatTabResponse.result === ResultResponse.SUCCESS && typeof chatTabResponse.body === 'object' && chatTabResponse.body && 'conversationUuid' in chatTabResponse.body) {
          response.sendAsSuccessMessageResponse({ conversationUuid: chatTabResponse.body.conversationUuid });
        } else if (chatTabResponse.result === ResultResponse.ERROR) {
          response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
        } else {
          // EXPLICATION: L'erreur AUTOXA_MESSAGE_TO_USER_FAILED est déclenchée ici dans les cas suivants :
          // 1. Le `chatTabResponse.result` n'est ni `SUCCESS` ni `ERROR`.
          // 2. Le `chatTabResponse.result` est `SUCCESS`, mais le corps de la réponse (`chatTabResponse.body`)
          //    n'est pas un objet valide ou ne contient pas la propriété `conversationUuid`.
          response.send(buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'The response status is unknown, malformed, or we get a "success" result but the body does not match the required structure.'));
        }
      } catch {
// ... (fin du fichier inchangée)
2. Tests unitaires pour Autoxa.controller.spec.ts
Generated typescript
import { ResultResponse } from '@/common/shared/models/MessageResponse.model';
import { OxaErrorCode } from '@/common/shared/errors/OxaErrorCode.enum';

// Mock des dépendances
const mockChromeMessageSenderService = {
  sendRuntimeMessage: jest.fn(),
};

// ... autres mocks nécessaires

describe('AutoxaController', () => {
  let autoxaController: AutoxaController;
  let mockResponse: any;

  beforeEach(() => {
    // Initialisation du contrôleur avec les mocks
    autoxaController = new AutoxaController(
      mockChromeMessageSenderService as any,
      // ... autres dépendances mockées
    );
    
    // Mock de l'objet ChromeResponse
    mockResponse = {
      send: jest.fn(),
      end: jest.fn(),
      sendAsSuccessMessageResponse: jest.fn(),
      closed: false,
    };

    // Mock des fonctions qui ne sont pas directement testées mais appelées
    jest.spyOn(autoxaController as any, 'addUserMessage').mockResolvedValue({ uuid: 'test-conv-uuid' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMessageToUserFromAutoxa', () => {
    const validRequest = {
      body: {
        data: { text: 'hello', images: [] },
        interlocutorUuid: 'test-interlocutor-uuid',
      },
    };

    it('devrait retourner une erreur AUTOXA_MESSAGE_TO_USER_FAILED si la réponse est SUCCESS mais malformée (pas un objet)', async () => {
      // Arrange
      mockChromeMessageSenderService.sendRuntimeMessage.mockResolvedValue({
        result: ResultResponse.SUCCESS,
        body: 'juste une chaîne de caractères', // Corps malformé
      });

      // Act
      await autoxaController.sendMessageToUserFromAutoxa(validRequest as any, mockResponse);

      // Assert
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining({
          result: ResultResponse.ERROR,
          body: expect.objectContaining({
            code: OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED,
          }),
        })
      );
    });

    it('devrait retourner une erreur AUTOXA_MESSAGE_TO_USER_FAILED si la réponse est SUCCESS mais sans conversationUuid', async () => {
      // Arrange
      mockChromeMessageSenderService.sendRuntimeMessage.mockResolvedValue({
        result: ResultResponse.SUCCESS,
        body: { someOtherProp: 'value' }, // Corps sans conversationUuid
      });

      // Act
      await autoxaController.sendMessageToUserFromAutoxa(validRequest as any, mockResponse);

      // Assert
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining({
          result: ResultResponse.ERROR,
          body: expect.objectContaining({
            code: OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED,
          }),
        })
      );
    });
  });

  describe('askQuestionTextToUserFromAutoxa', () => {
    const validRequest = {
      body: {
        data: { text: 'question?', images: [] },
        interlocutorUuid: 'test-interlocutor-uuid',
      },
    };

    it('devrait retourner une erreur AUTOXA_MESSAGE_TO_USER_FAILED si la réponse est SUCCESS mais malformée (ne passe pas isUserResponseAndConversationUuidDto)', async () => {
      // Arrange
      mockChromeMessageSenderService.sendRuntimeMessage.mockResolvedValue({
        result: ResultResponse.SUCCESS,
        body: { invalid_body: true }, // Corps qui échouera à la validation `isUserResponseAndConversationUuidDto`
      });

      // Act
      await autoxaController.askQuestionTextToUserFromAutoxa(validRequest as any, mockResponse);

      // Assert
      expect(mockResponse.send).toHaveBeenCalledWith(
        expect.objectContaining({
          result: ResultResponse.ERROR,
          body: expect.objectContaining({
            code: OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED,
          }),
        })
      );
    });

    it('devrait retourner une erreur AUTOXA_MESSAGE_TO_USER_FAILED si la réponse a un statut inconnu', async () => {
        // Arrange
        mockChromeMessageSenderService.sendRuntimeMessage.mockResolvedValue({
          result: 'SOME_UNKNOWN_STATUS',
          body: {},
        });
  
        // Act
        await autoxaController.askQuestionTextToUserFromAutoxa(validRequest as any, mockResponse);
  
        // Assert
        expect(mockResponse.send).toHaveBeenCalledWith(
          expect.objectContaining({
            result: ResultResponse.ERROR,
            body: expect.objectContaining({
              code: OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED,
            }),
          })
        );
      });
  });
});
Use code with caution.
TypeScript
