class Api::OrgsController < ApplicationController
  def index
    orgs = @user.organizations
    orgs_json = JSON.parse(orgs.to_json())

    # add code_alerts_exist boolean field to organizations json
    orgs.zip(orgs_json).each { |org, org_json|
      org_json["code_alerts_exist"] = false
      org_json["dependabot_alerts_exist"] = false
      org.repositories.each { |repo|
        org_json["code_alerts_exist"] |= (repo.code_alerts.size() > 0)
        org_json["dependabot_alerts_exist"] |= (repo.dependabot_alerts.size() > 0)
      }
    }

    render json: orgs_json, status: :ok
  end
end