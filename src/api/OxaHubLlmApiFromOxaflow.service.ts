import axios from 'axios';
import { CreateLlmDto, UpdateLlmDto, Llm } from '@/types/llm';
import { API_BASE_URL } from '@/config/api';
import { handleError } from '@/utils/errorHandling';

export class OxaHubLlmApiService {
 async fetchLlms(): Promise<Llm[]> {
 try {
 const response = await axios.get(${API_BASE_URL}/llms);
 return response.data.map((llm: any) => new Llm(llm));
 } catch (error) {
 handleError(error, 'Failed to fetch LLMs');
 return [];
 }
 }

 async createLlm(llmDto: CreateLlmDto): Promise<Llm | null> {
 if (!llmDto || !llmDto.name || !llmDto.stateStepAccessor) {
 console.error('Validation Error: Invalid LLM creation data.');
 return null;
 }
 try {
 const response = await axios.post(${API_BASE_URL}/llms, {
 name: llmDto.name,
 stateStep: { accessor: llmDto.stateStepAccessor },
 });
 return new Llm(response.data);
 } catch (error) {
 handleError(error, 'Failed to create LLM');
 return null;
 }
 }

 async updateLlm(llmDto: UpdateLlmDto): Promise<Llm | null> {
 if (!llmDto || !llmDto.uuid) {
 console.error('Validation Error: LLM UUID is required for update.');
 return null;
 }
 try {
 const payload: Partial<{ name: string; stateStep: { accessor: string } }> = {};
 if (llmDto.name !== undefined) {
 payload.name = llmDto.name;
 }
 if (llmDto.stateStepAccessor !== undefined) {
 payload.stateStep = { accessor: llmDto.stateStepAccessor };
 }
 const response = await axios.put(${API_BASE_URL}/llms/${llmDto.uuid}, payload);
 return new Llm(response.data);
 } catch (error) {
 handleError(error, Failed to update LLM with UUID ${llmDto.uuid});
 return null;
 }
 }

 async deleteLlm(llmUuid: string): Promise<boolean> {
 if (!llmUuid) {
 console.error('Validation Error: LLM UUID is required for deletion.');
 return false;
 }
 try {
 await axios.delete(${API_BASE_URL}/llms/${llmUuid});
 return true;
 } catch (error) {
 handleError(error, Failed to delete LLM with UUID ${llmUuid});
 return false;
 }
 }
}
