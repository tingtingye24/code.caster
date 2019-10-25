class UsersController < ApplicationController
    def index
    @users = User.all 
    render json: @users
    end

    def create
        userinformation = JSON.parse(request.raw_post)
        @user = User.create(name: userinformation["name"], score: userinformation["score"]);      
    end

    def topTen
        @users = User.topTen
        render json: @users
    end
end
