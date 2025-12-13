import {
	NodeApiError,
	NodeParameterValue,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { OPERATIONS, PROPERTIES, type BraveSearchOperation } from './operations';

/**
 * https://docs.n8n.io/integrations/creating-nodes/overview/
 * https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/
 * https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/
 * https://docs.n8n.io/integrations/creating-nodes/build/reference/ux-guidelines/
 */
export class HackClubSearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hack Club Search',
		name: 'hackClubSearch',
		subtitle: '={{$parameter["operation"]}}',
		icon: 'file:hackclubsearch.svg',
		group: ['transform'],
		version: 1,
		description: 'Search the web using Hack Club Search',
		defaults: {
			name: 'Hack Club Search',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'hackClubSearchApi',
				required: true,
			},
		],
		usableAsTool: true,
		properties: PROPERTIES,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const raw_results: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				raw_results.push(await HackClubSearch.performRequest(this, i));
			} catch (error) {
				// If the user has chosen to continue on failure (from within the node settings),
				if (this.continueOnFail()) {
					raw_results.push({ json: items[i].json, pairedItem: i, error });
					continue;
				}

				if (error.context) {
					error.context.itemIndex = i;
					throw error;
				}

				throw new NodeApiError(this.getNode(), error, { itemIndex: i });
			}
		}

		return [this.helpers.returnJsonArray(raw_results)];
	}

	static buildParams(
		ctx: IExecuteFunctions,
		operation: BraveSearchOperation,
		index: number,
	): Record<string, NodeParameterValue> {
		const params = {} as Record<string, NodeParameterValue>;

		for (const { name, type } of operation.parameters) {
			const nodeParam = ctx.getNodeParameter(name, index);

			// We use collections for 'Additional Parameters', so we need to iterate over their options
			if (type === 'collection' && name === 'additionalParameters') {
				const additional_parameters = ctx.getNodeParameter('additionalParameters', index) ?? {};
				Object.entries(additional_parameters).forEach(([key, value]) => {
					// TODO (Sampson): Move specialized handling to the operation's `buildQuery` method
					if (key === 'result_filter') value = value.join(',');
					/**
					 * TODO (Sampson): Add support for multiple goggles.
					 * The API currently does not support a comma-separated
					 * list of goggle URLs. As such, we would need to pass
					 * multiple goggle URLs as separate parameters on the
					 * query string (e.g. `goggles=url1&goggles=url2`).
					 * For now, we will just pass the first goggle URL.
					 */
					if (key === 'goggles') {
						const [url] = value.flat();
						if (url?.trim().length) value = url;
						else return; // Skip if no goggles are provided
					}
					params[key] = value;
				});
			} else {
				params[name] = nodeParam as NodeParameterValue;
			}
		}

		return params;
	}

	static async performRequest(ctx: IExecuteFunctions, index: number): Promise<any> {
		const operation = OPERATIONS[ctx.getNodeParameter('operation', index)];
		const params = HackClubSearch.buildParams(ctx, operation, index);
		// TODO (Sampson): Modify this approach to support multiple goggle URLs, etc.
		const response = await ctx.helpers.httpRequestWithAuthentication.call(ctx, 'hackClubSearchApi', {
			url: `https://search.hackclub.com/res/v1${operation.endpoint}`,
			qs: operation.buildQuery(params),
			returnFullResponse: true,
			json: true,
		});

		return response.body;
	}
}
