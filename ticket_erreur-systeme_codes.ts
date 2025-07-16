Fichier: src/common/shared/errors/OxaErrorCode.enum.ts
Modification: Ajout de nouveaux codes d'erreur

REMPLACER:
export enum OxaErrorCode {
GENERIC_ERROR = 'generic',
GENERIC_LOGIN = 'login',
PAR:
export enum OxaErrorCode {
AUTOXA_MESSAGE_TO_USER_FAILED = 'autoxa_message_to_user_failed',
BRIDGE_UNKNOWN_ERROR = 'bridge_unknown_error',
GENERIC_ERROR = 'generic',
GENERIC_LOGIN = 'login',

Modification: Ajout de nouveaux codes d'erreur

REMPLACER:
INPUT_NOT_FOUND = 'input_not_found',
INTERLOCUTOR_NOT_SUPPORTED = 'interlocutor_not_supported',
INVALID_BODY_FORMAT = 'invalid_body_format',
PAR:
INPUT_NOT_FOUND = 'input_not_found',
INTERLOCUTOR_NOT_FOUND = 'interlocutor_not_found',
INTERLOCUTOR_NOT_SUPPORTED = 'interlocutor_not_supported',
INVALID_BODY_FORMAT = 'invalid_body_format',

Modification: Ajout de nouveaux codes d'erreur

REMPLACER:
INVALID_GITLAB_ISSUE_FORMAT = 'invalid_gitlab_issue_format',
INVALID_INPUT = 'invalid_input',
INVALID_MODEL = 'invalid_model',
PAR:
INVALID_GITLAB_ISSUE_FORMAT = 'invalid_gitlab_issue_format',
INVALID_INPUT = 'invalid_input',
INVALID_LLM_RESPONSE_FORMAT = 'invalid_llm_response_format',
INVALID_MODEL = 'invalid_model',

Modification: Ajout de nouveaux codes d'erreur

REMPLACER:
INVALID_PERSISTED_LLM_SETTINGS_TAB = 'invalid_persisted_llm_settings_tab',
INVALID_STEP = 'invalid_step',
INVALID_URL = 'invalid_url',
PAR:
INVALID_PERSISTED_LLM_SETTINGS_TAB = 'invalid_persisted_llm_settings_tab',
INVALID_STEP = 'invalid_step',
INVALID_URL = 'invalid_url',
INVALID_YOUTUBE_RESPONSE_FORMAT = 'invalid_youtube_response_format',

Modification: Ajout de nouveaux codes d'erreur

REMPLACER:
NO_MODEL_BUTTON = 'There are no button to select a model',
NO_MODELS = 'There are no models',
NO_OPEN_DISCUSSION = 'no_open_discussion',
PAR:
NO_MODEL_BUTTON = 'There are no button to select a model',
NO_MODELS = 'There are no models',
NO_NORMAL_WINDOW_FOUND = 'no_normal_window_found',
NO_OPEN_DISCUSSION = 'no_open_discussion',

Modification: Ajout de nouveaux codes d'erreur

REMPLACER:
RECONNECT_REQUEST = 'reconnect_request',
REQUESTED_PAGE_URL_NOT_FOUND = 'requested_page_url_not_found',
REQUESTED_REGEX_NOT_FOUND = 'requested_regex_not_found',
PAR:
RECONNECT_REQUEST = 'reconnect_request',
REQUESTED_PAGE_URL_NOT_FOUND = 'requested_page_url_not_found',
REQUESTED_REGEX_NOT_FOUND = 'requested_regex_not_found',
RUNNER_EXECUTION_FAILED = 'runner_execution_failed',

Modification: Ajout de nouveaux codes d'erreur

REMPLACER:
SCRAPPING_REQUEST = 'scrapping_request',
STEP_LLM_CONFIG_NOT_FOUND = 'step_llm_config_not_found',
STEP_VALIDATION = 'step_validation',
PAR:
SCRAPPING_REQUEST = 'scrapping_request',
SIDEBAR_NOT_OPENED = 'sidebar_not_opened',
STEP_LLM_CONFIG_NOT_FOUND = 'step_llm_config_not_found',
STEP_VALIDATION = 'step_validation',

Fichier: src/background/bridge/Bridge.service.ts
Modification: Remplacement de GENERIC_ERROR par BRIDGE_UNKNOWN_ERROR

REMPLACER:
} catch (error) {
const bridgeError: BridgeError = error instanceof OxaError
? this.bridgeErrorMapper.fromOxaErrorToBridgeError(error, message.requestId, message.type, message.url, error.details)
: this.bridgeErrorMapper.fromOxaErrorToBridgeError(new OxaError(OxaErrorCode.GENERIC_ERROR, 'Unknown error'), message.requestId, message.type, message.url);
console.error('[BridgeService] Error while processing message:');
console.error(bridgeError);
PAR:
} catch (error) {
const bridgeError: BridgeError = error instanceof OxaError
? this.bridgeErrorMapper.fromOxaErrorToBridgeError(error, message.requestId, message.type, message.url, error.details)
: this.bridgeErrorMapper.fromOxaErrorToBridgeError(new OxaError(OxaErrorCode.BRIDGE_UNKNOWN_ERROR, 'Unknown error'), message.requestId, message.type, message.url);
console.error('[BridgeService] Error while processing message:');
console.error(bridgeError);

Fichier: src/background/controllers/Autoxa.controller.ts
Modification: Remplacement de GENERIC_ERROR par INTERLOCUTOR_NOT_FOUND

REMPLACER:
if (!interlocutor) {
console.warn('[@vue/chat]: Interlocutor not found');
response.send(buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, '[@vue/chat]: Interlocutor not found'));
return;
}
PAR:
if (!interlocutor) {
console.warn('[@vue/chat]: Interlocutor not found');
response.send(buildErrorMessageResponse(OxaErrorCode.INTERLOCUTOR_NOT_FOUND, '[@vue/chat]: Interlocutor not found'));
return;
}

Modification: Remplacement de GENERIC_ERROR par AUTOXA_MESSAGE_TO_USER_FAILED

REMPLACER:
if (chatTabResponse.result === ResultResponse.SUCCESS && isUserResponseAndConversationUuidDto(chatTabResponse)) {
response.sendAsSuccessMessageResponse({ text: chatTabResponse.body.response.text, images: chatTabResponse.body.response.attachments, conversationUuid: chatTabResponse.body.conversationUuid });
} else if (chatTabResponse.result === ResultResponse.ERROR) {
response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Oops'));
}
};
try {
PAR:
if (chatTabResponse.result === ResultResponse.SUCCESS && isUserResponseAndConversationUuidDto(chatTabResponse)) {
response.sendAsSuccessMessageResponse({ text: chatTabResponse.body.response.text, images: chatTabResponse.body.response.attachments, conversationUuid: chatTabResponse.body.conversationUuid });
} else if (chatTabResponse.result === ResultResponse.ERROR) {
response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'Oops'));
}
};
try {

Modification: Remplacement de GENERIC_ERROR par AUTOXA_MESSAGE_TO_USER_FAILED

REMPLACER:
if (chatTabResponse.result === ResultResponse.SUCCESS && typeof chatTabResponse.body === 'object' && chatTabResponse.body && 'conversationUuid' in chatTabResponse.body) {
response.sendAsSuccessMessageResponse({ conversationUuid: chatTabResponse.body.conversationUuid });
} else if (chatTabResponse.result === ResultResponse.ERROR) {
response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Oops'));
}
} catch {
this.openSidebar(async () => {
PAR:
if (chatTabResponse.result === ResultResponse.SUCCESS && typeof chatTabResponse.body === 'object' && chatTabResponse.body && 'conversationUuid' in chatTabResponse.body) {
response.sendAsSuccessMessageResponse({ conversationUuid: chatTabResponse.body.conversationUuid });
} else if (chatTabResponse.result === ResultResponse.ERROR) {
response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'Oops'));
}
} catch {
this.openSidebar(async () => {

Modification: Remplacement de GENERIC_ERROR par AUTOXA_MESSAGE_TO_USER_FAILED

REMPLACER:
if (chatTabResponse.result === ResultResponse.SUCCESS && typeof chatTabResponse.body === 'object' && chatTabResponse.body && 'conversationUuid' in chatTabResponse.body) {
response.sendAsSuccessMessageResponse({ conversationUuid: chatTabResponse.body.conversationUuid });
} else if (chatTabResponse.result === ResultResponse.ERROR) {
response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Oops'));
}
}, response);
}
PAR:
if (chatTabResponse.result === ResultResponse.SUCCESS && typeof chatTabResponse.body === 'object' && chatTabResponse.body && 'conversationUuid' in chatTabResponse.body) {
response.sendAsSuccessMessageResponse({ conversationUuid: chatTabResponse.body.conversationUuid });
} else if (chatTabResponse.result === ResultResponse.ERROR) {
response.send(buildErrorMessageResponse(chatTabResponse.body.code, chatTabResponse.body.message));
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.AUTOXA_MESSAGE_TO_USER_FAILED, 'Oops'));
}
}, response);
}

Modification: Remplacement de GENERIC_ERROR par NO_NORMAL_WINDOW_FOUND

REMPLACER:
if (randomWindow && randomWindow.id) {
windowId = randomWindow.id;
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'No normal window open'));
return;
}
}
PAR:
if (randomWindow && randomWindow.id) {
windowId = randomWindow.id;
} else {
response.send(buildErrorMessageResponse(OxaErrorCode.NO_NORMAL_WINDOW_FOUND, 'No normal window open'));
return;
}
}

Modification: Remplacement de GENERIC_ERROR par SIDEBAR_NOT_OPENED

REMPLACER:
});
chrome.notifications.onClosed.addListener(async (closedNotificationId: string) => {
if (closedNotificationId === notificationId && !isClicked) {
response.send(buildErrorMessageResponse(OxaErrorCode.GENERIC_ERROR, 'Sidebar was not opened'));
}
});
});
PAR:
});
chrome.notifications.onClosed.addListener(async (closedNotificationId: string) => {
if (closedNotificationId === notificationId && !isClicked) {
response.send(buildErrorMessageResponse(OxaErrorCode.SIDEBAR_NOT_OPENED, 'Sidebar was not opened'));
}
});
});

Fichier: src/background/services/Runner.service.ts
Modification: Remplacement de GENERIC_ERROR par RUNNER_EXECUTION_FAILED

REMPLACER:
return this.createSuccessResult(context, content);
} catch (error) {
const oxaError: OxaError = error instanceof OxaError
? error
: new OxaError(OxaErrorCode.GENERIC_ERROR, 'An error occurred while running the interlocutor.');
return this.createErrorResult(oxaError, context);
}
}
PAR:
return this.createSuccessResult(context, content);
} catch (error) {
const oxaError: OxaError = error instanceof OxaError
? error
: new OxaError(OxaErrorCode.RUNNER_EXECUTION_FAILED, 'An error occurred while running the interlocutor.');
return this.createErrorResult(oxaError, context);
}
}

Fichier: src/content-script/content/services/ScrappingOutput.service.ts
Modification: Remplacement de GENERIC_ERROR par INVALID_LLM_RESPONSE_FORMAT

REMPLACER:
if (!isLlmResponse(response.body)) {
throw new OxaError(OxaErrorCode.GENERIC_ERROR, 'Invalid LLM response');
}
answer = await this.completeAnswer(response.body, llmConfig, windowId, newTabId, chatBotScrappingInformation.conversationUuidSeparator);
} catch (error) {
PAR:
if (!isLlmResponse(response.body)) {
throw new OxaError(OxaErrorCode.INVALID_LLM_RESPONSE_FORMAT, 'Invalid LLM response');
}
answer = await this.completeAnswer(response.body, llmConfig, windowId, newTabId, chatBotScrappingInformation.conversationUuidSeparator);
} catch (error) {

Modification: Remplacement de GENERIC_ERROR par INVALID_YOUTUBE_RESPONSE_FORMAT

REMPLACER:
if (response.result === ResultResponse.ERROR) {
throw new OxaError(response.body.code, response.body.message);
}
if (!isString(response.body)) {
throw new OxaError(OxaErrorCode.GENERIC_ERROR, 'Invalid Youtube response');
}
return response.body;
} finally {
PAR:
if (response.result === ResultResponse.ERROR) {
throw new OxaError(response.body.code, response.body.message);
}
if (!isString(response.body)) {
throw new OxaError(OxaErrorCode.INVALID_YOUTUBE_RESPONSE_FORMAT, 'Invalid Youtube response');
}
return response.body;
} finally {
