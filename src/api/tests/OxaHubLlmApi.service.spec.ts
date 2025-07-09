import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { OxaHubLlmApiService } from '../OxaHubLlmApi.service';
import { Llm, CreateLlmDto, UpdateLlmDto, StateStep } from '@/types/llm';
import { API_BASE_URL } from '@/config/api';
jest.mock('@/utils/errorHandling', () => ({
 handleError: jest.fn(),
}));
import { handleError } from '@/utils/errorHandling';

const mock = new MockAdapter(axios);
const service = new OxaHubLlmApiService();

describe('OxaHubLlmApiService', () => {
 afterEach(() => {
 mock.reset();
 jest.clearAllMocks();
 });

 it('should fetch LLMs', async () => {
 const mockLlms: Array<{ uuid: string; name: string; stateStep: StateStep }> = [
 { uuid: 'uuid-1', name: 'Test LLM', stateStep: { accessor: 'step1' } }
 ];
 mock.onGet(${API_BASE_URL}/llms).reply(200, mockLlms);

 const llms = await service.fetchLlms();
 expect(llms.length).toBe(1);
 expect(llms[0]).toBeInstanceOf(Llm);
 expect(llms[0].uuid).toBe('uuid-1');
 });

 describe('createLlm', () => {
 const createDto: CreateLlmDto = { name: 'New LLM', stateStepAccessor: 'new-step' };
 const createdLlmResponse: { uuid: string; name: string; stateStep: StateStep } = { uuid: 'uuid-new', name: 'New LLM', stateStep: { accessor: 'new-step' } };

 it('should create an LLM successfully', async () => {
 mock.onPost(${API_BASE_URL}/llms).reply(201, createdLlmResponse);

 const llm = await service.createLlm(createDto);

 expect(llm).toBeInstanceOf(Llm);
 expect(llm?.uuid).toBe('uuid-new');
 expect(mock.history.post.length).toBe(1);
 expect(mock.history.post[0].data).toEqual(JSON.stringify({
 name: createDto.name,
 stateStep: { accessor: createDto.stateStepAccessor },
 }));
 });

 it('should return null and handle error if creation fails', async () => {
 mock.onPost(${API_BASE_URL}/llms).reply(500);

 const llm = await service.createLlm(createDto);

 expect(llm).toBeNull();
 expect(handleError).toHaveBeenCalledTimes(1);
 expect(handleError).toHaveBeenCalledWith(expect.any(Error), 'Failed to create LLM');
 });

 it('should return null if validation fails (missing name)', async () => {
 const invalidDto = { stateStepAccessor: 'new-step' } as CreateLlmDto;

 const llm = await service.createLlm(invalidDto);

 expect(llm).toBeNull();
 expect(mock.history.post.length).toBe(0);
 });

 it('should return null if validation fails (missing stateStepAccessor)', async () => {
 const invalidDto = { name: 'New LLM' } as CreateLlmDto;

 const llm = await service.createLlm(invalidDto);

 expect(llm).toBeNull();
 expect(mock.history.post.length).toBe(0);
 });
 });

 describe('updateLlm', () => {
 const updateDto: UpdateLlmDto = { uuid: 'uuid-to-update', name: 'Updated LLM Name' };
 const updatedLlmResponse: { uuid: string; name: string; stateStep: StateStep } = { uuid: 'uuid-to-update', name: 'Updated LLM Name', stateStep: { accessor: 'old-step' } };

 it('should update an LLM successfully', async () => {
 mock.onPut(${API_BASE_URL}/llms/${updateDto.uuid}).reply(200, updatedLlmResponse);

 const llm = await service.updateLlm(updateDto);

 expect(llm).toBeInstanceOf(Llm);
 expect(llm?.name).toBe('Updated LLM Name');
 expect(mock.history.put.length).toBe(1);
 expect(mock.history.put[0].data).toEqual(JSON.stringify({ name: updateDto.name }));
 });

 it('should update an LLM successfully with stateStepAccessor', async () => {
 const updateDtoWithAccessor: UpdateLlmDto = { uuid: 'uuid-to-update', stateStepAccessor: 'new-step-accessor' };
 const updatedLlmResponseWithAccessor: { uuid: string; name: string; stateStep: StateStep } = { uuid: 'uuid-to-update', name: 'Old Name', stateStep: { accessor: 'new-step-accessor' } };
 mock.onPut(${API_BASE_URL}/llms/${updateDtoWithAccessor.uuid}).reply(200, updatedLlmResponseWithAccessor);

 const llm = await service.updateLlm(updateDtoWithAccessor);

 expect(llm).toBeInstanceOf(Llm);
 expect(llm?.stateStep.accessor).toBe('new-step-accessor');
 expect(mock.history.put.length).toBe(1);
 expect(mock.history.put[0].data).toEqual(JSON.stringify({ stateStep: { accessor: updateDtoWithAccessor.stateStepAccessor } }));
 });

 it('should return null and handle error if update fails', async () => {
 mock.onPut(${API_BASE_URL}/llms/${updateDto.uuid}).reply(500);

 const llm = await service.updateLlm(updateDto);

 expect(llm).toBeNull();
 expect(handleError).toHaveBeenCalledTimes(1);
 expect(handleError).toHaveBeenCalledWith(expect.any(Error), Failed to update LLM with UUID ${updateDto.uuid});
 });

 it('should return null if validation fails (missing uuid)', async () => {
 const invalidDto = { name: 'Updated Name' } as UpdateLlmDto;

 const llm = await service.updateLlm(invalidDto);

 expect(llm).toBeNull();
 expect(mock.history.put.length).toBe(0);
 });
 });

 describe('deleteLlm', () => {
 const llmUuidToDelete = 'uuid-to-delete';

 it('should delete an LLM successfully', async () => {
 mock.onDelete(${API_BASE_URL}/llms/${llmUuidToDelete}).reply(204);

 const success = await service.deleteLlm(llmUuidToDelete);

 expect(success).toBe(true);
 expect(mock.history.delete.length).toBe(1);
 expect(mock.history.delete[0].url).toBe(${API_BASE_URL}/llms/${llmUuidToDelete});
 });

 it('should return false and handle error if deletion fails', async () => {
 mock.onDelete(${API_BASE_URL}/llms/${llmUuidToDelete}).reply(500);

 const success = await service.deleteLlm(llmUuidToDelete);

 expect(success).toBe(false);
 expect(handleError).toHaveBeenCalledTimes(1);
 expect(handleError).toHaveBeenCalledWith(expect.any(Error), Failed to delete LLM with UUID ${llmUuidToDelete});
 });

 it('should return false if validation fails (missing uuid)', async () => {
 const invalidUuid = '';

 const success = await service.deleteLlm(invalidUuid);

 expect(success).toBe(false);
 expect(mock.history.delete.length).toBe(0);
 });
 });
});
