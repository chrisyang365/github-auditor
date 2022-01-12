# Supported API Routes

### GET `/orgs`
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`
- returns all the associated `organization` entities that user with `access_token` belongs to (i.e. `name`, `avatar_url`, `two_factor_requirement_enabled`)
- return `HTTP 401: Unauthorized` if provided access_token is not valid

### GET `/orgs/:id/repos`
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`
- returns all the associated `repository` entities that user with `access_token` belongs to
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`

### GET `/orgs/:org_id/repos/:repo_id/dependabotalerts`
- requires `Authorization` header to be set with access token passed in like this: `token ACCESS_TOKEN`
- returns the associated `dependabot_alert` entities that belong to repository with `:repo_id` under `organization` entity with `:org_id`
- return `HTTP 401: Unauthorized` if provided access_token is not valid
