# Supported API Routes

### GET `/orgs`
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`
- returns all the associated `organization` objects that user with `access_token` belongs to (i.e. `name`, `avatar_url`, `two_factor_requirement_enabled`)
- should also return whether there exists unaddressed Dependabot alerts for each `organization` object in the JSON response
- return `HTTP 401: Unauthorized` if provided access_token is not valid

### GET `/orgs/:id/repos`
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`
- returns all the associated `repository` objects that user with `access_token` belongs to
- should also return whether there exists unaddressed Dependabot alerts for each `repository` object in the JSON response
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`

### GET `/orgs/:org_id/repos/:repo_id/dependabotalerts`
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`
- returns the associated `dependabot_alert` objects that belong to repository with `:repo_id` under `organization` object with `:org_id`
- return `HTTP 401: Unauthorized` if provided access_token is not valid

### GET `/orgs/:org_id/repos/:repo_id/codealerts`
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`
- returns the associated `code_alert` objects that belong to repository with `:repo_id` under `organization` object with `:org_id`
- return `HTTP 401: Unauthorized` if provided access_token is not valid