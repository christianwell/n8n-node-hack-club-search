import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HackClubSearchApi implements ICredentialType {
	name = 'hackClubSearchApi';
	icon = 'file:../nodes/HackclubSearch/hackclubsearch.svg' as const;
	displayName = 'Hack Club Search API';
	documentationUrl = 'https://search.hackclub.com/docs';

	properties: INodeProperties[] = [
		{
			name: 'apiKey',
			displayName: 'API Key',
			type: 'string',
			default: '',
			typeOptions: { password: true },
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
		},
	};

	/**
	 * TODO (Sampson): When Brave Search API adds an endpoint for testing
	 * credentials, which doesn't cost the user a request, we should revisit
	 * and use that endpoint instead.
	 */
	test: ICredentialTestRequest = {
		request: {
			url: 'https://search.hackclub.com/res/v1/web/search',
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Accept-Encoding': 'gzip',
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
			qs: {
				q: 'n8n',
				count: 1,
			},
		},
	};
}
