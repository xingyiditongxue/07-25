src/common/shared/errors/OxaErrorCode.enum.ts
Modification: Add MISSING_API_KEY to OxaErrorCode enum

REMPLACER:
CANNOT_FETCH_FEATURES = 'cannot_fetch_features'
}

export function isOxaErrorCode(obj: unknown): obj is OxaErrorCode {
return isString(obj) && Object.values(OxaErrorCode).includes(obj as OxaErrorCode);
}
PAR:
CANNOT_FETCH_FEATURES = 'cannot_fetch_features',

//runner
// eslint-disable-next-line no-warning-comments
//TODO: add translation
TOO_MANY_STEP_ARGUMENTS = 'too_many_step_arguments',
NOT_ENOUGH_STEP_ARGUMENTS = 'not_enoug_step_arguments',
STEP_VALIDATION = 'step_validation',
MISCONFIGURED_STEP = 'misconfigured_step',
MISSING_EXECUTOR = 'missing_executor',
INTERLOCUTOR_NOT_SUPPORTED = 'interlocutor_not_supported',
STEP_LLM_CONFIG_NOT_FOUND = 'step_llm_config_not_found',
MISSING_API_KEY = 'missing_api_key',

//scrapping
TIMEOUT = 'timeout',
FAILED_TO_WRITE_IN_CLIPBOARD = 'failed_to_write_in_clipboard',

DEFAULT_SELECTOR_ERROR = 'default_selector_error',

NO_PREMIUM_ACTIVE = 'no_premium_active',
NOT_CONNECTED = 'not_connected',
NO_CLAUDE_ARTIFACT_FEATURE_ENABLED = 'no_claude_artifact_feature_enabled',
NO_CLAUDE_ARTIFACT_USER_MENU_BUTTON = 'no_claude_artifact_user_menu_button',
NO_CLAUDE_ARTIFACT_MENU_ITEM = 'no_claude_artifact_menu_item',
NO_CLAUDE_ARTIFACT_TOGGLE_BUTTON = 'no_claude_artifact_toggle_button',
NO_CLAUDE_ARTIFACT_OFFSPAN = 'no_claude_artifact_offspan',
NO_CLAUDE_ARTIFACT_CLOSE_WINDOW_BUTTON = 'no_claude_artifact_close_window_button',
NO_CHAT_INPUT = 'no_chat_input',
NO_SEND_BUTTON = 'no_send_button',
NO_IMAGE_UPLOADED = 'no_image_uploaded',
NO_MODEL_BUTTON = 'There are no button to select a model',
NO_MODELS = 'There are no models',
REGENERATE_BUTTON = 'There are no button to regenerate answer',
LIMIT_REACHED = 'limit_reached',
NO_MISTRAL_BUTTONS = 'The options are not available',
NO_ANSWER_RETRIEVED = 'No answer has been found',
MISSING_SELECTOR = 'missing_selector',
INVALID_MODEL = 'invalid_model',
EMPTY_MESSAGE = 'empty_message',
EMPTY_CONVERSATION_ERROR = 'empty_conversation',
INPUT_NOT_FOUND = 'input_not_found',
PLATFORM_NOT_FOUND = 'platform_not_found',
NO_ACTIVE_PAGE = 'no_active_page',
NO_OPEN_DISCUSSION = 'no_open_discussion',
CLASS_DEF_NOT_FOUND = 'class_def_not_found',
CANNOT_GENERATE = 'cannot_generate',
NO_SETTINGS_BUTTON = 'no_settings_button',
NO_AUTOSAVE_BUTTON = 'no_autosave_button',
TERMS_NOT_ACCEPTED = 'terms_not_accepted',
ABORT = 'request_aborted',

//autocom
NOT_FOUND = 'not_found',
SERVER_ERROR = 'server_error',

//conversation
NOT_IN_MEMORY_CONVERSATION = 'not_in_memory_conversation',
ALREADY_IN_MEMORY_CONVERSATION = 'already_in_memory_conversation',
NOT_IN_CONVERSATION_MESSAGE = 'not_in_conversation_message',
PERSISTENCE_ERROR = 'persistence_error',
SYNCHRONIZATION_ERROR = 'synchronization_error',
LAST_MESSAGE_NOT_FOUND ='last_message_not_found',

//synchronized Entities
BROADCAST_SYNC_ERROR = 'broadcast_sync_error',

//tab
UNKNOWN_TAB_TYPE = 'unknown_tab_type',
INVALID_PERSISTED_CHAT_TAB = 'invalid_persisted_chat_tab',
INVALID_PERSISTED_EDIT_TAB = 'invalid_persisted_edit_tab',
INVALID_PERSISTED_LLM_SETTINGS_TAB = 'invalid_persisted_llm_settings_tab',
NOT_IN_MEMORY_TAB = 'not_in_memory_tab',

//window
WINDOW_NOT_FOUND = 'window_not_found',
FAILED_TO_INITIALIZE_TAB = 'failed_to_initialize_tab',

//context
UNREACHABLE_CONTEXT = 'unreachable_context',

//instances
UNABLE_TO_INSTANCE_SERVICE = 'unable_to_instance_service',

//page url
REQUESTED_PAGE_URL_NOT_FOUND = 'requested_page_url_not_found',
REQUESTED_REGEX_NOT_FOUND = 'requested_regex_not_found',

//Bridge
INVALID_URL = 'invalid_url',
PRIVATE_CONTROLLER = 'private_controller',
PRIVATE_ENDPOINT = 'private_endpoint',
CONTROLLER_NOT_FOUND = 'controller_not_found',
ENDPOINT_NOT_FOUND = 'endpoint_not_found',

//oxahub
OXA_HUB_ERROR = 'oxahub_error',
OXA_HUB_INVAlID_FORMAT_ERROR = 'oxahub_invalid_format_error',
OXA_HUB_INVALID_ZIP = 'oxahub_invalid_zip',

//penpot
PENPOT_INSPECT_TAB_ERROR = 'penpot_inspect_tab_error',
PENPOT_CODE_TAB_ERROR = 'penpot_code_tab_error',
PENPOT_NO_ELEMENTS_FOUND = 'penpot_no_elements_found',
PENPOT_MESSAGE_SEND_ERROR = 'penpot_message_send_error',

//Autoxa Controller
INVALID_GITLAB_ISSUE_FORMAT = 'invalid_gitlab_issue_format',

//Image
CANNOT_FETCH = 'cannot_fetch',

//features
CANNOT_FETCH_FEATURES = 'cannot_fetch_features'
}

export function isOxaErrorCode(obj: unknown): obj is OxaErrorCode {
return isString(obj) && Object.values(OxaErrorCode).includes(obj as OxaErrorCode);
}

Fichier: src/background/models/steps/gpt/GptApi.executor.ts
Modification: Add imports for axios and StatusCodes

REMPLACER:
import type { MessageHistory } from '@/common/internal/models/Request.model';
import type { StateStep } from '@/common/internal/models/StateStep.model';
import type { StepContext } from '@/common/internal/models/StepContext.model';
PAR:
import axios, { type AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';

import type { MessageHistory } from '@/common/internal/models/Request.model';
import type { StateStep } from '@/common/internal/models/StateStep.model';
import type { StepContext } from '@/common/internal/models/StepContext.model';

Modification: Override makeApiCall to handle specific API key error

REMPLACER:
return this.extractResponse(response);
}
}
PAR:
return this.extractResponse(response);
}

protected async makeApiCall<TPayload, TResponse>(
url: string,
payload: TPayload,
headers: Record<string, string>
): Promise<TResponse> {
try {
const response: AxiosResponse<TResponse> = await axios({
method: 'POST',
headers: { 'Content-Type': 'application/json', ...headers },
url,
data: JSON.stringify(payload)
});

Generated code
if (response.status !== StatusCodes.OK) {
    throw new OxaError(
      this.getApiConfig().errorCodes.callFailed,
      response.statusText
    );
  }

  return response.data;
} catch (error) {
  if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === StatusCodes.BAD_REQUEST && error.response.data?.code === 'invalid_api_key') {
      throw new OxaError(OxaErrorCode.MISSING_API_KEY, error.response.data.message);
    }
    if (error.response.status === StatusCodes.TOO_MANY_REQUESTS) {
      throw new OxaError(this.getApiConfig().errorCodes.resourceExhausted, error.message);
    }
    throw new OxaError(this.getApiConfig().errorCodes.callFailed, error.message);
  }

  throw new OxaError(
    OxaErrorCode.RETRIEVE_API_RESPONSE_UNEXPECTED_ERROR,
    `An unexpected error occurred while calling the ${this.getApiName()} API.`
  );
}

}
}

Fichier: src/background/models/steps/gpt/GptApi.executor.spec.ts
Modification: Add test case for MISSING_API_KEY error

REMPLACER:
});
});
});
PAR:
});
});

it('devrait lancer OxaError avec le code MISSING_API_KEY pour une erreur 'invalid_api_key'', async () => {
const mockAxiosError: AxiosError = {
name: 'AxiosError',
message: 'Request failed with status code 400',
config: {},
isAxiosError: true,
toJSON: () => ({}),
response: {
data: {
code: 'invalid_api_key',
message: 'API key is invalid.'
},
status: StatusCodes.BAD_REQUEST,
statusText: 'Bad Request',
headers: {},
config: {},
request: {}
}
};

Generated code
mockedAxios.mockRejectedValue(mockAxiosError);

const mockContext: StepContext = {
  message: {
    uuid: 'message-uuid',
    conversationUuid: 'conv-uuid',
    text: 'test message',
    sender: { senderType: SenderType.USER },
    attachments: [],
    llmConfig: []
  },
  interlocutor: {
    uuid: 'gpt-interlocutor-uuid',
    name: 'GPT Assistant',
    icon: 'gpt.svg',
    summary: 'GPT summary',
    serviceType: ServiceType.LLM,
    stateStep: {
      uuid: 'state-step-uuid',
      step: {
        uuid: 'gpt-step-uuid',
        name: 'GPT API',
        description: 'GPT API step',
        isLLM: true,
        image: 'gpt.svg',
        llmApiKeyPlatformUrl: 'http://mock-api.com/gpt',
        llmConfig: {
          type: LlmType.GPT,
          scrappingPlatform: LlmScrappingPlatform.GPT,
          model: LlmModel.GPT_4o_API
        }
      },
      llmBackups: [],
      accessor: 'api-key-accessor'
    },
    apiKey: {
      uuid: 'api-key-uuid',
      label: 'My GPT Key',
      key: 'mock-api-key'
    }
  },
  variables: {}
};

await expect(gptExecutor.executeGPTApi(mockContext, 'arg1')).rejects.toThrow(
  new OxaError(OxaErrorCode.MISSING_API_KEY, 'API key is invalid.')
);
Use code with caution.

});
});

Google Search Suggestions
Display of Search Suggestions is required when using Grounding with Google Search. Learn more
OxaErrorCode enum MISSING_API_KEY
src/common/shared/errors/OxaErrorCode.enum.ts
