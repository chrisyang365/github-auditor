class Api::AuthController < ApplicationController
  skip_before_action :authorized

  def create
    client_id = ENV['REACT_APP_CLIENT_ID']
    client_secret = ENV['REACT_APP_CLIENT_SECRET']
    redirect_uri = ENV['REACT_APP_REDIRECT_URI']
    code = JSON.parse(request.body.read)['code']

    oauth_uri = URI.parse('https://github.com/login/oauth/access_token')
    oauth_res = Net::HTTP.post_form(oauth_uri, 'client_id' => client_id, 'client_secret' => client_secret, 'code' => code)
    access_token = oauth_res.body.split('&')[0].split('=')[1]

    user_uri = URI.parse('https://api.github.com/user')
    user_req = Net::HTTP::Get.new(user_uri)
    user_req['Authorization'] = 'token ' + access_token
    user_res = Net::HTTP.start(user_uri.hostname, user_uri.port, :use_ssl => user_uri.scheme == 'https') do |http|
      http.request(user_req)
    end
    user_obj = JSON.parse(user_res.body)

    existing_user = User.where(login: user_obj['login']).first

    if existing_user.nil?
      GithubAuditJob.perform_later(access_token, user_obj['login'], user_obj['name'])
    else
      existing_user.update(access_token: access_token, login: user_obj['login'], name: user_obj['name'])
    end

    render json: { access_token: access_token, login: user_obj['login'], username: user_obj['name']}, status: :accepted
  end

  def github_login_params
    params.permit(:code)
  end
end
